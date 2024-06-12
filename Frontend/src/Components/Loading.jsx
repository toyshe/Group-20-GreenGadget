import { useEffect } from 'react';
import './loading.css';
import favicon from"/favicon.png";

export default function Loading({loadingHeader}){
    let dots = `.`;
    let x = 0 ;
    useEffect(()=>{     
            setTimeout(() => {
                
                if(x < 6){
                    x += 1;
                }
            }, 1000);
    },[x]);
    useEffect(()=>{
        const loadhead = document.getElementById("load-heading");
    
            console.log(dots.repeat(x))
            loadhead.innerText = `Loading ${loadingHeader ? loadingHeader : ""} please wait${dots.repeat(x)}`;
           
        },[x]);

    return (
        <div className="loading-page">
            <h2 id='load-heading'>Loading {loadingHeader ? loadingHeader : null} please wait</h2>
            <div className="loading-animation-container">
            <div className='cube-pos'>
                <div className='loadbox1'><img src= {favicon} alt="placeholder img1"></img></div>
                <div className='loadbox2'><img src= {favicon} alt="placeholder img1"></img></div>
                <div className='loadbox3'><img src= {favicon} alt="placeholder img1"></img></div>
                <div className='loadbox4'><img src= {favicon} alt="placeholder img1"></img></div>
                <div className='loadbox5'><img src= {favicon} alt="placeholder img1"></img></div>
                <div className='loadbox6'><img src= {favicon} alt="placeholder img1"></img></div>
                </div>
            </div>
        </div>
    )
}