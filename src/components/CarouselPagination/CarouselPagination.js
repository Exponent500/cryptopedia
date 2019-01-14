import React, { Component } from 'react';
import classNames from 'classnames';

import './CarouselPagination.css';

class CarouselPagination extends Component {
    componentDidMount() {
        this.props.onPageChange(1);
    }

    onPageChanged(page) {
        this.props.onPageChange(page);
    }

    renderPages() {
        const { currentPage } = this.props;
        const totalPages = Math.ceil(this.props.totalItems / this.props.itemsPerPage);
        let pageElements = [];
        for (let page = 1; page <= totalPages; page++) {
            const pageClass = classNames({
                'page': true,
                'selected': currentPage === page
            });
            pageElements.push(
                <div
                    className={pageClass}
                    key={page}
                    onClick={() => this.onPageChanged(page)}
                ></div>
            );
        }
        return pageElements;
    }

    render() {
        return (
            <div>
                {this.renderPages()}
            </div>  
        );
    }
};

export default CarouselPagination;