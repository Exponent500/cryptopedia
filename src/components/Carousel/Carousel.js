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
        };

        /* POTENTIAL NEW IMPLEMENTATION TO SUPPORT SLIDE EFFECT */
        // this.state = {
        //     itemsPerPage: 3,
        //     currentPage: null,
        //     currentItems: [],
        //     translateValue: 0
        // };
    }

    onGoBackOnePage() {
        let { itemsPerPage, currentPage } = this.state;
        if (currentPage === 1) return;
        currentPage = currentPage - 1;
        const offset = (currentPage - 1) * itemsPerPage;
        const currentItems = this.props.items.slice(offset, offset + itemsPerPage);
        this.setState( { currentPage, currentItems })
    }

    onGoForwardOnePage() {
        let { itemsPerPage, currentPage } = this.state;
        if (currentPage * itemsPerPage >= this.props.items.length) return;
        currentPage = currentPage + 1;
        const offset = (currentPage - 1) * itemsPerPage;
        const currentItems = this.props.items.slice(offset, offset + itemsPerPage);
        this.setState( { currentPage, currentItems });
    }

    onPageChange(page) {
        const { itemsPerPage } = this.state;
        const offset = (page - 1) * itemsPerPage;
        const currentItems = this.props.items.slice(offset, offset + itemsPerPage);
        this.setState( { currentPage: page, currentItems });
    }

    /* POTENTIAL NEW IMPLEMENTATION TO SUPPORT SLIDE EFFECT */
    // onPageChange(page) {
    //     let newTranslateValue;

    //     if( page === 1) {
    //         newTranslateValue = this.slideWidth() * 0;
    //         this.setState({ currentPage: page, translateValue: newTranslateValue });
    //         return;
    //     }
    //     newTranslateValue = -(this.slideWidth() * (page - 1.4) );
    //     // this.setState(prevState => ({
    //     //     currentIndex: prevState.currentIndex + 1,
    //     //     translateValue: prevState.translateValue + -(this.slideWidth())
    //     //   }));
    //     this.setState( { currentPage: page, translateValue: newTranslateValue });
    // }

    // slideWidth = () => {
    //     return document.querySelector('.carousel-item').clientWidth * 4
    //  }

    renderCarouselItems() {
        const { items } = this.props;
        const { currentItems } = this.state; 
        if (items.length) {
            return currentItems.map( item => {
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

    /* POTENTIAL NEW IMPLEMENTATION TO SUPPORT SLIDE EFFECT */
    // renderCarouselItems() {
    //     const { items } = this.props;
    //     if (items.length) {
    //         return items.map( item => {
    //             const miningAlgorithmMessage = item.CoinInfo.ProofType === 'N/A' ? 'does not use a' : `uses the ${item.CoinInfo.ProofType}`;
    //             const blockRewardMessage = item.CoinInfo.BlockReward === 0 ? 'no Block Reward': `a Block Reward of ${item.CoinInfo.BlockReward}`;
    //             const coinDescription = `${item.CoinInfo.FullName} is a crypto asset that ${miningAlgorithmMessage}
    //                                     mining algorithm and has ${blockRewardMessage}.`;
    //             return (
    //                 <div
    //                     key={item.CoinInfo.Id}
    //                     className="carousel-item">
    //                         <CarouselImage
    //                             url={item.CoinInfo.ImageUrl}
    //                             route={item.CoinInfo.Internal}
    //                             />
    //                     <p className="carousel-item-name">{item.CoinInfo.FullName}</p>
    //                     <p className="carousel-item-description">{coinDescription}</p>
    //                 </div>
    //             )
    //         })
    //     }
    // }

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const disableLeftArrow = currentPage === 1 ? true : false;
        const disableRightArrow = currentPage * itemsPerPage >= this.props.items.length ? true : false;
        console.log(this.state.translateValue);

        return (
            <div className="carousel-container">
                <div className="carousel">
                    <CarouselArrow
                        className="carousel-arrow"
                        direction="left"
                        clickFunction={ () => this.onGoBackOnePage() }
                        icon="&#8249;"
                        disabled={disableLeftArrow} />
                    {/* POTENTIAL IMPLEMENTATION OF SLIDE EFFECT */}
                    {/* <div 
                        className="carousel-items-wrapper"
                        style={{
                            transform: `translateX(${this.state.translateValue}px)`,
                            transition: 'transform ease-out 0.45s'
                          }}>
                        {this.renderCarouselItems()}
                    </div> */}
                    <div className="carousel-items-wrapper">
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