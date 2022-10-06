import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookSearch.css";
import Pagination from "./Pagination";

const BookSearch = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [debouncedBookName, setDebouncedBookName] = useState(bookName);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    let bookNAuthor=bookName ? (bookName).split(" ").join("+")+(author).split(" ").join("+") : '';
    const timerId = setTimeout(() => {
        setDebouncedBookName(bookNAuthor);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [bookName, author]);

  useEffect(() => {
    const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=:";
    const APIKEY = "&key=AIzaSyA5c5WsLSg30PL4WJkx92HtHn8JitM_DEo&startIndex=0&maxResults=40";
    const search = async () => {
        const { data } = await axios.get(BASEURL + debouncedBookName + APIKEY).catch((error) => console.log("fetch books errored", error));
        setResults(data.items);
    };
    if (debouncedBookName) {
        search();
    }
  }, [debouncedBookName]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = results.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderedResults = (currentBooks?.length > 0 && bookName) ? currentBooks.map((result) => {
    return (
        <div className="ui items container" key={result.id}>
            <div className="item">
                <div className="ui small image">
                    <img src={result.volumeInfo?.imageLinks?.smallThumbnail} alt=""/>
                </div>
                <div className="content">
                    <div className="header">{result.volumeInfo.title} {result.volumeInfo.authors ? `by ${result.volumeInfo.authors}` : ''}</div>
                    <div className="meta">
                        <span >
                            <a
                            className="ui button"
                            href={result.volumeInfo.infoLink}
                            target="_blank"
                            rel="noreferrer"
                            >
                            Buy
                            </a>
                        </span>
                    </div>
                    <div className="description">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
  }) : <div className="ui items container no-data-label"><p>No Results to Display</p></div>;

  return (
    <div>
        <div className="ui form container">
            <div className="field">
                <label className="field-label">Google Books Search</label>
                <input
                value={bookName}
                placeholder="Book Title (Required)"
                onChange={(e) => setBookName(e.target.value)}
                className="input"
                />
            </div>
            <div className="field">
                <input
                    value={author}
                    placeholder="Author (Optional)"
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input"
                />
            </div>
            {(currentBooks?.length > 0 && bookName) ?
                <div>Go to page
                    <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={results?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                : ''
            }
        </div>
        <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default BookSearch;

