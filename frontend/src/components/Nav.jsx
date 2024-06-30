import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { Logo } from "./Logo";
import { CiSearch } from "react-icons/ci";

import "../styles/Nav.css";

function Nav() {
    const { user, handleLogout } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    function idUpdate(e) {
        e.preventDefault();
        navigate(`/user-update/${user.id}`);
    }

     // Define las rutas donde no quieres que se muestre la barra de búsqueda
     const hideSearchBarRoutes = ['/About', '/Contact', '/login', '/Register', '/cart'];
     if (user && user.id) {
         hideSearchBarRoutes.push(`/user-update/${user.id}`);
     }
 
     // Función para verificar si se debe mostrar la barra de búsqueda
     const shouldShowSearchBar = !hideSearchBarRoutes.includes(location.pathname);
    return (
        <div className="container-nav">
            <Logo />
            {shouldShowSearchBar && (
            <div className="container-busqueda-barra ">
                <form className='form-busqueda' onSubmit={handleSubmit}>
                    <input
                        className="input-search"
                        placeholder="Buscar producto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        
                    />
                    <button className='btn-buscar' type="submit"><CiSearch className='icon-buscar' width={40}/></button>
                </form>
            </div>
            )}
            <nav className="container-list">
                <ul className='navList'>
                    <li className='navLi'><Link to={"/About"}>Nosotros</Link></li>
                    <li className='navLi'><Link to={"/Contact"}>Contacto</Link></li>
                    {user && user.name ? (
                        <>
                            <li className='navLi'><Link to={"/cart"}><FaShoppingCart style={{ color: 'black' }} /> ({totalItemsInCart})</Link></li>
                            <li className='navLi'><Link to={""} onClick={idUpdate}>{user.name}</Link></li>
                            <li className='navLi'><Link to={"/"} onClick={handleLogout}>Cerrar Sesión</Link></li>
                        </>
                    ) : (
                        <>
                            <li className='navLi'><Link to={"/login"}>Iniciar sesión</Link></li>
                            <li className='navLi'><Link to={"/Register"}>Registrarme</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
