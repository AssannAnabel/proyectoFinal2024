import React, { useEffect, useRef, useState } from 'react';

import '../styles/Carousel.css';


function Carousel({ imagenes }) {
  // Variables y Estados
  // Variables y Estados
  const [imagenActual, setImagenActual] = React.useState(0);
  const cantidad = imagenes?.length;

  // Return prematuro para evitar errores
  if (!Array.isArray(imagenes) || cantidad === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  return (
    <div className={Carousel.container}>
      <div className='leftArrow' onClick={anteriorImagen}>&#10092;</div>
      <div className='rightArrow' onClick={siguienteImagen}>&#10093;</div>

      {imagenes.map((imagen, index) => {
        return (
          <div key={index} className={imagenActual === index ? `${Carousel.slide} ${Carousel.active}` : Carousel.slide}>
            {imagenActual === index && (
              <img key={index} src={imagen} alt="imagen" style={{ width: '100%' }} />
            )}
          </div>
        );
      })}


    </div>
  );
}

export default Carousel;
