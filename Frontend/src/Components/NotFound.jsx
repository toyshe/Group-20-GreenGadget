import { Link } from "react-router-dom";
import './NotFound.css';


export default function NotFound() {
  return (
    <div className="notFound-page">
      <h2>Page not found:</h2>
      <h1>404</h1>
      <p>Lorem ipsum dolor sit amet, 
        consectetur adipisicing elit. 
        Impedit maxime amet ratione laudantium in temporibus eum harum natus quae maiores exercitationem modi reiciendis dolores, 
        deleniti aperiam neque sapiente? Eum, commodi.</p>

        <p>We're sorry the page you're looking for doesn't exist</p>

        <button><Link to={'/'}>Back to Homepage</Link></button>

        {/* <div class="bubble-btn">
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
            <div class="circle circle4"></div>
            <div class="circle circle5"></div>
            <div class="circle circle6"></div>
            <button><span>Submit</span></button>
        </div> */}

    </div>
  )
}
