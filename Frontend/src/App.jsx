import Home from "./Components/Home"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import './App.css'
import { useState } from "react";
import Navigation from "./Components/Navigation"
import SignUp from "./Components/SignUp"
import Electronics from "./Components/Electronics"
import ElectronicDevice from "./Components/ElectronicDevice";
import UserContext from "./contexts/UserContext";
import FAQ from "./Components/FAQ";
import SellItem from "./Components/SellItem";
import About from "./Components/About";
import Support from "./Components/Support";
import TC from "./Components/TermsAndConditions";
import Basket from "./Components/Basket";
import Repair from "./Components/Repair";
import NotFound from "./Components/NotFound";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import ScrollToTop from "../utils/ScrollToTop";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [electronicList, setElectronics] = useState([])
  const [basketList, setBasketList] = useState([])
  const [categoriesList, setCategoriesList] = useState([]);
  let location = useLocation();

  if(location.hash){
    window.history.replaceState("", document.title, window.location.pathname);
    // console.log(document.title + window.location.pathname);
    console.log(document.title + window.location.pathname + window.location.pathname.hash);
  }

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ScrollToTop/>
        <Navigation categoriesList={categoriesList} setCategoriesList={setCategoriesList} />
        <Routes>
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path='/' element={<Home electronicList={electronicList} />} />
          <Route path="/electronics" element={<Electronics electronicList={electronicList} setElectronics={setElectronics} categoriesList={categoriesList} setCategoriesList={setCategoriesList} />} />
          <Route path="/electronics/:electronics_id" element={<ElectronicDevice basketList={basketList} setBasketList={setBasketList} />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sell-item" element={<SellItem setElectronics={setElectronics} />} />
          <Route path="about" element={<About />}/>
          <Route path="/support" element={<Support />} />
          <Route path="tc" element={<TC />} />
          <Route path="/basket" element={<Basket basketList={basketList} setBasketList={setBasketList}/>} />
          <Route path="/repair" element={<Repair />}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashbord">
            {/* use redirect to block /dashbord */}
              <Route  path="profile" element={<Profile/>} />
              <Route path="settings" element={<Settings/>} />
            </Route> 
          </Route>
          
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </UserContext.Provider>

      <footer id="footer">
                <div className="about" >
                    <h2>About</h2>
                    <ul className="footli">
                        <li><Link to={'/about'}>Who are we?</Link></li>
                        <li><Link to={'/sell-item'}>Sell an item</Link></li>
                        <li><Link to={'/about'}>Blog</Link></li>
                        <li><Link to={'/support'}>Press</Link></li>
                    </ul>
                </div>

                <div className="support">
                    <h2>Support</h2>
                    <ul className="footli">
                        <li><Link to={'/repair'}>Repair</Link></li>
                        <li><Link to={'/support'}>Contact Us</Link></li>
                        <li><Link to={'/faq'}>FAQ</Link></li>
                    </ul>
                </div>

                <div className="legal">
                    <h2>Legal</h2>
                    <ul className="footli">
                        <li><Link to={'/tc'}>Terms & Conditions</Link></li>
                        <li><Link to={'/support'}>Contact Us</Link></li>
                        <li><Link to={'/faq'}>FAQ</Link></li>
                    </ul>
                </div>
      </footer>
    </>
  )

}

export default App
