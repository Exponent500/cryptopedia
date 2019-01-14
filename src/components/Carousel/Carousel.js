import React, { Component } from 'react';

import './Carousel.css';

import CarouselImage from '../CarouselImage/CarouselImage';
import CarouselArrow from '../CarouselArrow/CarouselArrow';
import CarouselPagination from '../CarouselPagination/CarouselPagination';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 3,
            currentPage: null,
            currentItems: [],
            translateValue: 0
        };
    }

    onGoBackOnePage() {
        const { translateValue, currentPage } = this.state;
        if (currentPage === 1) return;
        const newTranslateValue = translateValue + this.carouselWindowWidth();
        const newPage = currentPage - 1;
        this.setState({ currentPage: newPage, translateValue: newTranslateValue });
    }

    onGoForwardOnePage() {
        const { translateValue, currentPage, itemsPerPage } = this.state;
        if (currentPage * itemsPerPage >= this.props.items.length) return;
        const newTranslateValue = translateValue - this.carouselWindowWidth();
        const newPage = currentPage + 1;
        this.setState({ currentPage: newPage, translateValue: newTranslateValue });
    }

    onPageChange(page) {
        const { translateValue, currentPage } = this.state;
        let newTranslateValue;

        if (page === currentPage) return;

        if(page === 1) {
            newTranslateValue = 0;
            this.setState({ currentPage: page, translateValue: newTranslateValue });
            return;
        }

        if (page < currentPage) {
            newTranslateValue = (translateValue + this.carouselWindowWidth()) * (currentPage - page);
        }

        if (page > currentPage) {
            newTranslateValue = (translateValue - this.carouselWindowWidth()) * (page - currentPage);
        }
        this.setState( { currentPage: page, translateValue: newTranslateValue });
    }

    carouselWindowWidth() {
        return document.querySelector('.carousel-item').clientWidth * this.state.itemsPerPage
     }

    renderCarouselItems() {
        const { items } = this.props;
        if (items.length) {
            return items.map( item => {
                const miningAlgorithmMessage = item.CoinInfo.ProofType === 'N/A' ? 'does not use a' : `uses the ${item.CoinInfo.ProofType}`;
                const blockRewardMessage = item.CoinInfo.BlockReward === 0 ? 'no Block Reward': `a Block Reward of ${item.CoinInfo.BlockReward}`;
                const coinDescription = `${item.CoinInfo.FullName} is a crypto asset that ${miningAlgorithmMessage}
                                        mining algorithm and has ${blockRewardMessage}.`;
                return (
                    <div
                        key={item.CoinInfo.Id}
                        className="carousel-item">
                            <CarouselImage
                                url={item.CoinInfo.ImageUrl}
                                route={item.CoinInfo.Internal}
                                />
                        <p className="carousel-item-name">{item.CoinInfo.FullName}</p>
                        <p className="carousel-item-description">{coinDescription}</p>
                    </div>
                )
            })
        }
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const disableLeftArrow = currentPage === 1 ? true : false;
        const disableRightArrow = currentPage * itemsPerPage >= this.props.items.length ? true : false;

        return (
            <div className="carousel-container">
                <div className="carousel">
                    <CarouselArrow
                        className="carousel-arrow"
                        direction="left"
                        clickFunction={ () => this.onGoBackOnePage() }
                        icon="&#8249;"
                        disabled={disableLeftArrow} />
                    <div 
                        className="carousel-items-wrapper"
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                          }}>
                        {this.renderCarouselItems()}
                    </div>
                    <CarouselArrow
                        className="carousel-arrow"
                        direction="right"
                        clickFunction={ () => this.onGoForwardOnePage() }
                        icon="&#9654;"
                        disabled={disableRightArrow} />
                </div>
                <div className="carousel-pagination">
                    <CarouselPagination
                        totalItems={this.props.items.length}
                        itemsPerPage={this.state.itemsPerPage}
                        currentPage={this.state.currentPage}
                        onPageChange={ (page) => this.onPageChange(page) }/>
                </div>
            </div>
        );
    }
};

export default Carousel;