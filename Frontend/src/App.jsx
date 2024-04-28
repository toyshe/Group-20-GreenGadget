import Home from "./Components/Home"
import Login from "./Components/Login"
import { Routes, Route, Link } from "react-router-dom"
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

function App() {
  const [electronicCategory, getCategories] = useState('')
  const [loggedInUser, setLoggedInUser] = useState({})
  const [electronicList, setElectronics] = useState([])


  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Navigation getCategories={getCategories} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path="/electronics" element={<Electronics electronicList={electronicList} setElectronics={setElectronics} />} />
          <Route path="/electronics/:electronics_id" element={<ElectronicDevice />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sell-item" element={<SellItem setElectronics={setElectronics} electronicList={electronicList} />} />
          <Route path="about" element={<About />}/>
          <Route path="/support" element={<Support />} />
          <Route path="tc" element={<TC />} />
        </Routes>
      </UserContext.Provider>

      <footer id="footer">
                <div class="about" >
                    <h2>About</h2>
                    <ul class="footli">
                        <li><Link to={'/about'}>Who are we?</Link></li>
                        <li><Link to={'/sell-item'}>Sell an item</Link></li>
                        <li><Link to={'/about'}>Blog</Link></li>
                        <li><Link to={'/support'}>Press</Link></li>
                    </ul>
                </div>

                <div class="support">
                    <h2>Support</h2>
                    <ul class="footli">
                        <li><Link to={'/repair'}>Repair</Link></li>
                        <li><Link to={'/support'}>Contact Us</Link></li>
                        <li><Link to={'/faq'}>FAQ</Link></li>
                    </ul>
                </div>

                <div class="legal">
                    <h2>Legal</h2>
                    <ul class="footli">
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
