import React from 'react';

import './TopHeader.css';

const TopHeader = () => {
    return (
        <header className="top-header">
            <h1 className="top-header-title">Cryptopedia</h1>
            <p className="top-header-description">Your one-stop shop for information on the most popular crypto assets.</p>
        </header>
    )
};

export default TopHeader;