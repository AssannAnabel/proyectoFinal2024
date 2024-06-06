import React, { useEffect, useState } from 'react';
import '../styles/Carousel.css';

function Carousel({ imagenes, itemsToShow = 1 }) {
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes?.length;

  if (!Array.isArray(imagenes) || cantidad === 0) return null;

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + itemsToShow) % cantidad);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - itemsToShow + cantidad) % cantidad);
  };

  useEffect(() => {
    const intervalo = setInterval(siguienteImagen, 3000); // Cambia cada 3 segundos
    return () => clearInterval(intervalo);
  }, [imagenActual, cantidad, itemsToShow]);

  return (
    <div className="carousel-container">
      <div className="leftArrow" onClick={anteriorImagen}>&#10092;</div>
      <div className="rightArrow" onClick={siguienteImagen}>&#10093;</div>

      <div className="carousel-wrapper" style={{ transform: `translateX(-${(imagenActual / itemsToShow) * 100}%)` }}>
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ flex: `0 0 ${100 / itemsToShow}%` }}
          >
            <img src={imagen} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
