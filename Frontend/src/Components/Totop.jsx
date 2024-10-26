import { useEffect } from "react";
import "./Totop.css";


export default function Totop(
    {className = ""}
){
    useEffect(()=> {
        const toTop = document.querySelector(".to-top");
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 200){
                toTop.classList.add("active");
            }else{
                toTop.classList.remove("active");
            }
        });
    }, []);
    
    return(
    <a href="#" aria-label="Scroll to the top of the current page" className={`${className} to-top`}>
      <i className="fa-solid fa-chevron-up"></i>
    </a>
    )
}