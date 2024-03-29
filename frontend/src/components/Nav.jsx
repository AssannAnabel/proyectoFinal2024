import React from "react";
import { Logo } from "./Logo";
import "../styles/Nav.css"
import {Link} from 'react-router-dom';

function Nav() {

    return (
        <>
        <div className="container-nav">
            <div>
        <Logo/>
                
            </div>
              <div className="container-list">
                <ul className="navUl">
                <li> <Link to={"/About"} >Nosotros</Link> </li>
                    <li>Productos</li>
                    <li>Ofertas</li>
                    <li> <Link to={"/Contact"} >Contactos</Link> </li>
                </ul>

            </div>
        </div>
        
        </>

    )
}
export default Nav
