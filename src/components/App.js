import React, { useState } from "react";
import NewContainer from "./NewContainer";
import ReceiptsContainer from "./ReceiptsContainer";
// import { Button, Modal } from "react-bootstrap";

const App = () => {
  // let [modal, setModal] = useState(false);

  return (
    <div className="app">
      {/* <NewContainer /> */}
      <ReceiptsContainer />

      {/* <Button variant="primary" onClick={() => setModal(true)}>
        Launch Modal
      </Button> */}

      {/* <Modal
        show={modal}
        onHide={() => setModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default App;
