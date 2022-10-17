import React,{ useState } from "react";
import API from "../../utils/API";
import DeleteBook from "../DeleteBook/DeleteBook";

const saveBook = async (book, searchPage) => {
  if (book.title && book.id) {
    await API.saveBook(book)
    .then(() => searchPage.setListOfBooks(searchPage.listOfBooks.filter((b => b.id !== book.id))))
    .catch(error => console.log('save failed', error));
  }
}

const createBookObject = (book) => {
  let id="", title="", authors="", booklink="", bookimg="", synopsis="";
  if(book.id){
    id=book.id;
  }
  if(book.volumeInfo.title){
    title=book.volumeInfo.title;
  }
  if(book.volumeInfo.authors){
    authors=" by " + (book.volumeInfo.authors).join(", ");
  }
  if(book.volumeInfo.infoLink){
    booklink=book.volumeInfo.infoLink;
  }
  if("imageLinks" in book.volumeInfo){
    if("smallThumbnail" in book.volumeInfo.imageLinks){
      bookimg= book.volumeInfo.imageLinks.smallThumbnail;
    }
  }
  if(book.volumeInfo.description){
    synopsis=book.volumeInfo.description;
  }
  return { 
    id,
    title,
    authors,
    booklink, 
    bookimg,
    synopsis
  };

}

const ListOfBooks = ({book, saved, savedPage, searchPage}) => {
  const [showModal, setShowModal] = useState(false);
  const bookObject = saved ? book : createBookObject(book);
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
                              <DeleteBook className="ui celled list" setShowModal={setShowModal} id={bookObject._id} savedPage={savedPage}/>
                            : ''}
                        </span>
                      }
                  </div>
                  <div className="description">
                      <p>{bookObject.synopsis}</p>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default ListOfBooks;