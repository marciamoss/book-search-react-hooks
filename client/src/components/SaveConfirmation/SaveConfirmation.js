import { useState } from "react";
import {
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'

const SaveConfirmation = ({title}) => {
  const [animation] = useState('browse');
  const [duration] = useState(500);

  return (
    <TransitionablePortal
      open={true}
      transition={{ animation, duration }}
    >
      <Segment
        style={{
          left: '40%',
          position: 'fixed',
          top: '50%',
          zIndex: 1000,
          backgroundColor: 'lightgreen'
        }}
      >
        <Header>{title} Saved</Header>
      </Segment>
    </TransitionablePortal>
  );
}

export default SaveConfirmation;