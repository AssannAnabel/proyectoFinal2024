import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const { handleLogin } = useContext(UserContext);
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
    const notificacionRef = useRef(null);
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const urlUsers = 'http://localhost:3000/user'


    const fetchUsers = async (urlUsers) => {
        try {
            const response = await fetch(urlUsers);
            const data = await response.json();
            handleLogin(data); 
            console.log("que es", data);// Suponiendo que el backend devuelve el usuario con el token JWT
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers(urlUsers);
    }, []);
    
    function handleChange(e) {
        e.preventDefault();

        setUserLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log("form", userLogin);
        return userLogin
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userFound = users.find((u) => u.email === userLogin.email && u.password === userLogin.password)
            console.log(userFound);
        if (userFound && userFound.password === userLogin.password) {
            handleLogin(userFound);
            navigate('/');
        }

        else {
            notificacionRef.current.style.color = 'red';
            notificacionRef.current.innerHTML = 'Usuario o contraseña incorrectos';
        }
        e.target.reset();
    }

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
