import React from 'react';
import { Link } from 'react-router-dom';

import './CarouselImage.css';

const CarouselImage = ({ url, route }) => {
    return (
        <div className="carousel-image">
            <Link to={`/detail/${route}`}>
                <img src={url} alt="test"></img>
            </Link>
        </div>
    );
};

export default CarouselImage;