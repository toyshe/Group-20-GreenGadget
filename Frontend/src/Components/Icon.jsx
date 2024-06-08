import React from 'react'
import { MdTabletMac } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { AiOutlineLaptop } from "react-icons/ai";

const Icon = ({props, className = "", size}) => {
    const Icontype = props === "Phone" ? IoPhonePortraitSharp 
    : props === 'Laptop' ?  AiOutlineLaptop
    : props === "Smartwatch" ? BsSmartwatch
    : MdTabletMac;
  return (
    <Icontype size={size} className={className}/>
  )
}

export default Icon
