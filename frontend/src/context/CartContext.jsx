import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        // console.log('Cargando el carrito al montar el componente');
         loadCart();
         
    }, []);

    // Cuando el carrito cambia, guardar en localStorage
    // useEffect(() => {
    //     // console.log('El carrito ha cambiado:', cart);
    //   // saveCart(cart);
    //     // console.log("q hay aca", cart);
    // }, [cart]);

    // Obtener el userId actual
    const getCurrentUserId = () => {
        return localStorage.getItem('currentUserId');
    };

    // Cargar carrito desde localStorage
    const loadCart = () => {
       
        const userId = getCurrentUserId();
        console.log('Cargando carrito para usuario:', userId);
        console.log("aqui loasdCart");

        if (userId) {
            const storedCart = localStorage.getItem(`cart_${userId}`);
            console.log('Datos del carrito desde localStorage:', storedCart);//bien!!!

            if (storedCart) {
                // try {
                const parsedCart = JSON.parse(storedCart);
                console.log( parsedCart);
                setCart(parsedCart);
                debugger
                console.log(cart);
                // } catch (error) {
                //     console.error('Error al analizar los datos del carrito:', error);
                //     // setCart([]);
                // }
            }
        }
    };

    // Guardar carrito en localStorage
    const saveCart = (cart) => {
        
        const userId = getCurrentUserId();
        console.log('Guardando carrito para usuario:', userId);
        if (userId) {
            console.log('Datos del carrito para guardar:', cart);
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }
    };

   

    // Cargar carrito cuando se monta el componente
   
    // Añadir producto al carrito
    const addToCart = (product, quantity) => {
       
        const existingProductIndex = cart.findIndex((item) => item.idProduct === product.idProduct);
        let c = null
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            const updatedCart = cart.map((item, index) => {
                if (index === existingProductIndex) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
            
           c= updatedCart;
        } else {
            // Si el producto no está en el carrito, agréguelo con la cantidad deseada
           c=[...cart, { ...product, quantity }];
        }
        console.log(c);
        setCart(c)
        // console.log(cart);
        saveCart(c)
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
      //  saveCart(cart)

    };

    // Eliminar producto del carrito
    const removeProductFromCart = (productId) => {
       
        setCart((prevCart) => prevCart.filter((product) => product.idProduct !== productId));
       // saveCart(cart)

    };

    // Vaciar el carrito
    const clearCart = () => {
        //    setCart([]);
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
