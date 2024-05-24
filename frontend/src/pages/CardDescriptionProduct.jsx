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


function CardDescriptionProduct() {
    const { products, user } = useContext(UserContext);
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();

    const product = products.find(pro => pro.idProduct === parseInt(id));

    const [quantity, setQuantity] = useState(1);

   
    const handleQuantityChange = (delta) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + delta;
            if (newQuantity < 1) return 1;
            return newQuantity;
        });
    };

    const handleAddToCart = () => {
        if (user) {
            addToCart(product, quantity);
        } else {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar productos al carrito.',
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
                    <div>
                        <div className='container-precio'>
                            <span>Precio: $ {product.price}</span>
                            <span>Disponible: {product.amount}</span>
                        </div>
                        <div className='container-button'>
                            <button onClick={handleAddToCart}>Añadir al carrito</button>
                            <div className='container-quantity-product'>
                                <button onClick={() => handleQuantityChange(-1)}>-</button>
                                <p>{quantity}</p>
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                           
                            
                        </div>
                        <div className='container-span'>
                            <span><MdPriceCheck /> Precio sin Iva incluido</span>
                            <span><IoIosCard />Facilidad de pago</span>
                            <span><FaShippingFast />Envíos a todo el país</span>
                            <span><MdEmail />Para más información agrotech@gmail.com</span>
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
