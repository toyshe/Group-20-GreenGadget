import Home from "./Components/Home"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"

function App() {
  return (

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='home' element={<Home />} />
    </Routes>
  )

}

export default App
