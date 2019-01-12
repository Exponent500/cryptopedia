import axios from 'axios';

const BASE_URL = 'https://min-api.cryptocompare.com/data/'
const GET_GENERAL_COIN_INFO_URL = `${BASE_URL}coin/generalinfo`;

const CryptocompareService = {
    getGeneralCoinInfo: function(fromSymbols, toSymbol = 'USD') {
        const URL = `${GET_GENERAL_COIN_INFO_URL}?fsyms=${fromSymbols}&tsym=${toSymbol}`;
        return axios.get(URL);
    }
}

export default CryptocompareService;