import { useEffect } from 'react';
import './loading.css';
import favicon from"/favicon.png";

export default function Loading({loadingHeader}){

    return (
        <div className="loading-page">
            <h2 id='load-heading'>Loading {loadingHeader ? loadingHeader : null} please wait
                <span className='ellipsis'>.</span>
                <span className='ellipsis'>.</span>
                <span className='ellipsis'>.</span>
            </h2>
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