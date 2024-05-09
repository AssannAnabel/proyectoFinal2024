import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Logo } from '../components/Logo';
import '../styles/Cart.css'; // Asegúrate de incluir los estilos apropiados

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
                                <p>Precio: ${item.price}</p>
                                <p>Cantidad: {item.quantity}</p>
                                {/* <p>{item.images}</p> */}
                
                            </div>
                            <div className="cart-item-actions">
                                {/* Botones para modificar la cantidad del producto y eliminar*/}
                                <button onClick={() => updateProductQuantity(item.idProduct, item.quantity + 1)}>+</button>
                                <button onClick={() => updateProductQuantity(item.idProduct, item.quantity - 1)}>-</button>
                                <button onClick={() => removeProductFromCart(item.idProduct)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* suma total del carrito */}
            <p>Total: ${calculateTotal()}</p>

            {/* vaciar el carrito */}
            <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    );
};

export default Cart;
