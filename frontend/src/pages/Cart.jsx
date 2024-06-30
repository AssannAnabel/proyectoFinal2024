import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';
import Shop from '../components/Shop';
import { isExcedMax } from '../service/util';
import Swal from 'sweetalert2';
import { FaShoppingCart } from "react-icons/fa";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Cart = () => {
    const { cart, removeProductFromCart, updateProductQuantity, clearCart } = useContext(CartContext);
    const [saveCart, setSaveCart] = useState(cart);
    

    useEffect(() => {
        setSaveCart(cart);
    }, [cart]);

    const calculateTotal = () => {
        return saveCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleUpdateQuantity = (idProduct, newQuantity) => {
        if (newQuantity < 1) {
            Swal.fire({
                title: 'Cantidad inválida',
                text: 'La cantidad debe ser al menos 1.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        const updatedCart = saveCart.map(item =>
            item.idProduct === idProduct ? { ...item, quantity: newQuantity } : item
        );

        setSaveCart(updatedCart);
        updateProductQuantity(idProduct, newQuantity);
    };

    return (
        <div className="cart-page">
            <Nav />
            <div className="cart-container">
                <div className='contenido-cart'>
                    <div className="cart-title">
                        <h1>Tu Carrito</h1>
                        <FaShoppingCart className="cart-icon" />
                    </div>
                    {cart.length === 0 ? (
                        <p>El carrito está vacío</p>
                    ) : (
                        <ul className="cart-list">
                            {cart.map((item) => (
                                <li key={item.idProduct} className="cart-item">
                                    <div className="cart-item-info">
                                        <p>Producto: {item.product}</p>
                                        <img src={item.images} alt={item.product} />
                                        <p>Precio: {Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <button
                                            className="quantity-button increase-quantity"
                                            onClick={() => {
                                                if (!isExcedMax(item.quantity + 1, item.amount)) {
                                                    handleUpdateQuantity(item.idProduct, item.quantity + 1);
                                                } else {
                                                    Swal.fire({
                                                        title: 'Stock insuficiente',
                                                        text: 'No hay suficiente stock de este producto.',
                                                        icon: 'error',
                                                        confirmButtonText: 'Ok'
                                                    });
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="quantity-button decrease-quantity"
                                            onClick={() => handleUpdateQuantity(item.idProduct, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="remove-button"
                                            onClick={() => removeProductFromCart(item.idProduct)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {cart.length > 0 && (
                        <> <div className='shop-end'>
                            <h2 className="total">Total de la compra: {Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(calculateTotal())}</h2>
                            <Shop />
                           <button className="clear-cart-button" onClick={clearCart}>Vaciar carrito</button>
                        </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />

        </div>

    );
};

export default Cart;
