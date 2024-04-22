import React, { useState } from 'react';
import '../styles/Carousel.css';
import farm from './img/farm-gate.jpg';
import field from './img/open-field.jpg';
import field2 from './img/open-field-2.jpg';

function Carousel() {
  const images = [farm, field, field2];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="slider-box">
      <button className="prev" onClick={prevSlide}>‹</button>
      <button className="next" onClick={nextSlide}>›</button>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentIndex ? 'slide active' : 'slide'}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="text">
              <h2>{`Campo ${index + 1}`}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias illo sunt quibusdam, blanditiis dignissimos amet delectus culpa libero ea nihil qui optio soluta veritatis distinctio architecto quam. Quo, alias ratione.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

