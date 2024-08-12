import { useContext, useEffect, useState } from "react";
import { getElectronicsById, postBasket } from "../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Icon from './Icon';
import Loading from "./Loading";


export default function ElectronicDevice({setBasketList}) {
    const {electronics_id} = useParams()
    const [electronic, setElectronic] = useState({})
    const {loggedInUser} = useContext(UserContext)
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        getElectronicsById(electronics_id).then((electronic) => {
            setLoading(false)
            setElectronic(electronic)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleAddBasket = () => {
        if(loggedInUser.username){
            setBasketList((prevBasket) => {
                return [...prevBasket, {electronic}]
            })
            postBasket({username: loggedInUser.username, electronics_id, quantity: 1})
            togglePopup()
        }
        else{
            // add messsage telling user they need to sign in 
            // look into libraries that do toast notifications 
            // or amother workaround e.g. create own
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleTypeclick = () => {
        navigate(`/electronics?electronics_type=${electronic.electronics_type}`)
    }

    const handleBasket = () => {
        navigate('/basket')
    }
    
    if(loading){
        return <Loading />
    }

    return (
        <div className="main-contain">
        <main className="electronic-device">
            <div>
            <img src={electronic.img_url} alt={electronic.model} />
            <div className="electronic-details">
                <h1>{electronic.name}</h1>
                <h2>{electronic.model}</h2>
            </div>

                <p><strong>Description:</strong> {electronic.description}</p>
                <p><strong>Storage:</strong> {electronic.storage_in_gb}GB</p>
                <p><strong>Price:</strong> £{electronic.price}</p>
                <p><strong>Seller:</strong> {electronic.username}</p>
                <button onClick={handleAddBasket}>Add to cart</button>

            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Customize the message based on the success or failure */}
                        
                        <p>Item <strong>{electronic.model}</strong> has been added to Basket!</p>
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
                <Icon props={electronic.electronics_type} className="electronics_device-icon" size={45}/>
                <span><h3 className="device-type" onClick={handleTypeclick}>{electronic.electronics_type}</h3></span>
            </div>
            <h1>{electronic.model}</h1>
            <br></br>
            <h2>£{electronic.price}</h2>
            
            <div className="capacity">
                <span><p className="capacity-title">Capacity:</p></span>
                <span className="storage-sector"><h3 className="device-storage">{electronic.storage_in_gb}GB</h3></span>
            </div>
            <div className="quantity">
                <span><p className="quauntity-title">Quauntity:</p></span>
                <span><h3 className="device-quantity">There are {electronic.quantity} of this item in stock.</h3></span>
            </div>
            <div className="sale-btns">
                <button className="buy-btn" onClick={handleAddBasket}>Buy now</button>
                <button className="cart-btn"onClick={handleAddBasket}>Add to cart</button>
            </div>
        </div>
        </div>
    )
}
