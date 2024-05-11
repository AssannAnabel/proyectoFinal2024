import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import Nav from '../components/Nav';
import '../styles/CardDescriptionProduct.css';
import { IoIosCard } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPriceCheck } from "react-icons/md";
import Swal from 'sweetalert2';// importar SweetAlert2 (instalar => npm i sweetalert2 )



function CardDescriptionProduct() {
    const { products, user } = useContext(UserContext);
    const { cart, addToCart } = useContext(CartContext);
    const { id } = useParams();

    // Busca el producto con el ID correspondiente
    const product = products.find(pro => pro.idProduct === parseInt(id));

    // Estado para controlar la cantidad a agregar al carrito
    const [quantity, setQuantity] = useState(1);

    // Maneja el cambio de cantidad
    const handleQuantityChange = (delta) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + delta));
    };

    // Maneja el clic en el botón de añadir al carrito
    const handleAddToCart = () => {
        if (user) {
            // Si el usuario está autenticado, agrega el producto al carrito
            addToCart(product, quantity);
        } else {   //sweetAlert
                Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar productos al carrito.',
                icon: 'warning', // Elige el ícono adecuado ('success', 'error', 'warning', 'info', 'question')
                confirmButtonText: 'Ok'
            });
        }
    };

    if (!product) {
        return <div>No se encontró el producto</div>;
    }

    return (
        <>
        <div>
            <Nav />
        </div>

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
                            <div className='container-span'>
                            <span> <MdPriceCheck /> Precio final Iva incluido  </span>
                            <span><IoIosCard />Facilidad de pago </span>
                            <span> <FaShippingFast />Envíos a todo el país</span>
                            <span><MdEmail />Para mas información agrotech@gmail.com </span>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Descripción del producto: </h3>
                <div>
                    <p>{product.description}</p>
                </div>
            </div>
        </>
    );
}

export default CardDescriptionProduct;
