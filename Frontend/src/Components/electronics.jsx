import getAllElectronics from "../../utilis/utilis"; 
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
//import ErrorHandling from "./ErrorHandling";
import SortElectronics from "./SortElectronics";

export default function Electronics({ electronicList, setElectronics, electronicCategory}){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);


    useEffect(() => {
        getAllElectronics(electronicCategory||searchParams.get("category")).then(({ total_count }) => {
          setTotalPages(Math.ceil(total_count / 10));
        })
        getAllElectronics(
          searchParams.get("category"), sortBy, order, searchParams.get("p") || page
        )
          .then(({ electronics }) => {
            setElectronics(electronics);
          })
          .catch((err) => {
            setError(err);
          });
      }, [page, searchParams, sortBy, order]);

    const handleElectronicsClick = (electronic) =>{
      navigate(`/electronics/${electronic.electronics_id}`)
    };

    const handlePageChange = (pageNumber) => {
      setPage(pageNumber);
      navigate(
        `${
          searchParams.get("category")
            ? `/electronics?category=${searchParams.get("category")}&p=${pageNumber}`
            : `/electronics?p=${pageNumber}`
        }`
      );
    };

    /*if (error){
      return <ErrorHandling error={error} />; 
    }*/

    //return <h1>This is a test page</h1>
    return(

      <div className="electronics">
        <SortElectronics setSortBy={setSortBy} setOrder={setOrder} />
        <ul className="electronics-box">
          {electronicList.map((electronics) => (
            <li key={electronics.electronics_id} className="electronic-item">
              <button onClick={() => handleElectronicsClick(electronics)}>
                <p>{electronics.name}</p>
                <img src={electronics.img_url} alt={electronics.model} />
                <p>£{electronics.price}</p>
                <p>Seller: {electronics.shopkeeper_username}</p>
                <p>In stock: {electronics.quantity}</p>
              </button>
            </li>
          ))}
        </ul>
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
      </div>    );
}