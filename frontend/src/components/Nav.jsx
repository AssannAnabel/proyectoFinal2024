import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { Logo } from "./Logo";
import "../styles/Nav.css";
import { FaShoppingCart } from "react-icons/fa";
import SearchResults from './SerchResult';

function Nav() {
    const { user, handleLogout, products } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (searchQuery) {
            const results = products.filter(product =>
                product.product.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, products]);

    const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <>
            <div className="container-nav">
                <Logo />
                {shouldShowSearchBar && (
                    <div className="container-barra-search">
                        <input
                            className="input-search"
                            placeholder="Buscar producto"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
                <nav className="container-list">
                    <ul className='navList'>
                        <Link to={"/About"}><li>Nosotros</li></Link>
                        <Link to={"/Contact"}><li>Contacto</li></Link>
                        {user && user.name ? (
                            <>
                                <Link to={"/cart"}>
                                    <li>
                                        <FaShoppingCart style={{ color: 'black' }} /> ({totalItemsInCart})
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
            {searchQuery && <SearchResults results={searchResults} />}
        </>
    );
}

export default Nav;
