import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import SignUpButton from "./SignUpButton";
import UserContext from "../contexts/UserContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaShoppingBasket } from "react-icons/fa";

export default function Navigation() {
    const navigate = useNavigate()
    const { loggedInUser } = useContext(UserContext)

    const [selectedOption, setSelectedOption] = useState(""); // State to track selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const closeOpenDropdowns = (e) => {
        if (isDropdownOpen && e.target.closest(".dropdown-container") === null) {
            setIsDropdownOpen(false);
        }
    };
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        // Logic to handle navigation based on selected option
        // For example, you can use React Router to navigate to different routes
    };

    useEffect(() => {
        document.addEventListener("click", closeOpenDropdowns);
        return () => {
            document.removeEventListener("click", closeOpenDropdowns);
        };
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        console.log('in here');
        event.preventDefault()
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleHomeClick = () => {
        navigate('/')
    }

    const hideSidebar = () => {
        document.querySelector(".side-menu").style.left = "-100%";
    }

    const showSidebar = () => {
        document.querySelector(".side-menu").style.left = 0;
    }

    const handleAllItemsClick = () => {
        navigate('/electronics')
    }

    const handleHomeButton = () => {
        navigate('/')
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
                </div>
            ) : (
                <>
                    <Login className="nav-buttons" />
                    <SignUpButton className="nav-buttons" />
                </>
            )}
        </nav>
    )

}