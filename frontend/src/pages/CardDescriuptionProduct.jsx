import tranquera from '/img/tranquera.webp'
import '../styles/CardDescriptionProduct.css'
import Nav from '../components/Nav'


function CardDescriptionProduct({product}) {

    return (
        <>
        <Nav/>
        
            <div className="container-card-description-product">
                <h2>Nombre del Producto</h2>

                <div className='container-img-price'>                   
                        <div className="container-img">
                            <img src={product.images} width={284} height={284} alt="" />

                        </div>
                        <div>
                            <div className='container-precio'>
                                <span>$ {product.price}</span>
                                <span>{product.amount}</span>
                            </div>
                            <div className='container-button'>
                                <button>Añadir a carrito</button>
                                <div className='container-quantity-product'>
                              <button>-</button> <p>0</p><button>+</button>
                                </div>
                            </div>
                            <div>
                                <span>Precio final Iva incluido</span>
                                <span>Facil de  pago</span>
                                <span>Envio a todo el pais</span>
                                <span>Para mas informacion info@agrotech.com</span>
                            </div>
                        </div>                     
                </div>
                <h3>Descripcion del Producto</h3>
                        <div>
                            <p>{product.description}</p>
                        </div>

            </div>
        </>
    )
}
export default CardDescriptionProduct


