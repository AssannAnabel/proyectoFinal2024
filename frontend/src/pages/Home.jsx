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
  const productsRopaDeTrabajo = products.filter(cat => cat.category === "Ropa de trabajo").slice(0, 8);
  const productsTranqueras = products.filter(cat => cat.category === "Tranqueras").slice(0, 8);
  const productsRespuestosAgricolas = products.filter(cat => cat.category === "Respuestos Agrícolas").slice(0, 8);
  const productsEquipamientosVehiculos = products.filter(cat => cat.category === "Equipamientos Vehículos").slice(0, 8);
  const productsPulverizacion=products.filter(cat => cat.category === "Pulverizacíon").slice(0, 8);
  const productsConstruccion = products.filter(cat => cat.category === "Construcción").slice(0, 8);
  const productsInfraestructura = products.filter(cat => cat.category === "Infraestructura").slice(0, 8);
  const productsEnegiasRenovables = products.filter(cat => cat.category === "Energías Renovables").slice(0, 8);
  const productsMaquinariaAgricola = products.filter(cat => cat.category === "Maquinaria Agrícola").slice(0, 8);
  const productsForestacionYjardineria = products.filter(cat => cat.category === "Forestación y Jardinería").slice(0, 8);
  const productsAgriculturaDePrecision = products.filter(cat => cat.category === "Agricultura de Presicion").slice(0, 8);

 

  return (
    <>
      <div>
        <Nav />
      </div>

      <div>
        <BarCategoryProducts />
      </div>

      <div className="container-card-home">

        <div className="container-card-category">
          {productsFerreteria.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsRopaDeTrabajo.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsTranqueras.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
       
        <div className="container-card-category">
          {productsRespuestosAgricolas.map(product => <Card key={product.idProduct} product={product} />)}
        </div>

        <div className="container-card-category">
          {productsEquipamientosVehiculos.map(product => <Card key={product.idProduct} product={product} />)}
        </div>

        <div className="container-card-category">
          {productsPulverizacion.map(product => <Card key={product.idProduct} product={product} />)}
        </div>

        <div className="container-card-category">
          {productsConstruccion.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsInfraestructura.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsEnegiasRenovables.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsMaquinariaAgricola.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsForestacionYjardineria.map(product => <Card key={product.idProduct} product={product} />)}
        </div>
        <div className="container-card-category">
          {productsAgriculturaDePrecision.map(product => <Card key={product.idProduct} product={product} />)}
        </div>











      </div>


      <h1>esta es la Home</h1>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;