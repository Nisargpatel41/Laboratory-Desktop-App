import React from "react";
import { Button, Modal } from "react-bootstrap";
import Receipt from "../Receipt";

const ReceiptModal = ({ open, close }) => {
  return (
    <Modal
      show={open}
      onHide={() => close(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Receipt />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => close(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
