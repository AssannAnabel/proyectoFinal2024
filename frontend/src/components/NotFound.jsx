import Footer from './Footer'
import '../styles/NotFound.css'
import found from "/404.jpg"

function NotFound(){

    return(
        <>
          <div className='not-found-container'>
            
            <img src={found} alt="404" className="not-found-image"/>
      
        </div>
        </>
    )
}
export default NotFound