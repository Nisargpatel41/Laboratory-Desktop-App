import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Receipt from "../Receipt";
import { remote } from "electron";
const BrowserWindow = remote.BrowserWindow;

const ReceiptModal = ({ open, close }) => {
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  let webContents = remote.getCurrentWebContents();
  let printers = webContents.getPrinters();
  console.log(printers);

  const onPrintClick = () => {
    // var current = document.getElementById('current');
    var options = {
      silent: false,
      printBackground: false,
      color: false,
      margin: {
        marginType: "printableArea",
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: "Header of the Page",
      footer: "Footer of the Page",
    };

    let win = BrowserWindow.getFocusedWindow();
    // let win = BrowserWindow.getAllWindows()[0];

    win.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason);

      console.log("Print Initiated");
    });
  };

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
        <Row className="m-0 p-0">
          {printers.length > 0 ? (
            <>
              <Col xs={8}>
                <Form.Control
                  as="select"
                  className="mb-2 cursor-pointer"
                  id="selectPrinter"
                  value={selectedPrinter}
                  onChange={(e) => setSelectedPrinter(e.target.value)}
                >
                  <option>Select Printer</option>
                  {printers.map((printer, i) => {
                    return (
                      <option key={i} value={printer?.name}>
                        {printer?.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
              <Col xs={2}>
                <Form.Control
                  type="number"
                  value={numberOfCopies}
                  onChange={(e) => setNumberOfCopies(e.target.value)}
                  min="1"
                />
              </Col>
              <Col xs={2}>
                <Button onClick={() => onPrintClick()}>Print</Button>
              </Col>
            </>
          ) : (
            <span>No printers available to print</span>
          )}
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
