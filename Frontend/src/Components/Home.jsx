import "./Home.css";
import React, { useState, useEffect} from "react";

import img1 from './img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.jpg'
import img6 from './images/img6.jpg'
import img7 from './images/img7.jpg'




export default function Home(){

  useEffect(()=> {
    var slider = document.getElementById("slider");
    var sliderWidth = (slider.offsetWidth - ( + 29));
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
      }
      else if (count = 1) {
        count = items - 1;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
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
    
  });

    return (
      
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
    
    )
}