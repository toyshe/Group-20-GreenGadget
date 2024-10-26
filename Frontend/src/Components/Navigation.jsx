import { useContext, useEffect, useState } from "react";
import Login from "./Login";
import { useNavigate, Link } from "react-router-dom";
import SignUpButton from "./SignUpButton";
import UserContext from "../contexts/UserContext";
import { FaShoppingBasket } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { getCategories } from "../../utils/utils";
import { FaRegUser, FaArrowRightFromBracket, FaRightFromBracket } from "react-icons/fa6";
import { IoSettingsSharp, IoMenu } from "react-icons/io5";
import { MdLiveHelp } from "react-icons/md";


export default function Navigation({ categoriesList, setCategoriesList }) {
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
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
        document.querySelector(".side-menu").style.left = "-200%";
        document.querySelector("#overlay").style.display = "none";
    }

    const showSidebar = () => {
        document.querySelector(".side-menu").style.left = 0;
        document.querySelector("#overlay").style.display = "flex";
    }

    const handleBasket = () => {
        navigate('/basket')
    }

    const hideSidebardelayed = () => {
        setTimeout(() => {
            hideSidebar();
        }, 200);
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
            let dmtoggle = document.querySelector(".DM-toggle-text");
            console.log(dmtoggle.innerText);
            dmtoggle.innerText = "Dark Mode Toggle";
        }

        const disableDarkMode = () => {
            root.classList.remove('darkmode');
            localStorage.removeItem('darkMode', 'enabled');
            console.log("disableDarkMode");
            let dmtoggle = document.querySelector(".DM-toggle-text");
            console.log(dmtoggle.innerText);
            dmtoggle.innerText = "Light Mode Toggle";
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
        const subMenuDropper = document.querySelector('ul.sl .dropdown-container div');
        subMenuDropper.style.backgroundColor = subMenuDropper.style.backgroundColor === '' ?  '#e0dcdc' : '' ;
    };

    const handleLogOut = () => {
        // setLoggedInUser({})
        hideSidebar();
        setTimeout(() => {
            setLoggedInUser({})
        }, 300);
    }

    const handleCategoryClick = (e) => {
        console.log(e.target.innerText);
        navigate(`/electronics?electronics_type=${e.target.innerText}`)
    }

    return (
        <>

        <nav className="nav">
            <label id="overlay" htmlFor="sidebar-active" onClick={hideSidebar}></label>
            <div className="side-menu">
                <label htmlFor="sidebar-active" className="close-sidebar-button" onClick={hideSidebar}>
                    <span className="side-menu-title">MENU</span>
                    <i className="fa-solid fa-xmark" ></i>
                </label>


                <ul className="sl"> 

                    {loggedInUser.username ?
                    null:
                    <>
                        <li className="side-replace" onClick={handleSignIn}><span>Login</span></li>
                        <li className="side-replace"><Link to={"/signup"} onClick={hideSidebardelayed} aria-label="Link to Sign Up page.">Sign Up</Link></li>
                    </> }

                    <li className="dropdown-container">
                        <div onClick={toggleSubMenu}><a>Shop by category</a></div>
                        {/* <div onClick={toggleSubMenu}><a>Categories</a></div> */}
                        <div className="sub-menu">
                            {categoriesList.map((category,index) => {
                                return (
                                    <a key={index} onClick={handleCategoryClick}>{category.slug}</a>
                                )
                            })}
                        </div>
                    </li>
                    <li><Link to={"/electronics"} onClick={hideSidebardelayed}>All items</Link></li>

                    {loggedInUser.username ?
                    <li className="side-replace"><Link to={"/basket"} onClick={hideSidebardelayed}>Basket</Link></li>
                    :
                    null
                    }

                    {loggedInUser.user_type === "shopkeeper" ?
                    <li><Link to={"/sell-item"} onClick={hideSidebardelayed}>Sell item</Link></li>
                    :
                    null
                    }
                    <li><Link to={"/repair"} onClick={hideSidebardelayed}>Repair</Link></li>
                    <li><Link to={"/support"} onClick={hideSidebardelayed}>Support</Link></li>
                    <li><Link to={"/faq"} onClick={hideSidebardelayed}>FAQ</Link></li>
                    <li><Link to={"/TC"} onClick={hideSidebardelayed}>T&C</Link></li>
                    <li><Link to={"/about"} onClick={hideSidebardelayed}>About us</Link></li>
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

                        {loggedInUser.username ? (
                            <div id="side-menu-logout">
                                <FaRightFromBracket /> 
                                <span onClick={handleLogOut}>Logout</span>
                            </div>
                        ): null}
    
                    </div>
                </div>

            </div>
            <div className="logo-menu">
                <IoMenu className="sidemenu-btn" onClick={showSidebar}/>
                <div className="logo"><Link to={'/'}>GreenGadget</Link></div>
            </div>
           
            <div className="searchbar">
                <button /*type="submit"*/ aria-label="Searchbar button" style={{display: "flex", justifyContent: "center"}}><i className="fas fa-search"></i></button>
                <input type="text" placeholder="Search..." className="navsearchbar"></input>
            </div>

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
                                    <div className="sm-acc-info">
                                        <img  src={loggedInUser.avatar_img_url} />
                                        <div className="acctn-info">
                                            <span className="user-title">{loggedInUser.username}</span>
                                            <span>{loggedInUser.user_type}</span>
                                        </div>
                                    </div>

                                    <li>
                                        <Link to={'/dashbord/profile'}>
                                            <FaRegUser />
                                            <span className="material-symbols-outlined">Account</span> 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashbord/settings'}>
                                            <IoSettingsSharp/>
                                            <span className="material-symbols-outlined">Settings</span> 
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}>
                                            <MdLiveHelp/>
                                            <span className="material-symbols-outlined">Help</span> 
                                        </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li onClick={handleLogOut}>
                                        <a>
                                            <FaArrowRightFromBracket /> 
                                            <span  className="material-symbols-outlined"> Logout</span>
                                        </a>
                                    </li>
                                </ul>
                       
                        </details>
                    </div>
                </div>
            ) : (
                <>
                    <div className="logup-btns">
                        <Login className="nav-buttons" /> 
                        <SignUpButton className="nav-buttons" />
                    </div>
                     {/* <Login className="nav-buttons" /> 
                    {/*^ causes this error dont know why.
                    Warning: Functions are not valid as a React child. 
                    This may happen if you return a Component instead of <Component /> from render. 
                    Or maybe you meant to call this function rather than return it.* /}
                    <SignUpButton className="nav-buttons" /> */}
                </>
            )}

        </nav>

        <div id="id05" className="modal" >
            {/* style={{ display:"flex" }}*/}
            <h1> welcome <span>{loggedInUser.username}</span> 
            </h1>

            <h2 id='load-heading'>You are being Logged in
                <span className='ellipsis'>.</span>
                <span className='ellipsis'>.</span>
                <span className='ellipsis'>.</span>
            </h2>
        </div>
        </>



    )

}