import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { handlePurchase } from '../service/purchase';
import '../styles/Shop.css';

const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    return (
        <div>
            <button onClick={() => handlePurchase(user, cart, clearCart)}>Comprar</button>
        </div>
    );
};

export default Shop;
