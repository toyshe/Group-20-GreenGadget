import { Link } from "react-router-dom";
import './NotFound.css';
import { TbError404Off } from "react-icons/tb";
import { BiSolidError } from "react-icons/bi";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Favicon from "./Favicon.jsx";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className="notFound-page">
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Oops! The page you are looking for cannot be found. 
        Return to our homepage or explore our products to find what you need."/> 
      </Helmet>



{/* <Favicon/> */}
      
      <div className="fof">
        <h1 className="four04-title"><span>404<BiSolidError className="soliderror"/><span className="Error404"><TbError404Off /></span></span></h1>
      </div>
      
      <span className="fof-log">PAGE NOT FOUND</span>
      <p className="fof-message">We're sorry, we couldn't find the page you're looking for.</p>


      <div style={{marginBottom: "30px", alignItems: "center", display: "flex", gap: "150px"}}> 

        <Link to={'/electronics'} className="conver-btn" >
          <FaArrowLeft/><span>Click Here to Shop</span>
        </Link>

        <div className="stylised-bubble-btn">
          <Link to={'/'}>
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="circle circle3"></div>
              <div className="circle circle4"></div>
              <div className="circle circle5"></div>
              <div className="circle circle6"></div>
              <div className="circle circle7"></div>
              <div className="circle circle8"></div>
              <button className="bubble-btn"><span>Back to Homepage</span> <FaHome/></button>
            </Link>
        </div>

        </div>
    </div>
  )
}
