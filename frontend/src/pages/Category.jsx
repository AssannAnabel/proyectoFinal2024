import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Nav from '../components/Nav.jsx';
import { UserContext } from '../context/UserContext.jsx';
import Footer from '../components/Footer.jsx';

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
        <Nav/>
            <div className="container-card-category">
                {productsByCategory.map(product => <Card key={product.idProduct} product={product} />)}
            </div>

            <Footer/>
        </>


    );
}

export default Category;
