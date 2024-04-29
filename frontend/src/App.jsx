<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======

import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import  Login  from "./pages/Login"
import  Register  from "./pages/Register"
import CardDescriptionProduct from './pages/CardDescriptionProduct'
import NotFound from "./components/NotFound"
>>>>>>> e5ff8a96075909651e937d710a7771842c2619b3

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< HEAD
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
       <Routes>  
        <Route path="/" element={ <Home/> } />         
        <Route path="product-detail/:id" element={<CardDescriptionProduct/>} />           
        <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="register" element={ <Register/> } />
        <Route exact path='*' element={<NotFound />} />
      </Routes>
>>>>>>> e5ff8a96075909651e937d710a7771842c2619b3
    </>
  )
}

export default App