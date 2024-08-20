import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import SortElectronics from "./SortElectronics";
import { getElectronics } from "../../utils/utils";
import CategoriesSelect from './CategoriesSelect';
import Totop from "./Totop";
import Icon from './Icon';
import { FaArrowsSpin } from "react-icons/fa6";
import ElectronicsSkeleton from './ElectronicsSkeleton';
import { flushSync } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";


export default function Electronics({ electronicList, setElectronics, categoriesList, setCategoriesList }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [electronicsCategory, setElectronicsCategory] = useState('')
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  useEffect(() => {
    getElectronics(electronicsCategory || searchParams.get("electronics_type")).then((electronics) => {

      setTotalPages(Math.ceil(electronics.length / 9))
    })
    getElectronics(electronicsCategory || searchParams.get("electronics_type"), sortBy, order, searchParams.get("page") || page).then((electronics) => {
      setElectronics(electronics)
      setLoading(false)
    })
  }, [searchParams, sortBy, order, page])

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    navigate(
      `${searchParams.get("electronics_type")
        ? `/electronics?topic=${searchParams.get("electronics_type")}&page=${pageNumber}`
        : `/electronics?page=${pageNumber}`
      }`
    );
  };

  const handleElectronicsClick = (electronics) => {

    if (!document.startViewTransition) {
      navigate(`/electronics/${electronics.electronics_id}`)
    }
    else {
      document.startViewTransition(() => {
        flushSync(() => {
          { console.log(electronics.electronics_id) }
          navigate(`/electronics/${electronics.electronics_id}`)
          console.log("startViewTransition should work")
        })
      })
    }
  };

  return (
    <>
      <div className="electronics">
        <div className='filter-electronics'>
          <CategoriesSelect setElectronicsCategory={setElectronicsCategory} categoriesList={categoriesList} setCategoriesList={setCategoriesList} setPage={setPage} />
          <SortElectronics setSortBy={setSortBy} setOrder={setOrder} setPage={setPage} />
          {console.log(electronicList)}
          {loading ? (
            <div>
              <ElectronicsSkeleton />
            </div>
          ) :
            (
              <>
                <ul className="electronics-box">
                  {electronicList.map((electronics) => (
                    <li key={electronics.electronics_id} className="electronic-item">
                      <button className='electronics_button' onClick={() => handleElectronicsClick(electronics)}>
                        <div className='electronics-epithet'>
                          <Icon props={electronics.electronics_type} className="electronics_button-icon" size={24} />
                          <p>{electronics.name}</p>
                        </div>
                        <img className='electronics_img' src={electronics.img_url} alt={electronics.model}
                          style={{ viewTransitionName: `device${electronics.electronics_id}`, contain: "layout", transition: "10s", animationDuration: "10s" }}
                        />
                        <p><strong>Storage:</strong> {electronics.storage_in_gb}GB</p>
                        <p><strong>£{electronics.price}</strong> </p>
                        <p><strong>Seller: </strong>{electronics.username}</p>
                        <p><strong>In stock:</strong> {electronics.quantity}</p>
                      </button>
                      {/* {console.log(electronicList)} */}
                    </li>
                  ))}
                  {console.log(page)
                  }
                  <div className="pagination-buttons">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={page === index + 1 ? "active" : ""}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </ul>
                <Totop />
              </>
            )}

        </div>

      </div>
    </>
  );
}