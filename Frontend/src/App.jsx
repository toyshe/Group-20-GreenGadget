import Home from "./Components/Home"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import './App.css'
import { Suspense ,lazy, useEffect, useState } from "react";
import Navigation from "./Components/Navigation"
import SignUp from "./Components/SignUp"
import Electronics from "./Components/Electronics"
import ElectronicDevice from "./Components/ElectronicDevice";
import UserContext from "./contexts/UserContext";
import SellItem from "./Components/SellItem";
import NotFound from "./Components/NotFound";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import ScrollToTop from "../utils/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from "../utils/utils";

const Repair = lazy(() => import("./Components/Repair"))
const FAQ = lazy(() => import("./Components/FAQ"))
const TC = lazy(() => import("./Components/TermsAndConditions"))
const Support = lazy(() => import("./Components/Support"))
const About = lazy(() => import("./Components/About"))
const Settings = lazy(() => import("./Components/Settings"))
const Profile = lazy(() => import("./Components/Profile"))



function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [electronicList, setElectronics] = useState([])
  const [basketList, setBasketList] = useState([])
  const [categoriesList, setCategoriesList] = useState([]);
  let location = useLocation();
  const [recData, setRecData] = useState([]);

  useEffect(() => {
    getProducts().then((productData)=>{
      // console.log(`Home: ${productData}`);
      console.log(productData);
      setRecData(productData);
    })
  },[])

  if(location.hash){
    window.history.replaceState("", document.title, window.location.pathname);
    // console.log(document.title + window.location.pathname);
    console.log(document.title + window.location.pathname + window.location.pathname.hash);
  }

  const generateProductsSelection = (count, max)=>{
    const rands = [];
    while (rands.length < count){
    const r = Math.floor(Math.random() * max);
      if (rands.indexOf(r) === -1){
        rands.push(r);
      }
    }
    console.log({rands})
    return rands;
  };

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <ScrollToTop/>
        <Navigation categoriesList={categoriesList} setCategoriesList={setCategoriesList} />
        <Suspense fallback={
          //replace this with something better
          <h2 id='load-heading'>Staging please wait
            <span className='ellipsis'>.</span>
            <span className='ellipsis'>.</span>
            <span className='ellipsis'>.</span>
          </h2>
        }>
        <Routes>
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path='/' element={<Home recData={recData}/>} />
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
        </Suspense>
      </UserContext.Provider>

      <footer id="footer">
                <div className="about footer-col" >
                    <h2>About</h2>
                    <ul className="footli">
                        <li><Link to={'/about'}>Who are we?</Link></li>
                        <li><Link to={'/sell-item'}>Sell an item</Link></li>
                        <li><Link to={'/about'}>Blog</Link></li>
                        <li><Link to={'/support'}>Press</Link></li>
                    </ul>
                </div>

                <div className="support footer-col">
                    <h2>Support</h2>
                    <ul className="footli">
                        <li><Link to={'/repair'}>Repair</Link></li>
                        <li><Link to={'/support'}>Contact Us</Link></li>
                        <li><Link to={'/faq'}>FAQ</Link></li>
                    </ul>
                </div>

                <div className="legal footer-col">
                    <h2>Legal</h2>
                    <ul className="footli">
                        <li><Link to={'/tc'}>Terms & Conditions</Link></li>
                        <li><Link to={'/support'}>Contact Us</Link></li>
                        <li><Link to={'/faq'}>FAQ</Link></li>
                    </ul>
                </div>
      </footer>
      <ToastContainer autoClose={2500} hideProgressBar={false} theme='colored' draggable closeOnClick/>
    </>
  )

}

export default App
