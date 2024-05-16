import React, { createContext, useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';
import { getUserById, url_users } from '../service/userService';
import {user} from "../service/user"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const { loadCart, clearCart } = useContext(CartContext);
   

    const urlProducts = 'http://localhost:3001/product';

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
                loadCart(parsedUser.id);
            
            }
        }
        console.log("usuario", user);
    }, [user, loadCart]);

    // Manejo de inicio de sesión
    const handleLogin = (loggedInUser) => {
        console.log("usuario", loggedInUser);
        

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('currentUserId', loggedInUser.id);
        loadCart(user.id);
        console.log("loadCart", user);
    };

    const fetchUser = async () => {
        try {
            const userData = await getUserById(loggedInUser.sub);
            setUser(userData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            fetchUser(currentUserId);
        } else {
            setLoading(false);
        }
    }, []);
    console.log("usuario21",user);
 
    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('currentUserId');
        clearCart();
    };

   
    
        
        

    

    return (
        <UserContext.Provider value={{ user, products, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};
