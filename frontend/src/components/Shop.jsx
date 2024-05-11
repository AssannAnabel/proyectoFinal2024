import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import Home from '../pages/Home';


const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const handlePurchase = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${user.id}/invoices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify({
                    
                    total_without_iva: Number(calculateTotal()) 
                })
            });

            if (response.ok) {
                clearCart();
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra realizada con éxito!',
                    showConfirmButton: false,
                    timer: 1000 
                });
    
               
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al realizar la compra',
                    text: errorData.message
                });
            }

        } catch (error) {
            console.error('Error al realizar la compra', error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error al realizar la compra',
                text: 'Por favor, inténtelo nuevamente.'
            });
        
        }
    };

    // Función para calcular el total del carrito
    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <>
        <button onClick={handlePurchase}>Comprar</button>
       
        </>
        
    );
};

export default Shop;
