import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Footer from '../components/Footer.jsx';

function Login() {
    const { handleLogin } = useContext(UserContext);
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
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

            const data = await response.json();
            console.log("Received data:", data); // Agrega un log para verificar la respuesta

            if (response.ok) {
                if (data.active && data.rol === 'user') {
                    handleLogin(data);
                    navigate('/');
                } else if (!data.active) {
                    throw new Error('Usuario inactivo');
                } else {
                    throw new Error('Acceso denegado: solo usuarios pueden iniciar sesión.');
                }
            } else {
                throw new Error(data.message || 'Credenciales inválidas');
            }
        } catch (error) {
            notificacionRef.current.style.color = 'red';
            notificacionRef.current.innerHTML = error.message;
        }
    };

    const handleChange = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Nav />
            <div className="main-content">
                <div className="container-form-login">
                    <form className="form-login" onSubmit={handleSubmit}>
                        <label htmlFor="email" className='label-login'>Email</label>
                        <input type="text" name='email' id='email' placeholder='Ingrese su Email' className='input-login' onChange={handleChange} />
                        <label htmlFor="password" className='label-login'>Contraseña</label>
                        <input type="password" name='password' id='password' placeholder='Ingrese su Contraseña' className='input-login'onChange={handleChange} />
                        <p id="notificacion" ref={notificacionRef}></p>
                        <button className="button-iniciar" type='submit'>Iniciar sesión</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
