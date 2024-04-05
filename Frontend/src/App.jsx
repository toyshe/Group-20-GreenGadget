import Home from "./Components/Home"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from "./Components/Navigation"

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      {/* <Route path='/' element={<Login />} /> */}
      <Route path='home' element={<Home />} />
    </Routes>
    </>
  )

}

export default App
