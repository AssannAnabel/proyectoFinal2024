import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import Nav from '../components/Nav';
import '../styles/CardDescriptionProduct.css';
import { IoIosCard } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { MdEmail, MdPriceCheck } from "react-icons/md";
import Swal from 'sweetalert2';
import { isExcedMax } from '../service/util';
import { handlePurchase } from '../service/purchase';
import logo from "/agrotech.png"; // Importa el logo
import '../styles/Shop.css'; // Importa los estilos del modal

function CardDescriptionProduct() {
    const { products, user } = useContext(UserContext);
    const { addToCart, clearCart } = useContext(CartContext);
    const { id } = useParams();

    const product = products.find(pro => pro.idProduct === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    const { cart, removeProductFromCart, updateProductQuantity } = useContext(CartContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('store_pickup');
    const [address, setAddress] = useState('');

    const handleQuantityChange = (delta) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + delta;
            if (newQuantity < 1) return 1;
            if (isExcedMax(newQuantity, product.amount)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock máximo alcanzado',
                    text: `No hay suficiente stock de este producto. Máximo permitido: ${product.amount}.`,
                });
                return prevQuantity;
            }
            return newQuantity;
        });
    };

    const handleAddToCart = () => {
        if (user) {
            if (!isExcedMax(quantity, product.amount)) {
                addToCart(product, quantity);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto añadido al carrito',
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock máximo alcanzado',
                    text: `No hay suficiente stock de este producto. Máximo permitido: ${product.amount}.`,
                });
            }
        } else {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar productos al carrito.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        }
    };

    const openPurchaseModal = () => {
        if (user) {
        setModalOpen(true);
            
            
        } else {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para comprar productos.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        }
    };

    const closePurchaseModal = () => {
        setModalOpen(false);
    };
    const confirmPurchase = async () => {
        const productForPurchase = [{ ...product, quantity }];
    
        // Validación para métodos de pago que requieren detalles de tarjeta
        if (['credit_card', 'debit_card'].includes(paymentMethod)) {
            if (!cardNumber || !cardExpiry || !cardCVV) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Información incompleta',
                    text: 'Por favor completa todos los campos de la tarjeta.',
                });
                return; // Detenemos la función aquí si faltan datos
            }
        }
    
        try {
            await handlePurchase(user, productForPurchase, clearCart, {
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
    

    if (!product) {
        return <div>No se encontró el producto</div>;
    }

    return (
        <>
            <Nav />
            <div className="container-card-description-product">
                <h2>{product.product}</h2>
                <div className="container-img-price">
                    <div className="container-img">
                        <img src={product.images} alt={product.product} />
                    </div>
                    <div className='container-detalles'>
                        <div className='container-precio'>
                            <span>Precio: $ {product.price}</span>
                            <span>Disponible: {product.amount}</span>
                        </div>
                        <div className='container-button'>
                            <button className="button-des" onClick={handleAddToCart}>Añadir al carrito</button>
                            <button className="button-des" onClick={openPurchaseModal}>Comprar Ahora</button>
                            <div className='container-quantity-product'>
                                <button className="buttonAdd" onClick={() => handleQuantityChange(-1)}>-</button>
                                <p>{quantity}</p>
                                <button className="buttonAdd" onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>
                        <div className='container-span'>
                            <span><MdPriceCheck className='icon-det'/> Precio sin Iva incluido</span>
                            <span><IoIosCard className='icon-det'/>Facilidad de pago</span>
                            <span><FaShippingFast className='icon-det'/>Envíos a todo el país</span>
                            <span><MdEmail className='icon-det'/>Para más información somos.agrotech@gmail.com</span>
                        </div>
                    </div>
                </div>
                <h3>Descripción del producto:</h3>
                <div>
                    <p>{product.description}</p>
                </div>
            </div>

            {modalOpen && (
                <div className="modal-wrapper">
                    <div className="purchase-details">
                        <img src={logo} alt="Logo" className="logo-image" />
                        <ul>
                            <li key={product.idProduct}>
                                <div className="product-info">
                                    <p><strong>Producto:</strong> {product.product}</p>
                                    <p><strong>Cantidad:</strong> {quantity}</p>
                                    <p><strong>Precio:</strong> ${product.price}</p>
                                    <p><strong>Total:</strong> ${(product.price * quantity).toFixed(2)}</p>
                                </div>
                            </li>
                        </ul>
                        <p className="total">Total de la compra: ${(product.price * quantity).toFixed(2)}</p>

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
                        {['credit_card', 'debit_card'].includes(paymentMethod) && (
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
                        {paymentMethod === 'paypal' && (
                            <div className="form-group">
                                <label htmlFor="paypalEmail">Correo Electrónico de PayPal</label>
                                <input
                                    id="paypalEmail"
                                    className="custom-input"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>
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
}

export default CardDescriptionProduct;
