import '../styles/BarCategoryProducts.css'
import { FaTractor } from "react-icons/fa6"
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiClothes } from "react-icons/gi";
import { GiRanchGate } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import { TbCarCrane } from "react-icons/tb";
import { TfiSpray } from "react-icons/tfi";
import { TbGardenCart } from "react-icons/tb";
import { MdSolarPower } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { GiDrawbridge } from "react-icons/gi";
import { GiLaserPrecision } from "react-icons/gi";




function BarCategoryProducts() {

    return (
        <>
            <div className='container-barra-category-products'>
                <ul className='ul-bar-category'>

                    <li>Ferretería <HiOutlineWrenchScrewdriver /></li>
                    <li>Ropa de trabajo <GiClothes /></li>
                    <li>Tranqueras <GiRanchGate /></li>
                    <li>Repuestos agricolas <FaGears /></li>
                    <li>Equipamiento vehiculos <TbCarCrane /></li>
                    <li>Pulverizacíon <TfiSpray /></li>
                    <li>Construcción <TbGardenCart /></li>
                    <li>Infraestrctura <GiDrawbridge /></li>
                    <li>Energias renovables <MdSolarPower /></li>
                    <li>Maquinarias Agricolas <FaTractor /></li>
                    <li>Forestacion y Jardinería <GiFarmer /> </li>
                    <li>Agricultura de precision <GiLaserPrecision /></li>

                </ul>
            </div>

        </>


    )
}

export default BarCategoryProducts