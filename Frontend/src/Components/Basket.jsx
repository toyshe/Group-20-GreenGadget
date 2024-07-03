import { useContext, useEffect, useState } from "react";
import { getBasketByUserId } from "../../utils/utils";
import UserContext from "../contexts/UserContext";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


export default function Basket({ basketList, setBasketList }) {
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [orderlen, setorderlen] = useState(basketList.length);
    console.log(orderlen);

    

    let totalprice = 0;

    basketList.forEach(element => {
        totalprice += element.price;
        // console.log(sum);
        // console.log(element.price);
        // settestprice(testprice + element.price)
    });

    const [testprice, settestprice] = useState(totalprice);
    console.log(totalprice);
    console.log(testprice);


    useEffect(() => {
        getBasketByUserId(loggedInUser.user_id).then((data) => {
            setBasketList(data)
        })
    }, [])

    const handleRemoveItem = (index) => {
        const updatedBasketList = [...basketList];
        updatedBasketList.splice(index, 1);
        setBasketList(updatedBasketList);
        setorderlen(prevOrderlen=>prevOrderlen - 1)
    }

    const handleOrderItem = (basketItem) => {
        console.log("Ordering item:", basketItem);
    };

    return (
        <div>
            <div className="summary-wrapper">
                <div className="summary-container">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                    </div>
                    <div className="justify-content-between">
                        <span><strong>Subtotal:</strong> (state:{orderlen} items static:{basketList.length})</span>
                        <span>state:£{testprice} or static:£{totalprice}</span>
                    </div>
                    <button onClick={()=>{navigate('/electronics')}}> Click here to return back to shopping</button>
                </div>
            </div>
            {console.log(basketList.length)}
            {console.log(loggedInUser)}

            {/* {loggedInUser.user_type === 'shopkeeper' ? null : <p className="input-invalid">Sorry, only shopkeepers are allowed to sell an item</p>} */}
            <div>
            {basketList.map((basket, index) => {
                return (
                <div className="basket-item">
                    {console.log(index)}

                    <img src={basket.img_url} />
                    <div>
                        <p>{basket.name}</p>
                        <p>{basket.model}</p>
                        <p className="price">£{basket.price}</p>
                        <p className="quantity">In stock: {basket.quantity}</p>
                        <button onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                    <div className="quantity-adjuster">
                        <FaMinus className="minus"/>
                        <span>current amount goes here</span>
                        <FaPlus className="plus"/>
                    </div>

                </div>
                )
            })}
            </div>
            <button onClick={() => handleOrderItem(basket)}>Order</button>
        </div>
    )
}