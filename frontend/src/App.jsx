
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

function App() {
  
  return (
    <>
       <Routes>  
        <Route path="/" element={ <Home/> } />         
        <Route path="product-detail/:id" element={<CardDescriptionProduct/>} />     
        <Route path="user-update/:id" element={<Perfil/>} />    
        <Route path="products/:category" element={<Category/>} />           
        <Route path="product-detail/:id" element={<CardDescriptionProduct/>} />     
        <Route path="user-update/:id" element={<Perfil/>} />    
        <Route path="products/:category" element={<Category/>} />           
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="register" element={ <Register/> } />
        <Route exact path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App