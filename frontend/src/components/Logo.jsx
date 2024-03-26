import "../Styles/Logo.css"
import { Link } from "react-router-dom"


export function Logo() {

    return (
        
        <>
        <Link to="/"> <img src="./agrotech-logo.png" alt="logo" className="logo" width={100}/></Link>        

        </>


    )
}