import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import  Login  from "./pages/Login"
import  Register  from "./pages/Register"
import CardDescriptionProduct from './pages/CardDescriptionProduct'
import Perfil from "./pages/Perfil"
import Category from "./pages/Category"
import NotFound from "./components/NotFound"
import Cart from "./pages/Cart"
import Shop from "./components/Shop"
import { RutasProtegidas } from "./components/RutasProtegidas"
import { useContext } from "react"
import { UserContext } from "./context/UserContext"


function App() {
  const{isLoggedIn}= useContext(UserContext);
  
  return (
    <>
       <Routes>  
        <Route path="/" element={ <Home/> } />        
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="register" element={ <Register/> } />
        <Route path="product-detail/:id" element={<CardDescriptionProduct/>} />     
        <Route path="user-update/:id" element={<Perfil/>} />    
        <Route path="products/:category" element={<Category/>} />
       <Route element={<RutasProtegidas isAllowed={isLoggedIn}/>}>
        <Route path="cart" element={<Cart />} />  
        </Route>        
        <Route exact path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App