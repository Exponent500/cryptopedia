import React from 'react';
import classNames from 'classnames';

import './CarouselArrow.css';

const CarouselArrow = ({ direction, clickFunction, disabled }) => {
    const arrowClass = classNames({
        'carousel-arrow': true,
        'disabled': disabled,
        'left': direction === 'left',
        'right': direction === 'right'
    });
    return (
        <div
            className={arrowClass}
            onClick={clickFunction}>
        </div>
    )
};

export default CarouselArrow;