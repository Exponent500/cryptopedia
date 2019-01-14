import React, { Component } from 'react';

import Carousel from '../Carousel/Carousel';
import CryptocompareService from '../../services/CryptocompareService';

import './HomePage.css';

const BASE_IMAGE_URL = 'https://www.cryptocompare.com';
const COIN_SYMBOLS ='BTC,ETH,XRP,LTC,TRX,NEO,WAVES,DOGE,DASH';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: []
    };
  }

  componentDidMount() {
    CryptocompareService.getGeneralCoinInfo(COIN_SYMBOLS)
      .then( response => {
        let coinData = response.data.Data;
        coinData = coinData.map(data => {
          data.CoinInfo.ImageUrl = `${BASE_IMAGE_URL}${data.CoinInfo.ImageUrl}`;
          return data;
        })
        this.setState({ coinData: coinData });
      })
  }

  render() {
    const { coinData } = this.state;
    if (!coinData.length) {
      return <div />
    }
    return (
      <div className="home-page">
          <section className="carousel-container">
            <Carousel items={coinData}></Carousel>
          </section>
      </div>
    );
  }
}

export default HomePage;
