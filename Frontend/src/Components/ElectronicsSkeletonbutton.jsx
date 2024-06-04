import React from 'react'
import "./ElectronicsSkeletonbutton.css";
import { MdOutlineDeviceUnknown } from "react-icons/md";
import skeleton_img from './images/skeleton_img.jpg'




export default function ElectronicsSkeletonbutton() {
  return (
    <div className='ElectronicsSkeletonbutton'>
        <button >
          <div className='skeleton-electronics-epithet'>
            <MdOutlineDeviceUnknown className="electronics_button-icon" size={24} />
            <span className='electronics-name-placeholder skeleton'></span>
          </div>
          <div className='skeleton-img-container skeleton'>
          <img src={skeleton_img} alt='skeleton_img'/>
          </div>
          <span className='electronics-storage-placeholder skeleton'></span>
          <span className='electronics-price-placeholder skeleton'></span>
          <span className='electronics-seller-placeholder skeleton'></span>
          <span className='electronics-quantity-placeholder skeleton'></span>
        </button>  
    </div>
  )
}
