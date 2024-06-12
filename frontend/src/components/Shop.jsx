import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { handlePurchase } from '../service/purchase';
import '../styles/Shop.css';

const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    return (
        <>
            <button className="button-shop"onClick={() => handlePurchase(user, cart, clearCart)}>Comprar</button>
        </>
    );
};

export default Shop;
