import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { handlePurchase } from '../service/purchase';
import logo from "/agrotech.png"

import '../styles/Shop.css';

const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('store_pickup');
    const [address, setAddress] = useState('');

    const openPurchaseModal = () => {
        setModalOpen(true);
    };

    const closePurchaseModal = () => {
        setModalOpen(false);
    };

    const confirmPurchase = async () => {
        if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
            if (!cardNumber || !cardExpiry || !cardCVV) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Información incompleta',
                    text: 'Por favor, complete todos los campos de la tarjeta.',
                });
                return;
            }
        }
        
        try {
            await handlePurchase(user, cart, clearCart, {
                paymentMethod,
                cardNumber,
                cardExpiry,
                cardCVV,
                deliveryMethod,
                address
            });
            Swal.fire({
                title: 'Compra Confirmada',
                text: 'Gracias por tu compra. Recibirás un correo con los detalles.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                closePurchaseModal();
                window.location.href = '/'; // Redirige a la página de inicio
            });
        } catch (error) {
            console.error('Error al realizar la compra', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al realizar la compra',
                text: 'Por favor, inténtelo nuevamente.',
            });
        }
    };

    const handleShopClick = () => {
        openPurchaseModal();
    };

    return (
        <>
            <button className="button-shop" onClick={handleShopClick}>Comprar</button>

            {modalOpen && (
                <div className="modal-wrapper">
                    <div className="purchase-details">
                        <img src={logo} alt="Logo" className="logo-image" />
                        <ul>
                            {cart.map((product) => (
                                <li key={product.idProduct}>
                                    <div className="product-info">
                                        <p><strong>Producto:</strong> {product.product}</p>
                                        <p><strong>Cantidad:</strong> {product.quantity}</p>
                                        <p><strong>Precio:</strong> {Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</p>
                                        <p><strong>Total:</strong> {Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format((product.price * product.quantity).toFixed(2))}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="total">Total de la compra:{Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2))} </p>

                        <div className="form-group">
                            <label htmlFor="paymentMethod">Método de Pago</label>
                            <select
                                id="paymentMethod"
                                className="custom-select"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="credit_card">Tarjeta de Crédito</option>
                                <option value="debit_card">Tarjeta de Débito</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                        {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Número de Tarjeta</label>
                                    <input
                                        id="cardNumber"
                                        className="custom-input"
                                        type="text"
                                        placeholder="Número de Tarjeta"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardExpiry">Fecha de Expiración</label>
                                    <input
                                        id="cardExpiry"
                                        className="custom-input"
                                        type="text"
                                        placeholder="MM/AA"
                                        value={cardExpiry}
                                        onChange={(e) => setCardExpiry(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cardCVV">CVV</label>
                                    <input
                                        id="cardCVV"
                                        className="custom-input"
                                        type="text"
                                        placeholder="CVV"
                                        value={cardCVV}
                                        onChange={(e) => setCardCVV(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label htmlFor="deliveryMethod">Método de Entrega</label>
                            <select
                                id="deliveryMethod"
                                className="custom-select"
                                value={deliveryMethod}
                                onChange={(e) => setDeliveryMethod(e.target.value)}
                            >
                                <option value="store_pickup">Retirar en Tienda</option>
                                <option value="home_delivery">Envío a Domicilio</option>
                            </select>
                        </div>
                        {deliveryMethod === 'home_delivery' && (
                            <div className="form-group" id="addressGroup">
                                <label htmlFor="address">Dirección de Envío</label>
                                <input
                                    id="address"
                                    className="custom-input"
                                    type="text"
                                    placeholder="Dirección de Envío"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        )}

                        <button className="confirm-button" onClick={confirmPurchase}>Confirmar Compra</button>
                        <button className="cancel-button" onClick={closePurchaseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Shop;
