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
  

  return (
    <>
      <div>
        <Nav />
      </div>

      <div>
        <BarCategoryProducts />
      </div>

     

     
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;