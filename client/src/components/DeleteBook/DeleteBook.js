import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import API from "../../utils/API";

function DeleteBook({setShowModal, id, savedPage}) {

  const confirmDeleteBook = async (id, savedPage) => {
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
    .catch(error => console.log('book delete failed', error));
  }
  
  return (
    <Modal size={'mini'} onClose={() => setShowModal(false)} open={true}>
      <Modal.Header>Delete Saved Book</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the book</p>
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
    </Modal>
  )
}

export default DeleteBook;