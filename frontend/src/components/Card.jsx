
import { GiShoppingCart } from "react-icons/gi";
import '../styles/Card.css'
import tranquera from '/img/tranquera.webp'

function Card() {

    return (

        <>
            <div className="container-card">
                <figure>
                    <img src={tranquera} width={284} height={284} alt="" />
                </figure>

                <div className="contenido-card">
                    <h2>Tranquera</h2>          

                    <p>Tranquera en una sola hoja de Eucaliptus misionero, seleccionada y cepillada con doble refuerzo y par de bisagras super reforzadas (corresponde a la foto de la portada).
                        (1" x 4") 1,20 mts. x 3,00 mts.</p>               

                
                    <h3>Disponible 3</h3>
                    <h2>$120.745</h2>
                    <button>Agregar carrito</button>

                </div>
                <GiShoppingCart />
            </div>
        </>
    )
}

export default Card