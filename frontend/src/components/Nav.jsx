
import { Logo } from "./Logo";
import "../styles/Nav.css"
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { UserContext } from '../context/UserContext.jsx'
import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Nav() {
    const { user, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    function idUpdate(e) {
        e.preventDefault()
        navigate(`/user-update/${user.id}`)
    }

    return (
        <>
            <div className="container-nav">
                <Logo />
                <div className="container-barra-searcha">
                    <input className="input-search" placeholder="Buscar producto" />
                    <GoSearch />

                </div>
                <nav className="container-list">
                    <ul className='navList'>
                        <Link to={"/About"}><li>Nosotros</li></Link>
                        <Link to={"/Contact"}><li>Contactos</li></Link>
                        <>
                            {user.name ? (
                                <>
                                    <Link to={""} onClick={idUpdate}><li>{user.name}</li></Link>
                                    <Link to={"/"}><li onClick={handleLogout}>Cerrar Sesion</li></Link>
                                </>
                            ) : (
                                <>
                                    <Link to={"/login"}><li>Iniciar sesión</li></Link>
                                    <Link to={"/Register"}><li>Registrarme</li></Link>
                                </>
                            )
                            }
                        </>
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Nav
