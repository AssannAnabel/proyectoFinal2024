
import { GiShoppingCart } from "react-icons/gi";
import '../styles/Card.css';
import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext.jsx'
import { Link } from "react-router-dom";


function Card({ product }) {
   


    return (

        <>
            <div className="container-card">
                <figure>
                    <img src={product.images} width={284} height={284} alt="" />
                </figure>
              
                <div className="contenido-card">
                    <h2>{product.product}</h2>
                    <h3>stock {product.amount}</h3>
                    <h2>$ {product.price}</h2>
                    <button>Agregar carrito</button>

                 </div>


                <GiShoppingCart />
            </div>
        </>
    )
}

export default Card