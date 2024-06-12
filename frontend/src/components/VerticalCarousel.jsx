import React, { useEffect, useState } from 'react';
import '../styles/VerticalCarousel.css';

function VerticalCarousel({ imagenes }) {
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes.length;

  if (!Array.isArray(imagenes) || cantidad === 0) return null;

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % cantidad);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + cantidad) % cantidad);
  };

  useEffect(() => {
    const intervalo = setInterval(siguienteImagen, 3000); // Cambia cada 3 segundos
    return () => clearInterval(intervalo);
  }, [imagenActual, cantidad]);

  return (
    <div className="vertical-carousel-container">
      <div className="upArrow" onClick={anteriorImagen}>&#10094;</div>
      <div className="downArrow" onClick={siguienteImagen}>&#10095;</div>

      <div className="vertical-carousel-wrapper" style={{ transform: `translateY(-${imagenActual * (100 / cantidad)}%)` }}>

        {imagenes.map((imagen, index) => (
          <div key={index} className="vertical-carousel-slide">
            <img src={imagen} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerticalCarousel;
