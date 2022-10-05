import React from 'react';
import './Pagination.css';

const Pagination = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="ui compact borderless menu">
        {pageNumbers.map(number => {
            return (
                <a key={number} onClick={() => paginate(number)} href='!#' className={`item ${currentPage===number ? "active" : ""}`}>{number}</a>
            );
        }
        )}
    </div>
  );
};

export default Pagination;