import React from "react";
import "./product.css";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Favicon from "./Favicon.jsx";


export default function Product({electronicList}) {

    const navigate = useNavigate();

    const handleElectronicsClick = (electronic) => {
        navigate(`/electronics/${electronic.electronics_id}`)
    };

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1300 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1300, min: 1000 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1000, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    

    return(
        <>
        <Carousel 
        responsive={responsive}
        swipeable={true}
        draggable={true}
        >
            {electronicList.map((electronic) => (
                <div key={electronic.electronics_id} className="product-item">
                    <Favicon/>
                    <div className="product-item-container">
                    <div className="product-type"><span>Reccomended</span></div>
                        <div className="product-img" onClick={() => handleElectronicsClick(electronic)} ><img src={electronic.img_url} alt={electronic.model} /></div>
                        <div className="product-details">
                            {/* {console.log(electronic.electronics_type)} */}
                            <div className="product-subtitle" onClick={() =>{
                                const electronicstype = electronic.electronics_type === "Phone" ? (()=>{navigate(`/electronics?electronics_type=${electronic.electronics_type}`)})
                                : electronic.electronics_type === 'Laptop' ?  (()=>{navigate(`/electronics?electronics_type=${electronic.electronics_type}`)})
                                : electronic.electronics_type === "Smartwatch" ? (()=>{navigate(`/electronics?electronics_type=${electronic.electronics_type}`)})
                                : (()=>{navigate(`/electronics?electronics_type=${electronic.electronics_type}`)});
                                electronicstype();
                            }}> <a className="product-subtitle-text"> {electronic.electronics_type} </a></div>
                            {/* {console.log(electronicstype)} */}
                            <h1 className="product-name" onClick={() => handleElectronicsClick(electronic)} >{electronic.name}</h1>
                            {/* <h2>{electronic.model}</h2> */}
                            {/* <p>Description: {electronic.description}</p> */}
                            {/* <p>Storage: {electronic.storage_in_gb}GB</p> */}
                            <div className="product-prices">
                                <p>Price: £{electronic.price}</p>
                                <div className="basket-icon"><BsFillBasket3Fill size={30} /></div>
                            </div>
                            {/* <p>Seller: {electronic.username}</p> */}
                        </div>
                    </div>
                    <button className="pc-cta">Buy now</button>
                </div>
            ))}
        </Carousel>
        </>
    )
}
