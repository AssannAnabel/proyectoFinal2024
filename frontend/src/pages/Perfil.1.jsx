import React, { useState, useContext } from 'react';
import { updateUserById, deleteUser } from '../service/userService';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';

export function Perfil() {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [userUpdate, setUserUpdate] = useState({
        phone: user.telefono,
        email: user.email,
        password: user.password,
    });

    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false); // Estado para controlar la visibilidad del historial de compras

    function handleChange(e) {
        e.preventDefault();
        setUserUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
        return userUpdate;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserById(user.id, userUpdate);
        navigate('/');
    };

    const handleDeleteProfile = () => {
        deleteUser(user);
        handleLogout();
        navigate('/register');
    };

    const togglePurchaseHistory = () => {
        setShowPurchaseHistory(prev => !prev); // Cambia el estado para mostrar u ocultar el historial de compras
    };

    return (
        <>
            <Nav />
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.rol}</p>
            </div>

            <div className="container">
                <h2>Editar perfil</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={user.email} onChange={handleChange} />
                    <label htmlFor='phone'>Telefono</label>
                    <input type='phone' name='phone' id='phone' value={userUpdate.phone} onChange={handleChange} />
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' id='password' value={userUpdate.password} onChange={handleChange} />
                    <button className='btn-guardar' type='submit'>Guardar</button>
                    <button className='btn-delete' onClick={handleDeleteProfile}>Eliminar perfil</button>
                </form>
            </div>

            <div className="container">
                <h2>Historial de compras</h2>
                <button onClick={togglePurchaseHistory}>{showPurchaseHistory ? 'Ocultar historial' : 'Mostrar historial'}</button>
                {showPurchaseHistory && (
                    <ul>
                        {purchaseHistory.map(purchase => (
                            <li key={purchase.idInvoice}>
                                <p>Fecha: {purchase.invoiceDate}</p>
                                <p>Productos:</p>
                                <ul>
                                    {purchase.invoiceDetails.map(detail => (
                                        <li key={detail.id}>
                                            <p>Nombre: {detail.product.product}</p>
                                            <p>Cantidad: {detail.amount_sold}</p>
                                            <p>Valor unitario: {detail.product.price}</p>
                                        </li>
                                    ))}
                                </ul>
                                <p>Total de la compra: {purchase.total_with_iva}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Footer />
        </>
    );
}
