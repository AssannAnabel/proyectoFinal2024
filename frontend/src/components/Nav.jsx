import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext'; 
import { Logo } from "./Logo";
import "../styles/Nav.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Nav() {
    const { user, handleLogout } = useContext(UserContext);
    const { cart } = useContext(CartContext); 
    const navigate = useNavigate();

    console.log("uer", user);

    function idUpdate(e) {
        e.preventDefault();
        navigate(`/user-update/${user.id}`);
    }

    // Calcula el número total de artículos en el carrito
    const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <div className="container-nav">
                <Logo />
                <div className="container-barra-search">
                    <input className="input-search" placeholder="Buscar producto" />
                    <GoSearch />
                </div>
                <nav className="container-list">
                    <ul className='navList'>
                        <Link to={"/About"}><li>Nosotros</li></Link>
                        <Link to={"/Contact"}><li>Contactos</li></Link>
                       
                        {user && user.name ? (
                            <>
                             <Link to={"/cart"}>
                            <li>
                                <FaShoppingCart style={{color:'black'}} /> ({totalItemsInCart})
                                </li>
                            </Link>
                                <Link to={""} onClick={idUpdate}><li>{user.name}</li></Link>
                                <Link to={"/"}><li onClick={handleLogout}>Cerrar Sesión</li></Link>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"}><li>Iniciar sesión</li></Link>
                                <Link to={"/Register"}><li>Registrarme</li></Link>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Nav;

