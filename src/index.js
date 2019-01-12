import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import HomePage from './components/HomePage/HomePage';
import CoinDetail from './components/CoinDetail/CoinDetail';
import Footer from './components/Footer/Footer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div className="container">
        <div className="content">
            <BrowserRouter>
                <Switch>
                    <Route path="/detail/:coinSymbol" component={CoinDetail}></Route>
                    <Route path="/" component={HomePage}></Route>
                </Switch>
            </BrowserRouter>
        </div>
        <div className="footer">
            <Footer></Footer>
        </div>
    </div>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
