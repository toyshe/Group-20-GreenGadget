import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import SignUpButton from "./SignUpButton";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaShoppingBasket } from "react-icons/fa";

export default function Navigation() {
    const navigate = useNavigate()
    const { loggedInUser } = useContext(UserContext)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const closeOpenDropdowns = (e) => {
        if (isDropdownOpen && e.target.closest(".dropdown-container") === null) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeOpenDropdowns);
        return () => {
            document.removeEventListener("click", closeOpenDropdowns);
        };
    }, [isDropdownOpen]);
    
    const hideSidebar = () => {
        document.querySelector(".side-menu").style.left = "-100%";
        document.querySelector("#overlay").style.display = "none";
    }

    const showSidebar = () => {
        document.querySelector(".side-menu").style.left = 0;
        document.querySelector("#overlay").style.display = "flex";
    }

    const handleAllItemsClick = () => {
        navigate('/electronics')
    }

    const handleHomeButton = () => {
        navigate('/')
    }

    const handleFaqClick = () => {
        navigate('/faq')
    }

    const handleSellClick = () => {
        navigate('/sell-item')
    }

    const handleAboutClick = () => {
        navigate('/about')
    }

    const handleSupportClick = () => {
        navigate('/support')
    }

    const handleTCclick = () => {
        navigate('/TC')
    }

    const handleBasket = () => {
        navigate('/basket')
    }

    const handleRepair = () => {
        navigate('/repair')
    }
    /*fix onclick*/
    return (

        <nav className="nav">

            <label id="overlay" htmlFor="sidebar-active" onClick={hideSidebar}></label>
            <div className="side-menu">
                <label htmlFor="sidebar-active" className="close-sidebar-button" onClick={hideSidebar}>Menu
                    <i className="fa-solid fa-xmark" ></i>
                </label>


                <ul className="sl">

                    <li><a href="#">Shop by category</a></li>
                    <li onClick={handleAllItemsClick}><a>All items</a></li>
                    <li><a href="#">Sell item</a></li>

                    <li><a href="#" onClick={<Login />}>SignIn</a></li>

                    <li><a href="#">Support</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">T&C</a></li>
                    <li><a href="#">About us</a></li>
                </ul>
            </div>

            <input type="checkbox" id="sidebar-active"></input>
            <label htmlFor="sidebar-active" className="open-sidebar-button" onClick={showSidebar}><i className="fa-solid fa-bars" ></i></label>

            <input type="checkbox" id="account-active"></input>

            <div className="logo"><a onClick={handleHomeButton}>GreenGadget</a></div>

            <div className="searchbar"><button><i className="fas fa-search"></i></button><input type="text" placeholder="Search..." className="navsearchbar"></input></div>

            {console.log(loggedInUser)}
            {loggedInUser.username ? (
                <div className="basket-user">

                    <FaShoppingBasket size={45} />
                    {console.log(isDropdownOpen)}

                    <div className="dropdown-container">
                        <details className={`dropdown ${isDropdownOpen ? 'open' : ''}`} onClick={closeOpenDropdowns}>
                            <summary className="avatar">
                            <img className='user-avatar'  src={loggedInUser.avatar_img_url} />
                            </summary>
                            <ul>
                                <li>
                                    <a>
                                        <span className="material-symbols-outlined"></span> Account
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span className="material-symbols-outlined"></span> Settings
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <span className="material-symbols-outlined"></span> Help
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="/">
                                        <span className="material-symbols-outlined"></span> Logout
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </div>

        <>
            <nav className="nav">

                <div className="side-menu">
                    <label htmlFor="sidebar-active" className="close-sidebar-button" onClick={hideSidebar}>Menu
                        <i className="fa-solid fa-xmark" ></i>
                    </label>


                    <ul className="sl">

                        <li><a href="#">Shop by category</a></li>
                        <li onClick={handleAllItemsClick}><a>All items</a></li>
                        <li onClick={handleSellClick}><a>Sell item</a></li>
                        <li onClick={handleRepair}><a>Repair</a></li>
                        <li><a href="#" onClick={<Login />}>SignIn</a></li>


                        <li onClick={handleSupportClick}><a>Support</a></li>
                        <li onClick={handleFaqClick}><a>FAQ</a></li>
                        <li onClick={handleTCclick}><a>T&C</a></li>
                        <li onClick={handleAboutClick}><a>About us</a></li>
                    </ul>

                </div>

                <input type="checkbox" id="sidebar-active"></input>
                <label htmlFor="sidebar-active" className="open-sidebar-button" onClick={showSidebar}><i className="fa-solid fa-bars" ></i></label>

                <input type="checkbox" id="account-active"></input>

                <div className="logo"><a onClick={handleHomeButton}>GreenGadget</a></div>

                <div className="searchbar"><button><i className="fas fa-search"></i></button><input type="text" placeholder="Search..." className="navsearchbar"></input></div>

                {console.log(loggedInUser)}
                {loggedInUser.username ? (
                    <div className="basket-user">

                        <FaShoppingBasket size={45} onClick={handleBasket}/>
                        {console.log(isDropdownOpen)}

                        <div className="dropdown-container">
                            <details className={`dropdown ${isDropdownOpen ? 'open' : ''}`} onClick={closeOpenDropdowns}>
                                <summary className="avatar">
                                    <img className='user-avatar' src={loggedInUser.avatar_img_url} />
                                </summary>
                                <ul>
                                    <li>
                                        <a>
                                            <span className="material-symbols-outlined"></span> Account
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="material-symbols-outlined"></span> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="material-symbols-outlined"></span> Help
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="/">
                                            <span className="material-symbols-outlined"></span> Logout
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </div>
                    </div>
                ) : (
                    <>
                        <Login className="nav-buttons" />
                        <SignUpButton className="nav-buttons" />
                    </>
                )}

            </nav>

            
        </>
    )

}