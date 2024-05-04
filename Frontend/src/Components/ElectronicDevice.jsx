import { useContext, useEffect, useState } from "react";
import { getElectronicsById, postBasket } from "../../utils/utils";
import { useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function ElectronicDevice({setBasketList, basketList}) {
    const {electronics_id} = useParams()
    const [electronic, setElectronic] = useState({})
    const {loggedInUser} = useContext(UserContext)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        getElectronicsById(electronics_id).then((electronic) => {
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
    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    return (
        <div className="main-contain">
        <main className="electronic-device">
            <div>
            <img src={electronic.img_url} alt={electronic.model} />
            <div className="electronic-details">
                <h1>{electronic.name}</h1>
                <h2>{electronic.model}</h2>

                <p><strong>Description:</strong> {electronic.description}</p>
                <p><strong>Storage:</strong> {electronic.storage_in_gb}GB</p>
                <p><strong>Price:</strong> £{electronic.price}</p>
                <p><strong>Seller:</strong> {electronic.username}</p>
            </div>

                <p>Description: {electronic.description}</p>
                <p>Storage: {electronic.storage_in_gb}GB</p>
                <p>Price: {electronic.price}</p>
                <p>Seller: {electronic.username}</p>
                <button onClick={handleAddBasket}>Add to cart</button>

            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Customize the message based on the success or failure */}
                        <p>Item Added to Basket!</p>
                        {/* Add additional content or actions if needed */}
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}
        </main>

        <div className="device-stats">
            <span><h3 className="device-type">{electronic.electronics_type}</h3></span>
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
        </div>
        </div>
    )
}
