import { useContext, useEffect, useState } from "react";
import { getBasketByUserId, getElectronicsById, patchItemInBasket, postBasket } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Icon from './Icon';
import Loading from "./Loading";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';


export default function ElectronicDevice({ basketList, setBasketList }) {
    const { electronics_id } = useParams()
    const [electronic, setElectronic] = useState({})
    const { loggedInUser } = useContext(UserContext)
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const Params = useParams();


    useEffect(() => {
        getElectronicsById(electronics_id).then((electronic) => {
            setLoading(false)
            setElectronic(electronic)
        }).catch((err) => {
            console.error(err);
        })

        
    }, [loggedInUser.username])

    const handleAddBasket = () => {
        if (loggedInUser.username) {
            const newItem = {
                username: loggedInUser.username,
                electronics_id: electronics_id,
                basket_quantity: 1,
                created_at: new Date().toISOString().slice(0, 10)
            };
    
            const existingItem = basketList.find((basket) => basket.electronics_id === electronics_id);
            console.log(basketList, '<<<basketList before adding');
            console.log(electronics_id);
            
            console.log(existingItem, '<<existing item before adding');
    
            if (existingItem) {
                // If item exists, update its quantity in the state
                console.log('Item exists, updating quantity');
                const updatedBasket = basketList.map((basket) =>
                    basket.electronics_id === electronics_id
                        ? { ...basket, basket_quantity: basket.basket_quantity + 1 }
                        : basket
                );
    
                setBasketList(updatedBasket);
    
                // Call patch to update the backend item quantity
                patchItemInBasket(loggedInUser.user_id, electronics_id, { updatedQuantity: 1 })
                    .then(() => {
                        console.log('Item quantity updated in the backend');
                    })
                    .catch((err) => {
                        console.error('Error updating item in the backend:', err);
                    });
            } else {
                // If item does not exist, add it as a new item in the state and backend
                console.log('Item does not exist, adding new item');
                setBasketList([...basketList, newItem]);
    
                postBasket(newItem)
                    .then(() => {
                        console.log('New item added to the backend');
                    })
                    .catch((err) => {
                        console.error('Error adding new item to the backend:', err);
                    });
            }
    
            togglePopup();
        } else {
            toast.error("Sign in to complete this action");
        }
    };
    

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleTypeclick = () => {
        navigate(`/electronics?electronics_type=${electronic.electronics_type}`)
    }

    const handleBasket = () => {
        navigate('/basket')
    }

    // if(loading){
    //     return <Loading />
    // }
    console.log(basketList);
    
    if (!document.startViewTransition) {
        if (loading) {
            return <Loading />
        }
    }

    return (
        <>
        <div className="electronic-device-page-container">
            <div className="electronic-device-wrapper">
                <div className="electronic-device-meta">
                    <a onClick={()=>{navigate(-1)}}><FaArrowLeft size={20}/></a><span>Being Sold By: {electronic.username}</span>
                </div>
                <div className="main-contain">
                    <main className="electronic-device">

                        <img src={electronic.img_url} alt={electronic.model}
                            style={{ viewTransitionName: `device${Params.electronics_id}`, contain: "layout", transition: "10s", animationDuration: "10s" }} />
                        <div className="electronic-details">
                            <h1>{electronic.name}</h1>
                            <h2>{electronic.model}</h2>
                        </div>
                        <p><strong>Description:</strong> {electronic.description}</p>
                        <p><strong>Storage:</strong> {electronic.storage_in_gb}GB</p>
                        <p><strong>Price:</strong> £{electronic.price}</p>
                        {/* <p><strong>Seller:</strong> {electronic.username}</p> */}
                        <button onClick={handleAddBasket}>Add to cart</button>

                        {showPopup && (
                            <div className="popup">
                                <div className="popup-content">
                                    {/* Customize the message based on the success or failure */}
                                    <p>Item <strong>{electronic.model}</strong> has been added to your Basket!</p>
                                    {/* Add additional content or actions if needed */}
                                    <div className="flex-space-between-gap10px">
                                        <button type="button" onClick={togglePopup}>Close</button>
                                        <button type="button" className="to-cart-btn" onClick={handleBasket}>Go to cart</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>

                    <div className="device-stats">
                        <div className="electronic-device-epithet">
                            <Icon props={electronic.electronics_type} className="electronics_device-icon" size={45} />
                            <span><h3 className="device-type" onClick={handleTypeclick}>{electronic.electronics_type}</h3></span>
                        </div>
                        <h1>{electronic.model}</h1>
                        {/* <br></br> */}
                        <h2>Price: £{electronic.price}</h2>

                        <div className="capacity">
                            <span><p className="capacity-title">Capacity:</p></span>
                            <span className="storage-sector"><h3 className="device-storage">{electronic.storage_in_gb}GB</h3></span>
                        </div>
                        <div className="quantity">
                            <span><p className="quauntity-title">Quantity:</p></span>
                            <span><h3 className="device-quantity">There are {electronic.quantity} of this item in stock.</h3></span>
                        </div>
                        <div className="sale-btns">
                            <button className="buy-btn" onClick={handleAddBasket}>Buy now</button>
                            <button className="cart-btn" onClick={handleAddBasket}>Add to cart</button>
                        </div>
                        { electronic.quantity > 0 ? null : <span>Out of stock</span>}
                    </div>
                </div>
            </div>
        </div>
        {/* <ToastContainer autoClose={2500} hideProgressBar={false} theme='colored' draggable closeOnClick/> */}
        </>
    )
}
