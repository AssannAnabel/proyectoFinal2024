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
import { useNavigate } from 'react-router-dom';




function BarCategoryProducts() {
    const navigate = useNavigate();


    function producsCategory(category) {
      
        navigate(`/products/${category}`)
    }

    return (
        <>
            <div className='container-barra-category-products'>
                <ul className='ul-bar-category'>

                    <li onClick={()=>producsCategory("Ferretería")}>Ferretería  <HiOutlineWrenchScrewdriver /></li>
                    <li onClick={()=>producsCategory("Ropa de trabajo")}>Ropa de trabajo <GiClothes  /></li>
                    <li onClick={()=>producsCategory("Tranqueras")}>Tranqueras <GiRanchGate /></li>
                    <li onClick={()=>producsCategory("Repuestos agricolas")}>Repuestos agricolas <FaGears  /></li>
                    <li onClick={()=>producsCategory("Equipamiento vehículos")}>Equipamiento vehiculos <TbCarCrane /></li>
                    <li onClick={()=>producsCategory("Pulverizacíon")}>Pulverizacíon <TfiSpray /></li>
                    <li onClick={()=>producsCategory("Construcción")}>Construcción <TbGardenCart /></li>
                    <li onClick={()=>producsCategory("Infraestructura")}>Infraestrctura <GiDrawbridge /></li>
                    <li onClick={()=>producsCategory("Energias renovables")}>Energias renovables <MdSolarPower /></li>
                    <li onClick={()=>producsCategory("Maquinaria agrícola")}>Maquinarias Agricolas <FaTractor /></li>
                    <li onClick={()=>producsCategory("Forestación y Jardinería")}>Forestacion y Jardinería <GiFarmer /> </li>
                    <li onClick={()=>producsCategory("Agricultura de precision")}>Agricultura de precision <GiLaserPrecision /></li>

                </ul>
            </div>

        </>


    )
}

export default BarCategoryProducts