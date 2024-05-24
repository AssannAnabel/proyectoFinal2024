import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

const Shop = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    console.log('Contenido del carrito antes de la compra:', cart);

    const handlePurchase = async () => {
        const data=
        cart.map(item => ({
            idProduct: item.idProduct,
             amount: item.quantity
            }))
            console.log(data)
        try {
            const response = await fetch(`http://localhost:3000/invoices/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.access_token}`
                },
                body: JSON.stringify({
                    // total_without_iva: Number(calculateTotal()),
                    // id_user:user.id,
                      products: cart.map(item => ({
                        idProduct: item.idProduct,
                       amount: item.quantity
                      }))
                })
            });

            if (response.ok) {
                const invoice = await response.json(); // Obtener la factura creada
                console.log('Factura creada desde shop:', invoice); //llega bien el dato!!!
                clearCart();
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra realizada con éxito!',
                    showConfirmButton: false,
                    timer: 1000 
                }).then(() => {
                    navigate(`/invoices-details`); // Redirigir a la página de detalles de la factura
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
    const detail=cart;
    return (
        <div>
            {/* <h2>Carrito de Compras</h2>
              <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <p>Producto: {item.name}</p>
                        <p>Precio: ${item.price}</p>
                        <p>Cantidad: {item.quantity}</p>
                    </li>
                ))}
            </ul>  
            <h3>Total: ${calculateTotal()}</h3> */}
            <button onClick={handlePurchase}>Comprar</button>
        </div>
    );
};

export default Shop;
