import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import Card from '../components/Card'
import BarCategoryProducts from '../components/BarCategoryProducts'
import { UserContext } from '../context/UserContext.jsx'
import React, { useContext, useEffect, useState } from 'react';

function Home() {
  const { products } = useContext(UserContext);
  const productsFerreteria = products.filter(cat => cat.category === "Ferretería").slice(0, 8);
  const productsTranqueras = products.filter(cat => cat.category === "Tranqueras").slice(0, 8);
  const productsRopaDeTrabajo = products.filter(cat => cat.category === "Ropa de trabajo").slice(0, 8);


  return (
    <>
      <Nav />

      <BarCategoryProducts />


      <div className="container-card-home">

        <div className="container-card-category">

         
          {productsFerreteria.map(product => <Card key={product.idProduct} product={product} />)}

        </div>
        <div className="container-card-category">

          {productsTranqueras.map(product => <Card key={product.idProduct} product={product} />)}

        </div>
        <div className="container-card-category">

          {productsRopaDeTrabajo.map(product => <Card key={product.idProduct} product={product} />)}

        </div>

      </div>


      <h1>esta es la Home</h1>

      <Footer />




    </>



  );
}

export default Home;