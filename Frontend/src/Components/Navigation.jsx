import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import SignUpButton from "./SignUpButton";

export default function Navigation() {
    const navigate = useNavigate()

    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <nav className="nav">
            <button className="nav-buttons" onClick={handleHomeClick}>Home</button>
            <Login />
            <SignUpButton />
        </nav>
    )

}