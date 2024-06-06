import React from 'react';
import PropTypes from 'prop-types';
import '../styles/VerticalCarousel.css';

class VerticalCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    componentDidMount() {
        this.startAutoSlide();
    }

    componentWillUnmount() {
        clearInterval(this.autoSlideInterval);
    }

    startAutoSlide = () => {
        this.autoSlideInterval = setInterval(() => {
            this.setState(prevState => ({
                currentIndex: (prevState.currentIndex + 1) % this.props.imagenes.length
            }));
        }, 3000); // Cambia cada 3 segundos
    }

    render() {
        const { imagenes } = this.props;
        const { currentIndex } = this.state;
        
        return (
            <div className="vertical-carousel">
                <img src={imagenes[currentIndex]} alt={`Carousel image ${currentIndex}`} className="carousel-image" />
            </div>
        );
    }
}

VerticalCarousel.propTypes = {
    imagenes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default VerticalCarousel;
