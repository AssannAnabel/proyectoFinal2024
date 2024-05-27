import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import '../styles/Shop.css';
import { Logo } from './Logo';
import logo from "/agrotech-logo.png"

const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [saveCart, setSaveCart] = useState([]);

    useEffect(() => {
        setSaveCart([...cart]);
    }, [cart]);

    const handlePurchase = async () => {
        const data = cart.map((product) => ({
            idProduct: product.idProduct,
            amount: product.quantity
        }));

        try {
            const response = await fetch(`http://localhost:3000/invoices/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify({
                    products: data
                })
            });

            if (response.ok) {
                const invoiceDto = await response.json();
                setSaveCart(cart); // Save the cart before clearing
                clearCart();
                Swal.fire({
                    imageUrl: logo,
                  
                    title: '¡Compra realizada con éxito!',
                    html: `
                        <div class="purchase-details">
                            <h3>Detalles de la compra</h3>
                            <ul>
                                ${saveCart.map(product => `
                                    <li key=${product.idProduct}>
                                        <div class="product-info">
                                            <p><strong>Producto:</strong> ${product.product}</p>
                                            <p><strong>Cantidad:</strong> ${product.quantity}</p>
                                        
                                            <p><strong>Precio:</strong> $${product.price}</p>
                                            <p><strong>Total:</strong> $${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                            <p class="total"><strong>Total de la compra: $${saveCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                        </div>
                    `,

                    confirmButtonText: 'Ok',
                    showConfirmButton: true,
                    customClass: {
                        image: 'custom-image-class'
                    }
                });


            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al realizar la compra',
                    text: errorData.message
                });
            }
        } catch (error) {
            console.error('Error al realizar la compra', error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error al realizar la compra',
                text: 'Por favor, inténtelo nuevamente.'
            });
        }
    };

    return (
        <div>
            <button onClick={handlePurchase}>Comprar</button>
        </div>
    );
};

export default Shop;
