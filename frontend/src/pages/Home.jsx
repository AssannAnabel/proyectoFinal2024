import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import Card from '../components/Card'
import farm from '/img/farm-gate.jpg'
import field from '/img/open-field.jpg'
import field2 from '/img/open-field-2.jpg'

function Home() {
  return (
    <>

      <div className="container-home">

        <div className="container-header-home">
          <Nav />
          <Link to={"/login"}><FaUser /></Link>
    
        </div>

        <div className="container-body-home">

          <div className="container-carrusel">

            
            <img src={farm} alt="Farm Gates" />
            <img src={field} alt="" />
            <img src={field2} alt="" />
            <img src={field} alt="" />
            <img src={field2} alt="" />

          </div>


          <div className="container-category">

            <ul>
              <li>Tranqueras</li>
              <li>Ropa de Trabajo</li>
              <li>Herramientas manuales</li>
              <li>Articulos rurales</li>
              <li></li>
            </ul>

          </div>
          <div className="container-card-home">
            <Card/>
            <Card/>
            <Card/>

          </div>


        </div>

        <h1>esta es la Home</h1>

        <Footer />


      </div>

    </>



  );
}

export default Home;