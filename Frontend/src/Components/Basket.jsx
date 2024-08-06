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
    const [userTypeError, setUserTypeError] = useState(loggedInUser.username);

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

    const handleElectronicsClick = (electronics) => {
        navigate(`/electronics/${electronics.electronics_id}`)
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

            <div>
            {basketList.map((basket, index) => {
                return (
                <div className="basket-item">
                    {console.log(index)}
                    <div className="basket-img-wrapper">
                    <img onClick={()=> {handleElectronicsClick(basket)}} src={basket.img_url} />
                    </div>
                    <div style={{marginLeft: "10px"}}>
                        <h2 style={{margin: "0"}}>{basket.name}</h2>
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
            {!loggedInUser.username ?
            <p className="login-message">You need to log in to make an order</p> 
            : null}
            {/* fix this */}
            <button disabled={userTypeError} onClick={() => handleOrderItem(basket)}>Order</button>
        </div>
    )
}