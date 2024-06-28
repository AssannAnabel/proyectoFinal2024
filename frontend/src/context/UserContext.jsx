import React, { createContext, useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const { loadCart, clearCart } = useContext(CartContext);

    const urlProducts = 'http://localhost:3000/product';

    // Cargar productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(urlProducts);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Error al obtener productos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Cargar usuario desde localStorage y el carrito del usuario
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Verifica que no se esté repitiendo la asignación de `user` para evitar el bucle
            if (!user || user.id !== parsedUser.id) {
                setUser(parsedUser);
              //  loadCart(parsedUser.id);
            }
        }
    }, [user]);

    // Manejo de inicio de sesión
    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('currentUserId', loggedInUser.id);
      //  loadCart(loggedInUser.id);
    };

    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('currentUserId');
        //clearCart();
    };

    return (
        <UserContext.Provider value={{ user, products, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};
