import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { deleteItemInBasket, getBasketByUserId, patchItemInBasket } from "../../utils/utils";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
// import UndrawEmptyCart from "./SVG/undrawEmptyCart";

export default function Basket({ basketList, setBasketList }) {
    const { loggedInUser } = useContext(UserContext)
    const [err, setErr] = useState('')
    const navigate = useNavigate();
    const [orderlen, setorderlen] = useState(basketList.length);
    const [userTypeError, setUserTypeError] = useState(loggedInUser.username);
    const [oneItem, setOneItem] = useState(false)


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

    const handleIncrementItem = (updatedQuantity, user_id, electronics_id) => {
        setBasketList((prevBasket) => {
            return prevBasket.map((item) => {
                if (item.electronics_id === electronics_id && item.user_id === user_id) {
                    return { ...item, basket_quantity: item.basket_quantity + updatedQuantity };
                }
                return item;
            });
        });
        const increment = { updatedQuantity }
        console.log(increment);
        patchItemInBasket(user_id, electronics_id, increment).then((data) => {
            if (data === 'Not enough stock available') {
                setErr(data)
                setBasketList((prevBasket) => {
                    return prevBasket.map((item) => {
                        if (item.electronics_id === electronics_id && item.user_id === user_id) {
                            return { ...item, basket_quantity: item.basket_quantity - updatedQuantity };
                        }
                        return item;
                    });
                });
            }
            else if (data === 'item not found') {
                setErr(data)
                setBasketList((prevBasketList) =>
                    prevBasketList.filter(
                        (item) => !(item.user_id === user_id && item.electronics_id === electronics_id)
                    )
                );
            }
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
            // console.log(nameCountMap);
        });

        return Object.values(nameCountMap);
    };
    console.log(err, '<<err in basket');


    // Summarized entries
    const summarizedEntries = summarizeEntries(basketList);

    useEffect(() => {
        const summarizedEntries = summarizeEntries(basketList);
    }, [basketList]);

    /* */


    return (
        <div>
            <Helmet>
                <title>Greengadget | Shopping basket</title>
                <meta name="description" content="View and manage your basket. 
                Review your products, update quantities, and proceed to checkout for a seamless shopping experience."/> 
            </Helmet>
            <div className="summary-wrapper">
                <div className="summary-container">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                    </div>
                    <div className="justify-content-between">
                        <span><strong>Subtotal:</strong> (state:{orderlen} items static:{basketList.length})</span>
                        <span>state:£{testprice} or static:£{totalprice}</span>
                    </div>
                    <button onClick={() => { navigate('/electronics') }}> Click here to return back to shopping</button>
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
                                        {/* <button disabled={basket.basket_quantity === 1} onClick={() => handleIncrementItem(-1, basket.user_id, basket.electronics_id)} className="minus" >
                                            <FaMinus />
                                        </button>
                                        <span>{basket.basket_quantity}</span>
                                        <button  onClick={() => handleIncrementItem(1, basket.user_id, basket.electronics_id)} className="plus">
                                            <FaPlus />
                                        </button> */}

                                        <div
                                            className={`icon-container ${basket.basket_quantity === 1 ? 'disabled' : ''}`}
                                            onClick={() => basket.basket_quantity > 1 && handleIncrementItem(-1, basket.user_id, basket.electronics_id)}
                                        >
                                            <FaMinus className="minus" />
                                        </div>
                                        <span>{basket.basket_quantity}</span>
                                        <div className="icon-container" onClick={() => handleIncrementItem(1, basket.user_id, basket.electronics_id)}>
                                            <FaPlus className="plus" />
                                        </div>

                                    </div>
                                    {err ? <h2>{err}</h2> : null}
                                </div>
                                <button onClick={() => handleRemoveItem(basket.user_id, basket.electronics_id)}>Remove</button>
                            </div>
                        </div>
                    )
                })} </div>
            {!loggedInUser.username ?
                <p className="login-message">You need to log in to make an order</p>
                : null
            }

            {summarizedEntries.length > 0 ?
            <>
                <h1 style={{ textAlign: "center", fontSize: "44px" }}>Summarized Entries</h1>
                <div style={{ padding: "15px" }}>
                    {/* {console.log(summarizedEntries.length)}
                    {console.log(summarizedEntries)} */}
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
                        </div>
                    ))}
                </div>
            </>
            : null}

            {loggedInUser.username & (basketList.length === 0) ?
                <div className="basket-es">
                    <UndrawEmptyCart/>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't placed anything in your cart yet</p>
                    <Link to={'/electronics'}>Go shop
                        <span className="button-reflection"></span>
                    </Link>
                 </div>
                : null
            }
            
            <div className="basket-order-btn-wrapper">
                <button className="basket-order-btn btn btn-3 hover-border-1" disabled={!userTypeError} onClick={() => handleOrderItem(basketList)}>
                    <span> Order </span> 
                </button>
            </div>

        </div>
    )
}