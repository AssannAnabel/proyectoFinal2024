import React from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import '../styles/Login.css'



function Login() {
    return (
        <>

            <Nav />
            <div className="container-form-login">
                <form className="form">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' id='email' placeholder='Ingrese su Email' />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name='password' id='password' placeholder='Ingrese su Contraseña' />

                    <p className="error-message">ACA VA EL MENSAJE DE ERROR POR SI PONE MAL CONTRASEÑA O EMAIL</p>

                    <button type='submit'>Iniciar sesión</button>
                </form>

                <form action="">
                    <Link to={"/register"}>
                        <button className='btn-registrarme' type='submit'>Registrarme</button>
                    </Link>
                </form>
            </div>
        </>
    )
}
export default Login
