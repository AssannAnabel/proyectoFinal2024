import React, { useContext } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Card from '../components/Card';
import BarCategoryProducts from '../components/BarCategoryProducts';
import { UserContext } from '../context/UserContext';
import "../styles/Home.css";

function Home() {
    const {products} = useContext(UserContext);

   
    const filterProducts = (category) => {
        if (Array.isArray(products)) {
            return products.filter(product => product.category === category).slice(0, 8);
        }
        return [];
    };
    const productsFerreteria = filterProducts("Ferretería");
    const productsRopaDeTrabajo = filterProducts("Ropa de trabajo");
    const productsTranqueras = filterProducts("Tranqueras");
    const productsRespuestosAgricolas = filterProducts("Respuestos Agrícolas");
    const productsEquipamientosVehiculos = filterProducts("Equipamientos Vehículos");
    const productsPulverizacion = filterProducts("Pulverizacíon");
    const productsConstruccion = filterProducts("Construcción");
    const productsInfraestructura = filterProducts("Infraestructura");
    const productsEnergiasRenovables = filterProducts("Energías Renovables");
    const productsMaquinariaAgricola = filterProducts("Maquinaria Agrícola");
    const productsForestacionYJardineria = filterProducts("Forestación y Jardinería");
    const productsAgriculturaDePrecision = filterProducts("Agricultura de Precisión");

    return (
        <>
            <Nav />
            <BarCategoryProducts />

            <div className="container-card-home">
              
            {productsFerreteria.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}


                {productsRopaDeTrabajo.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsTranqueras.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsRespuestosAgricolas.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsEquipamientosVehiculos.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsPulverizacion.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsConstruccion.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsInfraestructura.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsEnergiasRenovables.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsMaquinariaAgricola.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsForestacionYJardineria.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
                {productsAgriculturaDePrecision.map(product => (
                    <div className="container-card-category" key={product.idProduct}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Home;
