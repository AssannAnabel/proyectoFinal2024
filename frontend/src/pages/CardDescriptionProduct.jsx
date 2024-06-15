import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import Nav from '../components/Nav';
import '../styles/CardDescriptionProduct.css';
import { IoIosCard } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPriceCheck } from "react-icons/md";
import Swal from 'sweetalert2';
import { isExcedMax } from '../service/util';
import { handlePurchase } from '../service/purchase';

function CardDescriptionProduct() {
    const { products, user } = useContext(UserContext);
    const { addToCart, clearCart } = useContext(CartContext);
    const { id } = useParams();

    const product = products.find(pro => pro.idProduct === parseInt(id));
    const [quantity, setQuantity] = useState(1);

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

    const handleDirectPurchase = () => {
        if (user) {
            const productForPurchase = [{ ...product, quantity }];
            handlePurchase(user, productForPurchase, clearCart);
            
        } else {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para comprar productos.',
                icon: 'warning',
                confirmButtonText: 'Ok'
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
                            <button className="button-des" onClick={handleDirectPurchase}>Comprar Ahora</button>
                            <div className='container-quantity-product'>
                                <button className="buttonAdd"onClick={() => handleQuantityChange(-1)}>-</button>
                                <p>{quantity}</p>
                                <button  className="buttonAdd"onClick={() => handleQuantityChange(1)}>+</button>
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
        </>
    );
}

export default CardDescriptionProduct;
