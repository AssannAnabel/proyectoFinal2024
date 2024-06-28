import React, { useState } from 'react';
import { FaBars, FaTractor, FaGears } from "react-icons/fa6";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiClothes, GiRanchGate, GiDrawbridge, GiLaserPrecision, GiFarmer } from "react-icons/gi";
import { MdSolarPower } from "react-icons/md";
import { TbCarCrane, TbGardenCart } from "react-icons/tb";
import { TfiSpray } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import '../styles/BarCategoryProducts.css';

function BarCategoryProducts() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    function producsCategory(category) {
        navigate(`/products/${category}`);
        setShowMenu(false); // Cerrar el menú después de hacer clic en una categoría
    }

    return (
        <div className='container-barra-category-products'>
            <FaBars className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
            <ul className={`ul-bar-category ${showMenu ? 'active' : ''}`}>
                <li onClick={() => producsCategory("Ferretería")}>Ferretería <HiOutlineWrenchScrewdriver /></li>
                <li onClick={() => producsCategory("Ropa de trabajo")}>Ropa de trabajo <GiClothes /></li>
                <li onClick={() => producsCategory("Tranqueras")}>Tranqueras <GiRanchGate /></li>
                <li onClick={() => producsCategory("Repuestos agricolas")}>Repuestos agrícolas <FaGears /></li>
                <li onClick={() => producsCategory("Equipamiento vehículos")}>Equipamiento vehículos <TbCarCrane /></li>
                <li onClick={() => producsCategory("Pulverizacíon")}>Pulverización <TfiSpray /></li>
                <li onClick={() => producsCategory("Construcción")}>Construcción <TbGardenCart /></li>
                <li onClick={() => producsCategory("Infraestructura")}>Infraestructura <GiDrawbridge /></li>
                <li onClick={() => producsCategory("Energias renovables")}>Energías renovables <MdSolarPower /></li>
                <li onClick={() => producsCategory("Maquinaria agrícola")}>Maquinarias Agrícolas <FaTractor /></li>
                <li onClick={() => producsCategory("Forestación y Jardinería")}>Forestación y Jardinería <GiFarmer /></li>
                <li onClick={() => producsCategory("Agricultura de precision")}>Agricultura de precisión <GiLaserPrecision /></li>
            </ul>
        </div>
    );
}

export default BarCategoryProducts;
