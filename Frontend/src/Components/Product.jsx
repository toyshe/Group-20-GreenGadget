import React from "react";
import { useEffect, useState } from "react";
import { getElectronicsById } from "../../utils/utils";
import { useParams } from "react-router-dom";

export default function Product(electronic) {
  
    /*const {electronics_id} = useParams()
    const [electronic, setElectronic] = useState({})

    useEffect(() => {
        getElectronicsById(electronics_id).then((electronic) => {
            setElectronic(electronic)
        }).catch((err) => {
            console.log(err);
        })
    }, [])*/
    
      
    return(
        <>
        <img src={electronic.img_url} alt={electronic.model} />
            <div className="electronic-details">
                <h1>{electronic.name}</h1>
                <h2>{electronic.model}</h2>
                <p>Description: {electronic.description}</p>
                <p>Storage: {electronic.storage_in_gb}GB</p>
                <p>Price: {electronic.price}</p>
                <p>Seller: {electronic.username}</p>
            </div>
        </>
    )
}
