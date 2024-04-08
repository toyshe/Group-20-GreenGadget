import getAllElectronics from "../util/utils"; 
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import ErrorHandling from "./ErrorHandling";

export default function Electronics({ electronics, setElectronics}){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");
    //const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);


    useEffect(() => {
        getAllElectronics(
          searchParams.get("categories"), sortBy, order, searchParams.get("p") || page
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

    if (error){
      return <ErrorHandling error={error} />; 
    }

    return (
      <div className="electronics">
        <SortElectronics setSortBy={setSortBy} setOrder={setOrder} />
        <ul className="electronics-box">
          {electronics.map((electronic) => (
            <li key={electronic.electronics_id} className="electronic-item">
              <button onClick={() => handleElectronicsClick(electronic)}>
                <p>{electronic.name}</p>
                <img src={electronic.img_url} alt={electronic.model} />
                <p>£{electronic.price}</p>
                <p>Seller: {electronic.shopkeeper_username}</p>
                <p>In stock: {electronic.quantity}</p>
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