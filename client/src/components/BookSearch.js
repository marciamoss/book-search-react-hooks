import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookSearch.css";
import Pagination from "./Pagination";
import Loading from "./Loading";
import BooksList from "./BooksList";
import Menu from "./Menu";


const BookSearch = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [debouncedBookName, setDebouncedBookName] = useState(bookName);
  const [booksList, setBooksList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    setNoBooksFound(!bookName ? false : '');
    setIsLoading(!bookName ? false : '');
    setApiError('');
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
        const response = await axios.get(BASEURL + debouncedBookName + APIKEY).catch((error) => {
            setNoBooksFound(false);
            setIsLoading(false);
            setApiError(`Api error: ${error?.message}`);
        });
        setBooksList(response?.data?.items);
        setNoBooksFound(!response?.data?.items ? true : '');
        setIsLoading(false);
    };
    if (debouncedBookName) {
        setIsLoading(true);
        setBooksList([]);
        search();
    }
  }, [debouncedBookName]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksList?.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderedResults = (currentBooks?.length > 0 && bookName) ? currentBooks?.map((book) => {
    return (
        <BooksList book={book} key={book.id} setSearchBooksList={setBooksList} searchBooksList={booksList}></BooksList>
    );
  }) : '';

  return (
    <div>        
      <Menu type={'search'}></Menu>
      <div className="ui form container">
            <div className="field">
                <label className="field-label">Search Books</label>
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
                <div>Page
                    <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={booksList?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                : ''
            }
      </div>
      {isLoading ? <div className="ui items container"><Loading/></div> : '' }
      {noBooksFound ?
          <div className="ui items container no-data-label"><p>No Books Found</p></div>
          : ''
      }
      {apiError ?
          <div className="ui items container no-data-label"><p>{apiError}</p></div>
          : ''
      }
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default BookSearch;

