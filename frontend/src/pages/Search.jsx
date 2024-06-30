import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Carousel from '../components/Carousel';
import BarCategoryProducts from '../components/BarCategoryProducts';
import "../styles/Search.css"


function Search() {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        if (searchQuery) {
            fetchProducts(searchQuery);
        }
    }, [searchQuery]);

    const fetchProducts = async (query) => {
        try {
            const response = await fetch(`http://localhost:3000/product`);
            if (!response.ok) {
                throw new Error('Error al obtener los productos.');
            }
            const data = await response.json();
            const results = data.filter(product =>
                product.product.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const data = [
        "/carrousel.jpg",
        "/carrousel1.jpg",
        "/carrousel2.jpg",
        "/carrousel3.jpg",
        "/carrousel4.jpg",
        "/carrousel5.jpg",
        "/carrousel6.jpg"
    ];

    return (
        <>
            <Nav />
            <div className="container-carousel">
                {/* <Carousel imagenes={data} itemsToShow={1} /> */}
            </div>
            {/* <BarCategoryProducts /> */}

            <div className="container-cards">
                <div className="whith">
                    <div className="cards-container">
                       
                            {searchResults.length > 0 ? (
                                searchResults.map(product => (
                                    <div className="container-card-cat" key={product.idProduct}>
                                        <Card product={product} />
                                    </div>
                                ))
                            ) : (
                                <p>No se encontraron productos.</p>
                            )}
                       
                    </div>
                </div>


            </div>
            <Footer />
        </>

    );
}

export default Search;
