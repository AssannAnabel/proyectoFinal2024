import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Obtener el userId actual
    const getCurrentUserId = () => {
        return localStorage.getItem('currentUserId');
    };

    // Cargar carrito desde localStorage
    const loadCart = () => {
        const userId = getCurrentUserId();
        console.log('Cargando carrito para usuario:', userId);
        
        if (userId) {
            const storedCart = localStorage.getItem(`cart_${userId}`);
            console.log('Datos del carrito desde localStorage:', storedCart);//bien!!!
            
            if (storedCart) {
                try {
                    const parsedCart = JSON.parse(storedCart);
                    console.log('Carrito cargado:', parsedCart);
                    setCart(parsedCart);
                } catch (error) {
                    console.error('Error al analizar los datos del carrito:', error);
                    setCart([]);
                }
            } else {
                setCart([]);
            }
        }
    };
    
    // Guardar carrito en localStorage
    const saveCart = () => {
        const userId = getCurrentUserId();
        console.log('Guardando carrito para usuario:', userId);
        if (userId) {
            console.log('Datos del carrito para guardar:', cart);
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }
    };

    // Cuando el carrito cambia, guardar en localStorage
    useEffect(() => {
        console.log('El carrito ha cambiado:', cart);
        saveCart();
    }, [cart]);

    // Cargar carrito cuando se monta el componente
    useEffect(() => {
        console.log('Cargando el carrito al montar el componente');
        loadCart();
    }, []);

    
    // Añadir producto al carrito
const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex((item) => item.idProduct === product.idProduct);

    if (existingProductIndex !== -1) {
        Swal.fire({
            icon: 'warning',
            title: 'El producto ya fue agregado',
            text: 'El producto ya está en el carrito. Puedes actualizar la cantidad desde el carrito.',
        });
    } else {
        setCart((prevCart) => [...prevCart, { ...product, quantity }]);
        Swal.fire({
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1000
        });
    }
};


    // Actualizar la cantidad de un producto en el carrito
    const updateProductQuantity = (productId, newQuantity) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.idProduct === productId) {
                    if (newQuantity <= 0) {
                        // Si la nueva cantidad es 0 o negativa, elimina el producto del carrito
                        return null;
                    } else {
                        // Actualiza la cantidad del producto
                        return { ...item, quantity: newQuantity };
                    }
                }
                return item;
            }).filter((item) => item !== null);
        });
    };

    // Eliminar producto del carrito
    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.idProduct !== productId));
    };

    // Vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateProductQuantity,
            removeProductFromCart,
            clearCart,
            loadCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
