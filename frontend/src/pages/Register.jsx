import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Nav from "../components/Nav"
import '../styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import { addUser } from '../service/userService';
import Footer from '../components/Footer';

function Register() {

    const [userRegister, setUserRegister] = useState({})
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        let newUser = { ...userRegister, rol: "user", active: true }

        await addUser(newUser);
        navigate('/login')
    }
    function handleChange(e) {
        e.preventDefault();

        setUserRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))

        return userRegister
    }
    return (
        <>
            <Nav />
            <div className="container"> {/* Agrega la clase 'container' al div principal */}
                <form className="form-register" onSubmit={handleSubmit}> {/* Agrega la clase 'form' al formulario */}
                    <label htmlFor='name' className='label-register'>Nombre</label>
                    <input type='text' name='name' id='name' className='input-register'  placeholder='Nombre' onChange={handleChange} />

                    <label htmlFor='lastname'className='label-register'>Apellido</label>
                    <input type='text' name='lastname' id='lastname' className='input-register' placeholder='Apellido' onChange={handleChange} />

                    <label htmlFor='email'className='label-register'>Email</label>
                    <input type='text' name='email' id='email' placeholder='Email' className='input-register'
                    onChange={handleChange} />

                    <label htmlFor='phone'className='label-register'>Telefono</label>
                    <input type='phone' name='phone' id='phone' placeholder='Telefono' className='input-register' onChange={handleChange} />

                    <label htmlFor='birthDate'className='label-register'>Fecha de nacimiento</label>
                    <input type='birthDate' name='birthDate' placeholder='año-mes-dia' id='birthDate' className='input-register' onChange={handleChange} />

                    <label htmlFor='password'className='label-register'>Contraseña</label>
                    <input type='password' name='password' id='password' placeholder='Contraseña' className='input-register' onChange={handleChange} />


                    <button className='btn-registrarme' type='submit'>Registrarme</button>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Register