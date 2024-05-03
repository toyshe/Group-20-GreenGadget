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
        <main className="electronic-device">
            <img src={electronic.img_url} alt={electronic.model} />
            <div className="electronic-details">
                <h1>{electronic.name}</h1>
                <h2>{electronic.model}</h2>
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
    )
}
