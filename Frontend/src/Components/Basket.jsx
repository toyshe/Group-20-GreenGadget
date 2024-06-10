import { useContext, useEffect } from "react";
import { getBasketByUserId } from "../../utils/utils";
import UserContext from "../contexts/UserContext";

export default function Basket({ basketList, setBasketList }) {
    const { loggedInUser } = useContext(UserContext)

    useEffect(() => {
        getBasketByUserId(loggedInUser.user_id).then((data) => {
            setBasketList(data)
        })
    }, [])

    const handleRemoveItem = (index) => {
        const updatedBasketList = [...basketList];
        updatedBasketList.splice(index, 1);
        setBasketList(updatedBasketList);
    };

    const handleOrderItem = (basketItem) => {
        console.log("Ordering item:", basketItem);
    };

    return (
        <div>
            {basketList.map((basket) => {
                return (<div className="basket-item">

                    <img src={basket.img_url} />
                    <div>

                        <p>{basket.name}</p>
                        <p>{basket.model}</p>
                        <p className="price">{basket.price}</p>
                        <p className="quantity">{basket.quantity}</p>
                        <button onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                </div>)
            })}
            <button onClick={() => handleOrderItem(basket)}>Order</button>
        </div>
    )
}