import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from '../src/contexts/UserContext';


export default function ProtectedRoutes() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <>
    { loggedInUser.username ? <Outlet/> : <Navigate to="/"/> }
    </>
  )
}
