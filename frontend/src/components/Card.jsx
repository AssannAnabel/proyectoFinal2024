
import { GiShoppingCart } from "react-icons/gi";
import '../styles/Card.css';
import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx'
import { Link } from "react-router-dom";
import CardDescriptionProduct from "../pages/CardDescriptionProduct.jsx";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
    const navigate = useNavigate();

    function productDetail(e) {
        e.preventDefault()
        navigate(`/product-detail/${product.idProduct}`)
    }

    return (

        <>
            <div className="container-card" onClick={productDetail}>
                <figure>
                    <img src={product.images}  />
                </figure>

                <div className="contenido-card">
                    <h2>{product.product}</h2>
                    <h3>Disponible {product.amount}</h3>
                    <h2>{Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</h2>
                    <p>Envio gratis</p>
            
                </div>
            </div>
        </>
    )
}

export default Card