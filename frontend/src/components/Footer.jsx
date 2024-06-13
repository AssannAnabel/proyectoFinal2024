import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot,  FaPhone  } from "react-icons/fa6";


import '../styles/Footer.css'; 

function Footer() {
  return (
    <div className="footer-container">
      
      <div className="footer-content">
        <div className='social-icons'>
          <FaInstagram /> 
          <FaFacebook />
          <FaWhatsapp />
        </div>
        <div className="contact-info">
        <FaPhone />
        <p className='p-footer'>0800-888-888-1</p>
        </div>
        <div className='contact-info'>
          <HiOutlineMail />
          <p className='p-footer'>somos.agrotech@gmail.com</p>
        </div>
        <div className='location-info'>
          <FaLocationDot />
          <p className='p-footer'>Av. Libertad. n° 1221 - Benito Juárez</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
