import Footer from './Footer'
import '../styles/NotFound.css'

function NotFound(){

    return(
        <>
          <main className='not-found-container'>
            <h1 className='not-found-title'>Página no Encontrada</h1>
            <img src="./404-notfound.png" alt="404" className="not-found-image" />
        </main>
        <Footer/>
        </>
    )
}
export default NotFound