import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
//import ErrorHandling from "./ErrorHandling";
import SortElectronics from "./SortElectronics";
import { getElectronics } from "../../utils/utils";
import CategoriesSelect from './CategoriesSelect';
import Totop from "./Totop";



export default function Electronics({electronicList, setElectronics}){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");

    const [electronicsCategory, setElectronicsCategory] = useState('')


    useEffect(() => {
      console.log(electronicsCategory);
      getElectronics(electronicsCategory || searchParams.get("category"), sortBy, order).then((electronics) => {

        setElectronics(electronics)
      })
    }, [searchParams, sortBy, order])

    const handleElectronicsClick = (electronic) =>{
      console.log(electronic.electronics_id);
      navigate(`/electronics/${electronic.electronics_id}`)
    };

    return(

      <div className="electronics">
        <CategoriesSelect setElectronicsCategory={setElectronicsCategory} />
        <SortElectronics setSortBy={setSortBy} setOrder={setOrder} />
        {console.log(sortBy, order)}        
        <ul className="electronics-box">
          {electronicList.map((electronics) => (
            <li key={electronics.electronics_id} className="electronic-item">
              <button className='electronics_button' onClick={() => handleElectronicsClick(electronics)}>
                <p>{electronics.name}</p>
                <img className='electronics_img' src={electronics.img_url} alt={electronics.model} />
                <p><strong>Storage:</strong> {electronics.storage_in_gb}GB</p>
                <p><strong>£</strong>{electronics.price}</p>
                <p><strong>Seller: </strong>{electronics.username}</p>
                <p><strong>In stock:</strong> {electronics.quantity}</p>
              </button>
            </li>
          ))}
        </ul>
        <Totop/>
      </div>    
      );
}