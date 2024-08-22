import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from '../src/contexts/UserContext';
import { TbError404Off } from "react-icons/tb";
import { BiSolidError } from "react-icons/bi";
import { LuUnplug } from "react-icons/lu";
import { FaPlugCircleXmark } from "react-icons/fa6";
import { GiUnplugged, GiDialPadlock } from "react-icons/gi";
import './ProtectedRoutes.css';

export default function ProtectedRoutes() {
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();
  // console.log({location})
  // console.log(location.pathname)
  return (
    <>
    { loggedInUser.username ? (<Outlet/>) :
    (
    <>
    <div className='denied-page'>
      <div className='denied-content'>
        <h1 className='protected-route-heading'>Access Denied<GiDialPadlock className='GiDialPadlock' size={50}/></h1>
        <h3 className='protected-route-subheading'><strong>Error 403: </strong> You do not have permission to access this page.</h3> {/*font-weight*/}
        <p> You can't access <span className='pr-location'>https://group-20-greengadget.onrender.com{location.pathname}</span>
        as you are not logged in. Please login to gain access.</p>
        <LuUnplug className='LuUnplug' size={50}/>
        <LuUnplug className='LuUnplug' size={50}/>
        <FaPlugCircleXmark className='FaPlugCircleXmark' size={50}/>
        <FaPlugCircleXmark className='FaPlugCircleXmark2' size={50}/>
      </div>
    </div>
    </>
    )
    }
    </>
  )
}
