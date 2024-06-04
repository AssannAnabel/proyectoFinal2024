import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/About.css'; 

function About() {
  return (
    <>
      <Nav />
      <div className="main-content">
        <div className="about-container">
          <p>
            Agrotech es un proyecto de plataforma de comercio electrónico diseñado para el sector agropecuario. Se ha desarrollado utilizando tecnologías modernas como React para el frontend, NestJS para el backend y MySQL como base de datos.
            El objetivo principal de Agrotech es facilitar a los usuarios la compra de productos agropecuarios de manera eficiente y conveniente, así como brindar a los administradores herramientas para gestionar el inventario y mantener una comunicación efectiva con los clientes.
            Realizamos este proyecto basándonos en un comercio con un nombre de fantasía, nuestra idea es poder reutilizar este proyecto y adaptarlo a cualquier otro rubro.
          </p>
          
          <div className="line-separator"></div>
          <p>INTEGRANTES</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
