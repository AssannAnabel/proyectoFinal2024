import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "../components/Footer";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import Card from '../components/Card'
import BarCategoryProducts from '../components/BarCategoryProducts'
import farm from '/img/farm-gate.jpg'
import field from '/img/open-field.jpg'
import field2 from '/img/open-field-2.jpg'

function Home() {
  return (
    <>  
    <Nav />       
   

        {/*   <div className="container-carrusel">

            
            <img src={farm} alt="Farm Gates" />
            <img src={field} alt="" />
            <img src={field2} alt="" />
            <img src={field} alt="" />
            <img src={field2} alt="" />

          </div> */}


          

            <BarCategoryProducts/>
             

          
          <div className="container-card-home">
            <Card/>
            <Card/>
            <Card/>
            <Card/>

          </div>


       

        <h1>esta es la Home</h1>

        <Footer />


     

    </>



  );
}

export default Home;