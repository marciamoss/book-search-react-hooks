import React from 'react';
import './Pagination.css';

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="ui spacing compact borderless menu">
        {pageNumbers.map(number => {
            return (
                <a key={number} onClick={(event) => {event.preventDefault();return paginate(number);}} href='!#' className={`item ${currentPage===number ? "active-page" : ""}`}>{number}</a>
            );
        }
        )}
    </div>
  );
};

export default Pagination;