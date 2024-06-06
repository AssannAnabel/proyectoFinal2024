import React, { useEffect, useState } from 'react';
import '../styles/Carousel.css';

function Carousel({ imagenes, itemsToShow = 1 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = imagenes.length;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex + itemsToShow > totalItems) {
        return 0;
      }
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        return totalItems - itemsToShow;
      }
      return newIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="leftArrow" onClick={prevImage}>&#10092;</div>
      <div className="rightArrow" onClick={nextImage}>&#10093;</div>

      <div className="carousel-wrapper" style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}>
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
