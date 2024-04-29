import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Login() {
   
    const { handleLogin } = useContext(UserContext);
    const [userLogin, setUserLogin] = useState({ email: '', password: '', active:true });
    const notificacionRef = useRef(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin),

            });
<<<<<<<<< Temporary merge branch 1
            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }
            const data = await response.json();
            handleLogin(data);
            console.log("que es", data);// Suponiendo que el backend devuelve el usuario con el token JWT
            navigate('/');
=========
            console.log("hola", userLogin);
            const data = await response.json();
            console.log("q es data", data);


            if (response.ok) {
                if (data.active === true) {
                    handleLogin(data);
                    navigate('/');
                } else {
                    throw new Error('Usuario inactivo');
                }
            } else {
                throw new Error('Credenciales inválidas');
            }
>>>>>>>>> Temporary merge branch 2
        } catch (error) {
            notificacionRef.current.style.color = 'red';
            notificacionRef.current.innerHTML = error.message;
        }
    };
    const handleChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };
<<<<<<<<< Temporary merge branch 1
    return (
        <>
            <Nav />
            <div className="container-form-login">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' id='email' placeholder='Ingrese su Email' onChange={handleChange} />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name='password' id='password' placeholder='Ingrese su Contraseña' onChange={handleChange} />
                    <p id="notificacion" ref={notificacionRef}></p>
                    <button type='submit'>Iniciar sesión</button>
                </form>
            </div>
        </>
    )
}
export default Login;
=========
        return (
            <>
                <Nav />
                <div className="container-form-login">
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' id='email' placeholder='Ingrese su Email' onChange={handleChange} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name='password' id='password' placeholder='Ingrese su Contraseña' onChange={handleChange} />
                        <p id="notificacion" ref={notificacionRef}></p>
                        <button type='submit'>Iniciar sesión</button>
                    </form>
                </div>
            </>
        )
    }
    export default Login;
>>>>>>>>> Temporary merge branch 2
