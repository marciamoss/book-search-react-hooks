import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react';
import API from "../../utils/API";
import ErrorModal from "../ErrorModal/ErrorModal";

function DeleteBook({setShowModal, title, id, savedPage}) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({type: '', error: ''});

  const confirmDeleteBook = async (id, savedPage) => {
    setShowError(false);
    setErrorMessage({type: '', error: ''});
    let numberOfCurrentBooks = savedPage.currentBooks.length;
    let numberOfTotalBooks = savedPage.listOfBooks.length;
    await API.deleteBook(id)
    .then(() => {
      savedPage.setListOfBooks(savedPage.listOfBooks.filter((b => b._id !== id)));
      numberOfCurrentBooks = numberOfCurrentBooks - 1;
      numberOfTotalBooks = numberOfTotalBooks - 1;
      if(numberOfCurrentBooks === 0 && numberOfTotalBooks > 0) {
        savedPage.setCurrentPage(savedPage.currentPage - 1);
      }
      if(numberOfTotalBooks === 0) {
        savedPage.setAllDeleted(true);
      }
    })
    .catch(error => {
      setShowError(true);
      setErrorMessage({type: "Delete Failed at this time", error: error?.message});
    });
  }
  
  return (
    <Modal size={'mini'} onClose={() => setShowModal(false)} open={true}>
      <Modal.Header>Delete {title}</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the book {title}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setShowModal(false)}>
          No
        </Button>
        <Button
          onClick={() => confirmDeleteBook(id, savedPage)}
          positive>Yes
        </Button>
      </Modal.Actions>
      {showError ? <ErrorModal setShowError={setShowError} errorMessage={errorMessage}></ErrorModal>: ''}
    </Modal>
  )
}

export default DeleteBook;