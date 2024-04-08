import Home from "./Components/Home"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from "./Components/Navigation"
import SignUp from "./Components/SignUp"

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/' element={<Home />} />
    </Routes>
    </>
  )

}

export default App
