import React, { Component } from 'react';

import './CoinDetail.css';

import CryptocompareService from '../../services/CryptocompareService';
import GiphyService from '../../services/GiphyService';

class CoinDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinInfo: {},
            gifs: [],
            highlightedGif: null
        };
    }

    componentDidMount() {
        const { coinSymbol } = this.props.match.params;
        CryptocompareService.getGeneralCoinInfo(coinSymbol)
          .then( response => {
            const coinInfo = response.data.Data[0].CoinInfo;
            const coinName = response.data.Data[0].CoinInfo.FullName;
            this.setState({ coinInfo: coinInfo });
            return coinName;
          })
          .then( coinName => {
            return GiphyService.searchGIFs(coinName)
          })
          .then( response => {
            this.setState({ gifs: response.data.data, highlightedGif: response.data.data[0] });
          });
    }

    onGifClicked(gif) {
        this.setState({ highlightedGif: gif });
    }

    renderHighlightedGif() {
        if (this.state.highlightedGif) {
            return(
                <img
                    src={this.state.highlightedGif.images.original.url}
                    alt={''}>
                </img>
            );
        }
    }

    renderGifs() {
        const { gifs } = this.state;
        if (gifs.length) {
            return gifs.map( gif => {
                return (
                    <img 
                        className="thumbnail-gif"
                        key={gif.id}
                        src={gif.images.original.url}
                        alt=''
                        onClick={ () => this.onGifClicked(gif)}>
                    </img>
                );
            })
        }
    }

    render() {
        const { coinInfo } = this.state;
        return (
            <div className="detail-page">
                <header>
                    <h1 className="header-name">{coinInfo.FullName}</h1>
                </header>
                <div className="highlighted-gif">
                    {this.renderHighlightedGif()}
                </div>
                <div className="thumbnail-gifs">
                    {this.renderGifs()}
                </div>
            </div>
        );
    }
};

export default CoinDetail;