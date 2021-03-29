import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Receipt from "../Receipt";
import { remote } from "electron";

const ReceiptModal = ({ open, close }) => {
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  let webContents = remote.getCurrentWebContents();
  let printers = webContents.getPrinters();
  console.log(printers);

  const onPrintClick = () => {
    // console.log(["selectedPrinter", selectedPrinter]);

    let printerName = selectedPrinter;
    let copies = Number(numberOfCopies);
    let widthPage = "100%";

    const data = [
      {
        type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: <Receipt />,
        style: `text-align:left;`,
        css: { "font-size": "12px" },
      },
    ];

    const options = {
      preview: false, // Preview in window or print
      width: widthPage, //  width of content body
      margin: "0 0 0 0", // margin of content body
      copies: copies, // Number of copies to print
      printerName: printerName, // printerName: string, check it at webContent.getPrinters()
      timeOutPerLine: 400,
      silent: true,
    };

    const d = [...data];
    const { PosPrinter } = remote.require("electron-pos-printer");
    if (printerName && widthPage) {
      PosPrinter.print(d, options)
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please select the printer");
    }
    setSelectedPrinter("");
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
