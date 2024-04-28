import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Nav from '../components/Nav';
import '../styles/CardDescriptionProduct.css';

function CardDescriptionProduct() {
    const { products } = useContext(UserContext);
    const { id } = useParams();

    // Busca el producto con el id correspondiente
    const product = products.find(pro => pro.idProduct === parseInt(id));

    if (!product) {
        return <div>No se encontró el producto</div>;
    }

    return (
        <>
            <div>
                <Nav />
            </div>

            <div className="container-card-description-product">
                <h2>Nombre del Producto</h2>

                <div className='container-img-price'>
                    <div className="container-img">
                        <img src={product.images} alt="" />
                    </div>
                    <div>
                        <div className='container-precio'>
                            <span>$ {product.price}</span>
                            <span>Disponible{product.amount}</span>
                        </div>
                        <div className='container-button'>
                            <button>Añadir a carrito</button>
                            <div className='container-quantity-product'>
                                <button>-</button> <p>0</p><button>+</button>
                            </div>
                        </div>
                        <div>
                            <span>Precio final Iva incluido</span>
                            <span>Facil de pago</span>
                            <span>Envio a todo el pais</span>
                            <span>Para mas informacion info@agrotech.com</span>
                        </div>
                    </div>
                </div>
                <h3>Descripcion del Producto</h3>
                <div>
                    <p>{product.description}</p>
                </div>
            </div>
        </>
    );
}

export default CardDescriptionProduct;
