import "./Home.css";
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import img1 from './img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'
import img6 from './images/img6.jpg'
import img7 from './images/img7.jpg'
import img8 from './images/img8.jpg'
import img10 from './images/img10.jpg'
import img11 from './images/img11.jpg'
import img12 from './images/img12.jpg'
import acit1 from './images/acit1.png'
import acit2 from './images/acit2.png'
import acit3 from './images/acit3.png'
import acit4 from './images/acit4.png'
import acit5 from './images/acit5.png'
import acit6 from './images/acit6.png'
import Product from "./Product";
import Totop from "./Totop";
// import { getElectronics } from "../../utils/utils";



export default function Home({electronicList}){
  
  console.log("test print at home")
  console.log(electronicList)

  //fix/reorgainse this 
  useEffect(()=> {
    var slider = document.getElementById("slider");
    var sliderWidth = (slider.offsetWidth - ( + 10));
    // console.log(slider.offsetWidth)
    var slideList = document.getElementById("slideWrap");
    let count = 1;
    var items = slideList.querySelectorAll("li").length;
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

  
    window.addEventListener('resize', function() {
      sliderWidth = slider.offsetWidth;
    });
  
    const prevSlide = function() {
      if (count > 1) {
        count = count - 2;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
        // console.log(slider.offsetWidth)
      }
      else if (count = 1) {
        count = items - 1;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
        // console.log(slider.offsetWidth)
      }
    };
  
  
    const nextSlide = function() {
      if (count < items) {
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      }
      else if (count = items) {
        slideList.style.left = "0px";
        count = 1;
      }
    };
  
    next.addEventListener("click", function(){
      nextSlide();
    });
    prev.addEventListener("click", function(){
      prevSlide();
    });
    
  
    setInterval(function(){
      nextSlide();
    }, 5000)  
    
  },[]);


    return (
      <div className="home-conatainer">

        <div className="CTA"> 
        </div>
        
        <div className="img-slider-container">
        <div id="slider">
        <ul id="slideWrap">
          <li><img src= {img1} alt="placeholder img1"></img></li>
          <li><img src={img2} alt="placeholder img2"></img></li>
          <li><img src={img3} alt="placeholder img3"></img></li>
          <li><img src={img4} alt="placeholder img4"></img></li>
          <li><img src={img5} alt="placeholder img5"></img></li>
          <li><img src={img6} alt="placeholder img6"></img></li>
          <li><img src={img7} alt="placeholder img7"></img></li>
        </ul>
        <a id="prev" >&#10094;</a>
        <a id="next" >&#10095;</a>
        </div>
      </div>

      <Product electronicList={electronicList} />

      {/* user benefit  */}

      <div className="card-container">
      {/* <div className="rm-card">
      <img src={img10} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>Welcome</h3>
        <p className="sub-heading">Welcome to our site</p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div> */}

    <div className="acit-card">
        <div className="acit-face acit-face1">
            <img src={acit1} alt="where to start" className="card-img"></img>
        </div>
        <div className="acit-face acit-face2">
          <div className="acit-content">
            <h3>Welcome</h3>
            <p>Find anwsers to frequently asked questions, 
              and general help navigating the site.
            </p>
            <Link to={'/FAQ'}>Read More</Link>
          </div>
        </div>
      </div>


    {/* <div className="rm-card">
      <img src={img11} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>Help</h3>
        <p className="sub-heading">How to navigate the site</p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div> */}


    <div className="acit-card">
        <div className="acit-face acit-face1">
            <img src={acit5} alt="where to start" className="card-img"></img>
        </div>
        <div className="acit-face acit-face2">
          <div className="acit-content">
            <h3>Help</h3>
            <p>Find anwsers to frequently asked questions, 
              and general help navigating the site.
            </p>
            <Link to={'/FAQ'}>Read More</Link>
          </div>
        </div>
      </div>


    {/* <div className="rm-card">
      <img src={img12} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>How we keep you safe</h3>
        <p className="sub-heading"></p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div> */}

    <div className="acit-card">
        <div className="acit-face acit-face1">
            <img src={acit2} alt="where to start" className="card-img"></img>
        </div>
        <div className="acit-face acit-face2">
          <div className="acit-content">
            <h3>How we keep you safe</h3>
            <p>Find anwsers to frequently asked questions, 
              and general help navigating the site.
            </p>
            <Link to={'/FAQ'}>Read More</Link>
          </div>
        </div>
      </div>

    {/* <div className="rm-card">
      <img src={acit1} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>How we keep you safe</h3>
        <p className="sub-heading"></p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div>
    <div className="rm-card">
      <img src={acit2} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>How we keep you safe</h3>
        <p className="sub-heading"></p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div>
    <div className="rm-card">
      <img src={acit3} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>How we keep you safe</h3>
        <p className="sub-heading"></p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div>
    <div className="rm-card">
      <img src={acit4} alt="where to start" className="card-img"></img>
      <div className="card-info">
        <h3>How we keep you safe</h3>
        <p className="sub-heading"></p>
        <p></p>
        <a href="">Read More</a>
      </div>
    </div> */}

      <div className="acit-card">
        <div className="acit-face acit-face1">
            <img src={acit6} alt="where to start" className="card-img"></img>
        </div>
        <div className="acit-face acit-face2">
          <div className="acit-content">
            <h3>Terms & Conditions</h3>
            <p>Find anwsers to frequently asked questions, 
              and general help navigating the site.
            </p>
            <Link to={'/TC'}>Read More</Link>
          </div>
        </div>
      </div>


    {/* <div className="acit-card">
        <div className="acit-face acit-face1">
          <div className="acit-content">
            <img src={acit4} alt="where to start" className="card-img"></img>
            <h3>Help</h3>
          </div>
        </div>
        <div className="acit-face acit-face2">
          <div className="acit-content">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  
            Inventore, cum nisi dolores libero aperiam asperiores.</p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div> */}


    </div>
        <Totop/>
      </div>

      
    
    )
}