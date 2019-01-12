import axios from 'axios';

const API_KEY = 'YzYrnQRsFDui0gPLeec0ZnlwvEuX0YM1';
const BASE_URL = 'http://api.giphy.com/v1/';
const SEARCH_GIF_URL = `${BASE_URL}gifs/search`;

const GiphyService = {
    searchGIFs: function(searchTerm) {
        return axios.get(`${SEARCH_GIF_URL}?q=${searchTerm}&api_key=${API_KEY}&limit=5`);
    }
};

export default GiphyService;