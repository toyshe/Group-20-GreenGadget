import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import SortElectronics from "./SortElectronics";
import { getElectronics } from "../../utils/utils";
import CategoriesSelect from './CategoriesSelect';
import Totop from "./Totop";
import Icon from './Icon';
import Loading from './Loading';



export default function Electronics({ electronicList, setElectronics, categoriesList, setCategoriesList }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [electronicsCategory, setElectronicsCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getElectronics(electronicsCategory || searchParams.get("electronics_type"), sortBy, order).then((electronics) => {
      setElectronics(electronics)
      setLoading(false)
    })
  }, [searchParams, sortBy, order])


  const handleElectronicsClick = (electronics) => {
    navigate(`/electronics/${electronics.electronics_id}`)
  };

  if(loading){
    return <Loading loadingHeader=' electronics' />
  }

  return (
    <div className="electronics">
      <div className='filter-electronics'>
        <CategoriesSelect setElectronicsCategory={setElectronicsCategory} categoriesList={categoriesList} setCategoriesList={setCategoriesList} />
        <SortElectronics setSortBy={setSortBy} setOrder={setOrder} />
          {/* {loading ? 5 :<FaArrowsSpin className="fa-spin" size={40}/>}   */}
      </div>
      <ul className="electronics-box">
        {electronicList.map((electronics) => (
          <li key={electronics.electronics_id} className="electronic-item">
            <button className='electronics_button' onClick={() => handleElectronicsClick(electronics)}>
              <div className='electronics-epithet'>
                <Icon props={electronics.electronics_type} className="electronics_button-icon" size={24} />
                <p>{electronics.name}</p>
              </div>
              <img className='electronics_img' src={electronics.img_url} alt={electronics.model} />
              <p><strong>Storage:</strong> {electronics.storage_in_gb}GB</p>
              <p><strong>£</strong>{electronics.price}</p>
              <p><strong>Seller: </strong>{electronics.username}</p>
              <p><strong>In stock:</strong> {electronics.quantity}</p>
            </button>
          </li>
        ))}
      </ul>
      <Totop />
    </div>
  );
}