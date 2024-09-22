import React from 'react'
import { MdTabletMac } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { AiOutlineLaptop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Icon = ({props, className = "", size= ""}) => {
    const Icontype = props === "Phone" ? IoPhonePortraitSharp 
    : props === 'Laptop' ?  AiOutlineLaptop
    : props === "Smartwatch" ? BsSmartwatch
    : MdTabletMac;

    const navigate = useNavigate()
    
    const Icononclick = props === "Phone" ? (()=>{navigate(`/electronics?electronics_type=${props}`)})
    : props === 'Laptop' ?  (()=>{navigate(`/electronics?electronics_type=${props}`)})
    : props === "Smartwatch" ? (()=>{navigate(`/electronics?electronics_type=${props}`)})
    : (()=>{navigate(`/electronics?electronics_type=${props}`)});
  return (
    <Icontype size={size} className={className} onClick={Icononclick}/>
  )
}

export default Icon
