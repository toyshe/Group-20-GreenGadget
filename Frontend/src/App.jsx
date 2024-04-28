import Home from "./Components/Home"
import Login from "./Components/Login"
import { Routes, Route } from "react-router-dom"
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


  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Navigation getCategories={getCategories} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/electronics/:electronics_id" element={<ElectronicDevice />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sell-item" element={<SellItem />} />
          <Route path="about" element={<About />}/>
          <Route path="/support" element={<Support />} />
          <Route path="tc" element={<TC />} />
        </Routes>
      </UserContext.Provider>
    </>
  )

}

export default App
