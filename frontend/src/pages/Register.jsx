import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../service/userService';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import '../styles/Register.css';

function Register() {
    const [userRegister, setUserRegister] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        let newUser = { ...userRegister, rol: "user", active: true };

        await addUser(newUser);
        navigate('/login');
    }

    function handleChange(e) {
        e.preventDefault();

        const { name, value } = e.target;

        if (name === 'phone') {
            const phoneRegex = /^[0-9\b]+$/; // Regular expression to match numbers only
            if (!phoneRegex.test(value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El número de teléfono solo debe contener dígitos.',
                });
                return;
            }
        }

        setUserRegister(prev => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <Nav />
            <div className="container">
                <form className="form-register" onSubmit={handleSubmit}>
                    <label htmlFor='name' className='label-register'>Nombre</label>
                    <input type='text' name='name' id='name' className='input-register' placeholder='Nombre' onChange={handleChange} />

                    <label htmlFor='lastname' className='label-register'>Apellido</label>
                    <input type='text' name='lastname' id='lastname' className='input-register' placeholder='Apellido' onChange={handleChange} />

                    <label htmlFor='email' className='label-register'>Email</label>
                    <input type='text' name='email' id='email' placeholder='Email' className='input-register' onChange={handleChange} />

                    <label htmlFor='phone' className='label-register'>Teléfono</label>
                    <input type='text' name='phone' id='phone' placeholder='Teléfono' className='input-register' onChange={handleChange} />

                    <label htmlFor='birthDate' className='label-register'>Fecha de nacimiento</label>
                    <input type='date' name='birthDate' placeholder='año-mes-dia' id='birthDate' className='input-register' onChange={handleChange} />

                    <label htmlFor='address' className='label-register'>Dirección</label>
                    <input type='text' name='address' placeholder='Dirección' id='address' className='input-register' onChange={handleChange} />

                    <label htmlFor='password' className='label-register'>Contraseña</label>
                    <input type='password' name='password' id='password' placeholder='Contraseña' className='input-register' onChange={handleChange} />

                    <button className='btn-registrarme' type='submit'>Registrarme</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Register;
