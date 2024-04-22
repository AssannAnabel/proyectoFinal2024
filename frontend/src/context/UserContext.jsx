import React, {createContext, useState, useEffect, Children} from "react";
import { user } from "../service/user";


export const UserContext = createContext(user);

 export const UserProvider = ({children})=> {
 
  
  const [user,setUser]= useState("null");
  
    const handleLogin = (loggedInUser)=>{
        setUser (loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
    };

    useEffect(()=>{
        const storedUser= localStorage.getItem('user');
        if (storedUser){
           setUser(JSON.parse(storedUser));
        }
    },[]);

   const handleLogout =() =>{
    setUser(null);   
    localStorage.removeItem('user');
  

   };

   return(
    <UserContext.Provider
    value={{ user,handleLogin, handleLogout }}
  >
    {children}
  </UserContext.Provider>
   )

 }