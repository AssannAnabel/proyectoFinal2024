import React from "react";
import { Logo } from "./Logo";
import "../styles/Nav.css"
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";

function Nav() {

    return (
        <>
            <div className="container-nav">
                <Logo />
                <div className="container-barra-searcha">
                    <input className="input-search" placeholder="Buscar producto" />
                    <button className="btn-search"><GoSearch/>             
                    </button>                    
                </div>
                <nav className="container-list">
                        <Link to={"/About"} > <a href="#">Nosotros</a></Link>
                        <a href="#">Productos</a>
                        <a href="#">Ofertas</a>
                        <Link to={"/Contact"}><a href="#">Contactos</a></Link>
                    </nav>
            </div>
        </>

    )
}
export default Nav
