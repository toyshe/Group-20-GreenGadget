import { Link } from "react-router-dom";
import './NotFound.css';


export default function NotFound() {
  return (
    <div className="notFound-page">
      <h2>Page not found:</h2>
      <div className="temptest">
        <h1 className="four04-title">404</h1>
        {/* <h1 className="four04-title2">404</h1> */}
      </div>
      <p>Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. 
        Impedit maxime amet ratione laudantium in temporibus eum harum natus quae maiores exercitationem modi reiciendis dolores, 
        deleniti aperiam neque sapiente? Eum, commodi.</p>

        <p>We're sorry the page you're looking for doesn't exist</p>

        {/* <button><Link to={'/'}>Back to Homepage</Link></button> */}

        <div className="stylised-bubble-btn">
          <Link to={'/'}>
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="circle circle3"></div>
              <div className="circle circle4"></div>
              <div className="circle circle5"></div>
              <div className="circle circle6"></div>
              <button className="bubble-btn"><span>Back to Homepage</span></button>
            </Link>
        </div>

    </div>
  )
}
