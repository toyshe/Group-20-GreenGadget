import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { deleteItemInBasket, getBasketByUserId } from "../../utils/utils";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Basket({ basketList, setBasketList }) {
    const { loggedInUser } = useContext(UserContext)
    const [err, setErr] = useState('')
    const navigate = useNavigate();
    const [orderlen, setorderlen] = useState(basketList.length);
    const [userTypeError, setUserTypeError] = useState(loggedInUser.username);

    useEffect(() => {
        getBasketByUserId(loggedInUser.user_id).then((data) => {
            setBasketList(data)
        }).catch((err) => {
            setErr(err)

        })
    }, [])

    const handleRemoveItem = (user_id, electronics_id) => {
        setBasketList((prevBasketList) =>
            prevBasketList.filter(
                (item) => !(item.user_id === user_id && item.electronics_id === electronics_id)
            )
        );
        deleteItemInBasket(user_id, electronics_id).catch((err) => {
            console.error(err)
        })
    }

    /* */

    const handleElectronicsClick = (electronics) => {
        navigate(`/electronics/${electronics.electronics_id}`)
    };

    let totalprice = 0;

    basketList.forEach(element => {
        totalprice += element.price;
        // console.log(sum);
        // console.log(element.price);
        // settestprice(testprice + element.price)
    });

    const [testprice, settestprice] = useState(totalprice);

    const handleRemoveItemEntry = (entry) => {
        // {console.log("handleRemoveItemEntry")};
        var keepcheckinghandleRemoveItemEntry = true;
        basketList.forEach((basket, index) => {
            if (basket.electronics_id === entry.electronics_id && keepcheckinghandleRemoveItemEntry) {
                // {console.log("found a match")};
                // {console.log(basket)};
                // {console.log(entry)};
                keepcheckinghandleRemoveItemEntry = false;
                const updatedBasketList = [...basketList];
                updatedBasketList.splice(index, 1);
                setBasketList(updatedBasketList);
                setorderlen(prevOrderlen => prevOrderlen - 1)
            }
        });
    }

    const handleRemoveItemAllEntries = (electronics_id) => {
        deleteItemInBasket(loggedInUser.user_id, electronics_id)
    }

    const handleOrderItem = (basketItem) => {
        console.log("Ordering item:", basketItem);
    };

    const summarizeEntries = (entries) => {
        const nameCountMap = {};

        entries.forEach((entry) => {
            const electronics_id = entry.electronics_id;
            if (nameCountMap[electronics_id]) {
                nameCountMap[electronics_id].count += 1;
            } else {
                nameCountMap[electronics_id] = {
                    ...entry,
                    count: 1
                };
            }
            console.log(nameCountMap);
        });

        return Object.values(nameCountMap);
    };


    // Summarized entries
    const summarizedEntries = summarizeEntries(basketList);

    useEffect(() => {
        const summarizedEntries = summarizeEntries(basketList);
    }, [basketList]);

    /* */

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
            <div style={{ padding: "15px" }}>
                {basketList.map((basket, index) => {
                    return (
                        <div className="basket-item" key={index}>

                            <div className="basket-img-wrapper">
                                <img src={basket.img_url} />
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                                <h2 style={{ margin: "0" }} >{basket.name}</h2>
                                <p>{basket.model}</p>
                                <p className="price">£{basket.price}</p>

                                <div className="quantity-conroller" >
                                    <p className="quantity">In stock: {basket.quantity}</p>
                                    <div className="quantity-adjuster">
                                        <FaMinus className="minus" />
                                        <span>{basket.basket_quantity}</span>
                                        <FaPlus className="plus" />
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(basket.user_id, basket.electronics_id)}>Remove</button>
                            </div>
                        </div>
                    )
                })} </div>
            {!loggedInUser.username ?
                <p className="login-message">You need to log in to make an order</p>
                : null}

            <h1 style={{ textAlign: "center", fontSize: "44px" }}>Summarized Entries</h1>
            <div style={{ padding: "15px" }}>
                {console.log(summarizedEntries.length)}
                {console.log(summarizedEntries)}
                {summarizedEntries.map((entry, index) => (
                    <div className="basket-item" key={index}>
                        <div className="basket-img-wrapper">
                            <img onClick={() => { handleElectronicsClick(entry) }} src={entry.img_url} />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <h2 onClick={() => { handleElectronicsClick(entry) }}>{entry.name}</h2>
                            <p className="basket-item-subheading">{entry.model}</p>
                            <p className="price">£{entry.price}</p>

                            <div className="quantity-controller" >
                                <p className="quantity">In stock: {entry.quantity}</p>
                                <div className="quantity-adjuster">
                                    <FaMinus className="minus" onClick={() => handleRemoveItemEntry(entry)} />
                                    <span>{entry.count}</span>
                                    <FaPlus className="plus" />
                                </div>
                            </div>

                            <button onClick={() => handleRemoveItemAllEntries(entry.electronics_id)}>Remove All</button>
                            {/* change using an array method to search basket list */}

                            {/*<td>{entry.electronics_type}</td>
                                <td>{entry.storage_in_gb}</td> */}
                        </div>
                    </div>))}
            </div>
            <button disabled={!userTypeError} onClick={() => handleOrderItem(basketList)}>Order</button>

        </div>
    )
}