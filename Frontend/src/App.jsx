import Home from "./Components/Home"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"
import './App.css'
import { useState } from "react";
import Navigation from "./Components/Navigation"
import SignUp from "./Components/SignUp"
import Electronics from "./Components/Electronics";
/*
<Route path="/electronics/:electronics_id" element={<ElectroniDevice />} />
*/



function App() {
  const [electronicList, setElectronics] = useState([]);
  const [electronicCategory, getCategories] = useState('')

  
  return (
    <>
    
    <Navigation getCategories={getCategories} /> 
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/' element={<Home />} />.;
      
      <Route path="/electronics" element={
        <Electronics electronicList={electronicList} setElectronics={setElectronics} electronicCategory={electronicCategory} />}/>
        
      
    </Routes>
    </>
  )

}

export default App
