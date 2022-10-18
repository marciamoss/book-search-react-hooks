import React from 'react'
import { Button, Modal } from 'semantic-ui-react';

function ErrorModal({setShowError, errorMessage}) {
  
  return (
    <Modal size={'mini'} onClose={() => setShowError(false)} open={true}>
      <Modal.Header>{errorMessage.type}</Modal.Header>
      <Modal.Content>
        <p>{errorMessage.error}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setShowError(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ErrorModal;