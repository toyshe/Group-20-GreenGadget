import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import SignUpButton from "./SignUpButton";
import UserContext from "../contexts/UserContext";
import { FaShoppingBasket } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { getCategories } from "../../utils/utils";


export default function Navigation({ categoriesList, setCategoriesList }) {
    const navigate = useNavigate()
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const closeOpenDropdowns = (e) => {
        if (isDropdownOpen && e.target.closest(".dropdown-container") === null) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        getCategories().then((data) => {
            setCategoriesList(data)
            console.log(data);
        })
    }, [])

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

    const handleSignIn = () => {
        hideSidebar();
        setTimeout(() => {
            document.getElementById('id01').style.display = 'block';
        }, 300);
    }

    useEffect(() => {
        let darkMode = localStorage.getItem("darkMode");
        localStorage.getItem('darkMode');
        const root = document.documentElement;

        const enableDarkMode = () => {
            root.classList.add('darkmode');
            localStorage.setItem('darkMode', 'enabled');
            console.log("enableDarkMode");
        }

        const disableDarkMode = () => {
            root.classList.remove('darkmode');
            localStorage.removeItem('darkMode', 'enabled');
            console.log("disableDarkMode");
        }

        if (darkMode === 'enabled') {
            enableDarkMode();
        }

        const darkModeToggle = document.querySelector("#dmt-toggle");
        darkModeToggle.addEventListener("click", () => {
            darkMode = localStorage.getItem('darkMode');

            if (darkMode !== 'enabled') {
                enableDarkMode();

            } else {
                disableDarkMode();
            }
        }, []);

    }, [])

    const toggleSubMenu = () => {
        const subMenu = document.querySelector('.sub-menu');
        subMenu.style.display = subMenu.style.display === 'flex' ? 'none' : 'flex';
    };

    const handleLogOut = () => {
        setLoggedInUser({})
    }

    const handleCategoryClick = (e) => {
        console.log(e.target.innerText);
        navigate(`/electronics?electronics_type=${e.target.innerText}`)
    }

    return (


        <nav className="nav">
            <label id="overlay" htmlFor="sidebar-active" onClick={hideSidebar}></label>
            <div className="side-menu">
                <label htmlFor="sidebar-active" className="close-sidebar-button" onClick={hideSidebar}>
                    <span className="side-menu-title">MENU</span>
                    <i className="fa-solid fa-xmark" ></i>
                </label>


                <ul className="sl">
                    <li className="dropdown-container">
                        <div onClick={toggleSubMenu}><a>Shop by category</a></div>
                        <div className="sub-menu">
                            {categoriesList.map((category,index) => {
                                return (
                                    <a key={index} onClick={handleCategoryClick}>{category.slug}</a>
                                )
                            })}
                        </div>
                    </li>
                    <li onClick={handleAllItemsClick}><a>All items</a></li>
                    <li onClick={handleSellClick}><a>Sell item</a></li>
                    <li onClick={handleRepair}><a>Repair</a></li>
                    <li onClick={handleSignIn}><a>Login</a></li>


                    <li onClick={handleSupportClick}><a>Support</a></li>
                    <li onClick={handleFaqClick}><a>FAQ</a></li>
                    <li onClick={handleTCclick}><a>T&C</a></li>
                    <li onClick={handleAboutClick}><a>About us</a></li>
                </ul>

                <div id="side-menu-bottom">
                    <div id="side-menu-settings-container">
                        <div id="side-menu-settings">

                            <div id="dmt-toggle">
                                <div className="DM-btn">
                                    < IoIosSunny className="fa-sun" />
                                    <div>
                                        <span className="DM-label"></span>
                                    </div>
                                </div>
                                <span className="DM-toggle-text">Dark Mode Toggle</span>

                                <div id="DM-toggle-switch">
                                    <span className="switch"></span>
                                </div>
                            </div>
                        </div>

                        <div id="side-menu-logout">
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span onClick={handleLogOut}>Logout</span>
                        </div>

                    </div>
                </div>

            </div>

            <input type="checkbox" id="sidebar-active"></input>
            <label htmlFor="sidebar-active" className="open-sidebar-button" onClick={showSidebar}><i className="fa-solid fa-bars" ></i></label>

            <input type="checkbox" id="account-active"></input>

            <div className="logo"><a onClick={handleHomeButton}>GreenGadget</a></div>

            <div className="searchbar"><button style={{display: "flex", justifyContent: "center"}}><i className="fas fa-search"></i></button><input type="text" placeholder="Search..." className="navsearchbar"></input></div>

            {console.log(loggedInUser)}
            {loggedInUser.username ? (
                <div className="basket-user">

                    <FaShoppingBasket size={45} onClick={handleBasket} title="Basket"/>
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
                                <li onClick={handleLogOut}>
                                    <a>
                                        <span  className="material-symbols-outlined"> Logout</span>
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