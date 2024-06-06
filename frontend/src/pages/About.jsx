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
          <div className="text-and-images">
            <div className="text-container">
              <h1>Bienvenidos a Agrotech</h1>
              <p>
                En Agrotech, nos dedicamos a revolucionar el mundo agrícola a través de la tecnología. Nuestra misión es proporcionar a los agricultores y profesionales del sector agroindustrial las herramientas y equipos necesarios para optimizar sus operaciones y mejorar su productividad. Con una amplia gama de productos que van desde maquinaria agrícola, herramientas y repuestos, hasta soluciones de infraestructura y energías renovables, nos esforzamos por ser el socio de confianza para todas sus necesidades agrícolas.
              </p>
              
              <h2>Nuestra Historia</h2>
              <p>
                Fundada con el objetivo de modernizar la agricultura, Agrotech combina años de experiencia en el campo con innovaciones tecnológicas de vanguardia. Entendemos los desafíos únicos que enfrentan los agricultores hoy en día y estamos comprometidos a ofrecer productos y servicios que ayuden a superar estos obstáculos. Nuestra pasión por la agricultura y la tecnología nos impulsa a seguir innovando y mejorando continuamente nuestra oferta.
              </p>
              
              <h2>Nuestro Compromiso</h2>
              <p>
                En Agrotech, la satisfacción del cliente es nuestra máxima prioridad. Nos esforzamos por proporcionar un servicio excepcional y productos de alta calidad que cumplan con las expectativas de nuestros clientes. A través de nuestra plataforma en línea, ofrecemos una experiencia de compra sencilla y eficiente, permitiendo a nuestros clientes explorar y adquirir productos desde la comodidad de su hogar o lugar de trabajo.
              </p>
              
              <h2>Nuestro Trabajo</h2>
              <p>
                Desarrollamos esta plataforma con el objetivo de facilitar el acceso a productos agrícolas de alta calidad. Cada usuario puede registrarse, explorar nuestras categorías de productos, agregar artículos a su carrito y realizar compras de manera segura. Hemos integrado un sistema robusto de gestión de usuarios y carritos de compra que asegura que cada cliente pueda acceder a su historial de compras y gestionar sus pedidos de manera eficiente. Nuestro sistema de facturación está diseñado para ser transparente y fácil de usar, garantizando una experiencia de compra sin complicaciones.
              </p>
              
              <h2>Nuestro Equipo</h2>
              <p>
                Contamos con un equipo dedicado de profesionales con experiencia en agricultura, tecnología y atención al cliente. Cada miembro de nuestro equipo comparte la visión de hacer de la agricultura una industria más eficiente y sostenible a través de la innovación tecnológica. Estamos aquí para apoyar a nuestros clientes en cada paso del camino, ofreciendo asesoramiento experto y asistencia técnica cuando sea necesario. Como desarrolladores realizamos este proyecto basándonos en un comercio con un nombre de fantasía, nuestra idea es poder reutilizarlo y adaptarlo a cualquier otro rubro.
              </p>
            </div>

            <div className="vertical-line"></div>

            <div className="images-container">
              <img src="./emiliano.png" alt="emiliano" className="card-emiliano" />
              <img src="./fabricio.png" alt="fabricio" className="card-fabricio" />
              <img src="./anabel.png" alt="anabel" className="card-anabel" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
