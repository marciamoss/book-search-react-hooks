import React, { useState } from "react";
import API from "../../utils/API";
import createBookObject from "../../utils/createBookObject";
import DeleteBook from "../DeleteBook/DeleteBook";
import ErrorModal from "../ErrorModal/ErrorModal";
import SaveConfirmation from "../SaveConfirmation/SaveConfirmation";

const ListOfBooks = ({book, saved, savedPage, searchPage}) => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({type: '', error: ''});
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const bookObject = saved ? book : createBookObject(book);

  const saveBook = async (book, searchPage) => {
    setShowError(false);
    setErrorMessage({type: '', error: ''});
    if (book.title && book.id) {
      const fetchBooks = await API.getBooks();
      const previouslySaved = fetchBooks?.data?.filter((b => b.id === book.id)) || [];
      if(previouslySaved.length === 0) {
        await API.saveBook(book)
        .then(() => {
          setShowSaveConfirm(true);
          setTimeout(() => {
            setShowSaveConfirm(false);
            searchPage.setListOfBooks(searchPage.listOfBooks.filter((b => b.id !== book.id)));
          }, 1500);
        })
        .catch(error => {setShowError(true);setErrorMessage({type: "Save failed, Please try again", error: error?.message});});
      } else {
        setTimeout(() => {
          searchPage.setListOfBooks(searchPage.listOfBooks.filter((b => b.id !== book.id)));
        }, 2000);
        setShowError(true);setErrorMessage({error: `${book.title} Was Saved Previously`});
      }
    }
  }
    return (
      <div className="ui items container">
          <div className="item">
              <div className="ui tiny image">
                  <img src={bookObject.bookimg} alt="NoImageAvailable"/>
              </div>
              <div className="content">
                  <div className="header">{bookObject.title} {bookObject.authors}</div>
                  <div className="meta">
                      <span>
                          <a
                          className="ui button"
                          href={bookObject.booklink}
                          target="_blank"
                          rel="noreferrer"
                          >
                          Buy
                          </a>
                      </span>
                      { !saved ? 
                        <span>
                            <button className="ui primary button" onClick={() => saveBook(bookObject, searchPage)}>
                            Save
                            </button>
                        </span>
                        : 
                        <span>
                            <button className="ui primary button" onClick={() => setShowModal(true)}>
                            Delete
                            </button>
                            {showModal ? 
                              <DeleteBook className="ui celled list" setShowModal={setShowModal} title={bookObject.title} id={bookObject._id} savedPage={savedPage}/>
                            : ''}
                        </span>
                      }
                  </div>
                  <div className="description">
                      <p>{bookObject.synopsis}</p>
                  </div>
              </div>
              {showError ? <ErrorModal setShowError={setShowError} errorMessage={errorMessage}></ErrorModal> : ''}
              {showSaveConfirm ? <SaveConfirmation title={bookObject.title}></SaveConfirmation> : ''}
          </div>
      </div>
    );
};

export default ListOfBooks;