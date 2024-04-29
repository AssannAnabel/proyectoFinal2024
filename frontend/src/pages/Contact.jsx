import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/Contact.css'; 

function Contact() {
    return (
        <>
            <Nav />
            <div className="container">
                <form>
                    <div className="form-group">
                        <label className='label-contact' htmlFor="name">Nombre</label>
                        <input className='input-contact' type="text" name='name' id='name' required />
                    </div>

                    <div className="form-group">
                        <label className='label-contact' htmlFor="email">Email</label>
                        <input className='input-contact' type="email" name='email' id='email' required />
                    </div>

                    <div className="form-group">
                        <label className='label-contact' htmlFor="reason">Asunto</label>
                        <input className='input-contact' type="text" name='asunto' id='asunto' required/>
                    </div>
                   
                    <div className="form-group">
                        <label className='label-contact' htmlFor='mensaje'>Escriba su Mensaje</label>
                        <textarea className='textarea-contact' name='mensaje' id='mensaje' rows='6' required></textarea>
                    </div>

                    <button className='btn-enviar-contacto' type='submit'>Enviar</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default Contact;