import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import ListOfBooks from "../ListOfBooks/ListOfBooks";
import Menu from "../Menu/Menu";

const SavedBooks = () => {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const [apiError, setApiError] = useState('');
  const [allDeleted, setAllDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setListOfBooks([]);
    const fetch = async () => {
      const response = await API.getBooks().catch((error) => {
        setNoBooksFound(false);
        setIsLoading(false);
        setApiError(`Api error: ${error?.message}`);
      });
      setTimeout(() => {
        setIsLoading(false);
        setListOfBooks(response?.data);
        setNoBooksFound((!response?.data || response?.data?.length === 0) ? true : '');
      }, 200);
    };
    fetch();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = listOfBooks?.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderedResults = (currentBooks?.length > 0) ? currentBooks?.map((book) => {
    return (
        <ListOfBooks book={book} key={book.id} saved={true}
          savedPage={{setListOfBooks, listOfBooks, setAllDeleted, currentBooks, setCurrentPage, currentPage}}>
        </ListOfBooks>
    );
  }) : '';

  return (
    <div className="ui form container">
      <h1 className="field-label">Saved Books</h1>
      {isLoading ? <div className="ui items container"><Loading/></div> : '' }
      {(noBooksFound && !allDeleted) ?
          <div className="ui items container no-data-label">
            <a className="no-data-label" href="/">No Saved Books, Click here to search</a>
          </div>
          : ''
      }
      {allDeleted ?
          <div className="ui items container no-data-label test">
            <a className="no-data-label" href="/">All saved books deleted, Click here to search</a>
          </div>
          : ''
      }
      {apiError ?
          <div className="ui items container no-data-label"><p>{apiError}</p></div>
          : ''
      }
      {currentBooks?.length > 0 ?
        <>
          <div>Page
              <Pagination
                  booksPerPage={booksPerPage}
                  totalBooks={listOfBooks?.length}
                  paginate={paginate}
                  currentPage={currentPage}
              />
          </div>
          <div className="ui celled list">{renderedResults}</div>
        </>
        : ''
      }
    </div>
  );
};
  
export default SavedBooks;