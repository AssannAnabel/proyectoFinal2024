
import { Logo } from "./Logo";
import "../styles/Nav.css"
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { UserContext } from '../context/UserContext.jsx'
import React, { useContext, useEffect, useState } from 'react';

function Nav() {
    const { user, handleLogout } = useContext(UserContext);



    return (
        <>
            <div className="container-nav">
                <Logo />
                <div className="container-barra-searcha">
                    <input className="input-search" placeholder="Buscar producto" />
                    <button className="btn-search"><GoSearch />
                    </button>
                </div>
                <nav className="container-list">

                    {user ? (
                        <>
                            <ul className='navList'>
                            <Link to={"/About"}><li>Nosotros</li></Link>
                            <Link to={"/Contact"}><li>Contactos</li></Link>
                            <Link to={""}><li>{user.name}</li></Link>
                            <Link to={"/"}><li onClick={handleLogout}>Cerrar Sesion</li></Link>
                            </ul></>
                    ) : (

                        <ul className='navList'>
  <Link to={"/About"}><li>Nosotros</li></Link>
                                <Link to={"/Contact"}><li>Contactos</li></Link>
                                <Link to={"/login"}><li>Iniciar secion</li></Link>
                                <Link to={"/Register"}><li>Registrarme</li></Link>

                           



                        </ul>
                    )}
                    <ul>



                    </ul>



                </nav>
            </div>
        </>

    )
}
export default Nav
