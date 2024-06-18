import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav.jsx';
import { UserContext } from '../context/UserContext.jsx';
import Footer from '../components/Footer.jsx';
import "../styles/Category.css";
import BarCategoryProducts from '../components/BarCategoryProducts.jsx';

function Category() {
    const { products } = useContext(UserContext);
    const { category } = useParams(); // Obtener el parámetro de la URL
    const [productsByCategory, setProductsByCategory] = useState([]);

    useEffect(() => {
        // Filtrar los productos por la categoría actual
        const filteredProducts = products.filter(product => product.category === category);
        setProductsByCategory(filteredProducts);
    }, [products, category]);

    return (
        <>
            <div className='general-category'>
                <div className='nav-category'>
                    <Nav />
                </div>
                <div className='barCategoria-category'>
                    <BarCategoryProducts />
                </div>
                <div className="container-cards-category">
                    <div className="whith-category">
                        <div className="cards-container-category">
                            {productsByCategory.map(product => (
                                <div key={product.idProduct} className="container-card-category">
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
}

export default Category;
