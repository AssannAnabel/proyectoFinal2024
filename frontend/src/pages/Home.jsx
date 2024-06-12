import React, { useContext } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Card from '../components/Card';
import BarCategoryProducts from '../components/BarCategoryProducts';
import { UserContext } from '../context/UserContext';
import "../styles/Home.css";
import Carousel from "../components/Carousel";


function Home() {
    const { products } = useContext(UserContext);

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
    const productsMaquinariaAgricola = filterProducts("Maquinaria agrícola");
    const productsForestacionYJardineria = filterProducts("Forestación y Jardinería");
    const productsAgriculturaDePrecision = filterProducts("Agricultura de Precisión");

    const data = [
        "/carrousel.jpg",
        "/carrousel1.jpg",
        "/carrousel2.jpg",
        "/carrousel3.jpg",
        "/carrousel4.jpg",
        "/carrousel5.jpg",
        "/carrousel6.jpg"
    ];

    const carousel = [
        "/Bahco-marca-s.jpg",
        "/Bracco-marca-s.jpg",
        "/BTA-Banner-Marca.jpg",
        "/Enertik-marca-s.jpg",
        "/Husqvarna-Banner-Marca.jpg",
        "/Hyundai-marca-s.jpg",
        "/Loyto-marca-s.jpg",
        "/Makita-marca-s.jpg",
        "/Mann-marca-s.jpg",
        "/Arag-marca-s.jpg",
        "/Metabo-Banner-Marca.jpg",
        "/Bahco-marca-s.jpg"
    ];

  
    const carouselVertical=[
        "/casse.png",
        "/dewalt.png",
        "/johndeere.png",
        "/newholland.jpg",
        "/skil.png",
        "/stanley.jpg",
        "/sthill.png",
        "/bosh.png",
        "/ferguson.png",
        "/karcher.png",
        "/lusatoff.jpg",
        "/trimble.png",
        "/viesa.jpg",
        "/vigia.png"
    ]
    

    return (
        <>
            <Nav />
            <div className="container-carousel">
                <Carousel imagenes={data} itemsToShow={1} />
            </div>
            <BarCategoryProducts />

            <div className="container-cards">
                <div className="whith">
                <div className="cards-container">
                    {productsFerreteria.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    
               
                    
                    {/* Agregamos el segundo carrusel aquí */}
                    <div className="container-carousel-second">
                        <Carousel imagenes={carousel} itemsToShow={4} className="img" />
                    </div>

                    {productsRopaDeTrabajo.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsTranqueras.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsRespuestosAgricolas.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsEquipamientosVehiculos.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                     <div className="container-carousel-ter">
                        <Carousel imagenes={carouselVertical} itemsToShow={4} className="img" />
                    </div>
                    {productsPulverizacion.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsConstruccion.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsInfraestructura.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsEnergiasRenovables.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsMaquinariaAgricola.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsForestacionYJardineria.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                    {productsAgriculturaDePrecision.map(product => (
                        <div className="container-card-cat" key={product.idProduct}>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                </div>
                
               
            </div>
            <Footer />
        </>
    );
}

export default Home;
