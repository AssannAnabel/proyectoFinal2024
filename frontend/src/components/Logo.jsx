import "../styles/Logo.css"
import { Link } from "react-router-dom"
import logo from "/agrotech.png"


export function Logo() {

    return (

        <>
            <Link to="/"> <img src={logo} alt="logo" className="logo" width={100} /></Link>
        </>
    )
}