import React, { createContext, useState,useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);//usuarios
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});//usuario
  //guardo usuario cuando hace login
  
 
  const handleLogin = (loggedInUser) => {
    //guardo en el estado del contexto global
    setUsers
    (loggedInUser);
    
    // Almacenar el usuario en localStorage
    //setItem crea o guarda en localstorage el usuario, (nombre de item, data)
    localStorage.setItem('user', JSON.stringify(loggedInUser)); 
   // console.log("loggedInUser", loggedInUser);
    // console.log(isLoggedIn);
     //console.log(user);

  };
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        setUsers(parsedUser);
        setIsLoggedIn(true);
        setLoggedInUser(parsedUser);
      }
    }
  }, []);
  
  const handleLogout = () => {
    setUsers(null);
    // Eliminar el usuario de localStorage
    localStorage.removeItem('user'); 
  };


  return (
    <UserContext.Provider
      value={{ users, setUsers, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser,handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};