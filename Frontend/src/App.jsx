import Home from "./Components/Home"
import Login from "./Components/Login"
import {Routes, Route} from "react-router-dom"
import './App.css'
import Navigation from "./Components/Navigation"
import SignUp from "./Components/SignUp"
import Electronics from "./Components/Electronics";/*<Route path="/electronics" element={
        <Electronics electronics={electronics} setElectronics={setElectronics} electronicCategory={electronicCategory} />}/>
        <Route path="/electronics/:electronics_id" element={<ElectroniDevice />} />*/
        //      <Route path="/electronics" element={<Electronics />} />


function App() {
  const [electronicList, setElectronics] = useState([]);

  
  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/' element={<Home />} />
      <Route path="/electronics" element={<Electronics />} />
      <Route path="/electronics" element={
        <Electronics electronicList={electronicList} setElectronics={setElectronics} electronicCategory={electronicCategory} />}/>
    </Routes>
    </>
  )

}

export default App
