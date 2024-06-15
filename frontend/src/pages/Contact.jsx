import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import contact from "/contact.jpg"
import contacto from "/contacto.jpg"
import '../styles/Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Mensaje enviado con éxito');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            alert('Error al enviar el mensaje');
        }
    };

    return (
        <>
            <Nav />
            <div className='contact-general'>
                <div className='contact-icons'>
                    
                    <div className='telefono'>
                        <img src={contact} alt="logo" className="imgContact" />                
                    </div>

                    <div className='telefono'>
                        <img src={contacto} alt="logo" className="imgContact" />     
                    </div>

                </div>


                <div className="container-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className='label-contact' htmlFor="name">Nombre</label>
                            <input
                                className='input-contact'
                                type="text"
                                name='name'
                                id='name'
                                value={formData.name}
                                placeholder='Nombre'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='label-contact' htmlFor="email">Email</label>
                            <input
                                className='input-contact'
                                type="email"
                                name='email'
                                id='email'
                                value={formData.email}
                                placeholder='Email'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='label-contact' htmlFor="subject">Asunto</label>
                            <input
                                className='input-contact'
                                type="text"
                                name='subject'
                                id='subject'
                                value={formData.subject}
                                placeholder='Asunto'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className='label-contact' htmlFor='message'>Escriba su Mensaje</label>
                            <textarea
                                className='textarea-contact'
                                name='message'
                                id='message'
                                rows='6'
                                maxLength='400'
                                value={formData.message}
                                placeholder='Escriba su mensaje'
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button className='btn-enviar-contacto' type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
