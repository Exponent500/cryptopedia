import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './PageNavigation.css';

class PageNavigation extends Component {
    renderNavigation() {
        const { location: { pathname } } = this.props;
        const paths = pathname.split('/');
        switch (pathname) {
            case '/':
                return;   
            default:
                return (
                    <div>
                        <Link 
                            className='page-nav-link-home'
                            to={'/'}>Home
                        </Link>
                        /{paths[2]}
                    </div>
                );    
        }
    }

    render() {
        return (
            <div>
                <div className="page-nav-links">
                    {this.renderNavigation()}
                </div>
                {this.props.children}        
            </div>
        );
    }
};

export default withRouter(PageNavigation);