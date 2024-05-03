import React, { createContext, useState, useEffect, Children } from "react";
import { user } from "../service/user";


export const UserContext = createContext(user);

export const UserProvider = ({ children }) => {
 


  const urlProducts = 'http://localhost:3001/product'


  const [user, setUser] = useState("null");

  const [products, setProducts]= useState([]);
  console.log("usercontext", products);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');  
    
  };

  const fetchProducts = async (urlProducts) => {
    try {
        const response = await fetch(urlProducts);
        const data = await response.json();
        setProducts(data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    fetchProducts(urlProducts);
}, []);

  return (
    <UserContext.Provider value={{ user,products, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  )
}