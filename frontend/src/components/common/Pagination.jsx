import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currPage, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return(
        <nav>
            <ul className="pagination">
                { pages.map(page => {
                    return (
                        <li key={page} className={page === currPage ? 'page-item active' : 'page-item'}>
                            <a 
                                className="page-link" 
                                onClick={() => onPageChange(page)}>{page}</a>
                        </li>
                    );
                })}     
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;