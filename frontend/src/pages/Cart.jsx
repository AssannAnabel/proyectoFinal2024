import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Logo } from '../components/Logo';
import '../styles/Cart.css';
import Shop from '../components/Shop';
import { isExcedMax } from '../service/util';
import Swal from 'sweetalert2';

const Cart = () => {
    const { cart, removeProductFromCart, updateProductQuantity, clearCart } = useContext(CartContext);

    // Calcula el total del carrito
    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <Logo />
            </div>
            <h2>Carrito de compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.idProduct} className="cart-item">
                            <div className="cart-item-info">
                                <p>Producto: {item.product}</p>
                                <p><img src={item.images} alt={item.product} /></p>
                                <p>Precio: ${item.price}</p>
                                <p>Cantidad: {item.quantity}</p>
                            </div>
                            <div className="cart-item-actions">
                                {/* Botones para modificar la cantidad del producto y eliminar */}
                                <button onClick={() => {
                                    if (!isExcedMax(item.quantity + 1, item.amount)) {
                                        updateProductQuantity(item.idProduct, item.quantity + 1);
                                    } else {
                                        Swal.fire({
                                            title: 'Stock insuficiente',
                                            text: 'No hay suficiente stock de este producto.',
                                            icon: 'error',
                                            confirmButtonText: 'Ok'
                                        });
                                    }
                                }}>+</button>
                                <button onClick={() => updateProductQuantity(item.idProduct, item.quantity - 1)}>-</button>
                                <button onClick={() => removeProductFromCart(item.idProduct)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${calculateTotal()}</p>
            <Shop />
            <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    );
};

export default Cart;
