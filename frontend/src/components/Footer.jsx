import { CiInstagram } from "react-icons/ci";
import { AiOutlineFacebook } from "react-icons/ai";
import { LiaWhatsappSquare } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import '../styles/Footer.css'; // Importar el archivo CSS donde escribiremos los estilos

function Footer() {
  return (
    <footer>
      <div className='social-icons'>
        <CiInstagram />
        <AiOutlineFacebook />
        <LiaWhatsappSquare />
      </div>
      <div className='contact-info'>
        <HiOutlineMail />
        <p className='p-footer'>agrotech@gmail.com | Benito Juarez</p>
      </div>
    </footer>
  );
}

export default Footer;