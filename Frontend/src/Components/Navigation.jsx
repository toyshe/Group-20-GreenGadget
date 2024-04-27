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

    const hideSidebar = () => {
        document.querySelector(".side-menu").style.left = "-100%";
    }

    const showSidebar = () => {
        document.querySelector(".side-menu").style.left = 0;
    }
/*fix onclick*/
    return (
        <nav className="nav">

            <div className="side-menu">
                <label htmlFor="sidebar-active" className="close-sidebar-button" onClick={hideSidebar}>Menu
                <i className="fa-solid fa-xmark" ></i>
                </label>

                
                <ul className="sl">
                    
                    <li><a href="#">Shop by category</a></li>
                    <li><a href="#">All items</a></li>
                    <li><a href="#">Sell item</a></li>
                    <li><a href="#" onClick={Login()}>SignIn</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">T&C</a></li>
                    <li><a href="#">About us</a></li>
                </ul>
            </div>

            <input type="checkbox" id="sidebar-active"></input>
            <label for="sidebar-active" className="open-sidebar-button" onClick={showSidebar}><i className="fa-solid fa-bars" ></i></label>
                
            <input type="checkbox" id="account-active"></input>
            
            <div className="logo"><a href='/'>GreenGadget</a></div>
            
            <div className="searchbar"><button><i className="fas fa-search"></i></button><input type="text" placeholder="Search..." className="navsearchbar"></input></div>
            
            <ul>
            <button className="nav-buttons" onClick={handleHomeClick}>Home</button>
            <Login className="nav-buttons"/>
            <SignUpButton className="nav-buttons" />
            <i class="fas fa-user fa-border" ></i>
            <i class="fa-solid fa-cart-shopping"></i>
            
            </ul>
        </nav>
    )

}