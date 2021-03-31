import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { ToWords } from "to-words";
import { ipcRenderer } from "electron";

const toWords = new ToWords();

const BillingForm = () => {
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [registerNumbers, setRegisterNumbers] = useState([]);
  const [registerNumber, setRegisterNumber] = useState("");
  const [date, setDate] = useState("");
  const [fromName, setFromName] = useState("");
  const [name, setName] = useState("");
  const [investigations, setInvestigations] = useState("");
  const [price, setPrice] = useState("");
  const [priceInWords, setPriceInWords] = useState("");

  useEffect(() => {
    ipcRenderer.send("CashMemo:load:registerNumbers");
    ipcRenderer.on("CashMemo:get:registerNumbers", (e, numbers) => {
      let numbersArray = JSON.parse(numbers).map(
        (number) => number.registerNumber
      );
      setRegisterNumbers(numbersArray);
    });
  }, []);

  const onPriceChange = (price) => {
    setPrice(Number(price));
    let words = toWords.convert(Number(price), {
      currency: true,
      ignoreZeroCurrency: true,
    });
    setPriceInWords(words);
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (registerNumbers.includes(Number(registerNumber))) {
      showAlert("Register number is already in use.", "danger", 5000);
      return;
    }

    let item = {
      registerNumber: Number(registerNumber),
      memoDate: new Date(date),
      receivedFrom: fromName,
      name: name,
      investigations: investigations,
      price: Number(price),
      createdAt: new Date(),
    };

    ipcRenderer.send("CashMemo:add", item);

    setRegisterNumber("");
    setDate("");
    setFromName("");
    setName("");
    setInvestigations("");
    setPrice("");
    setPriceInWords("");

    showAlert("Record Added");
  };

  const showAlert = (message, variant = "success", limit = 2000) => {
    setAlertMessage({
      show: true,
      message: message,
      variant: variant,
    });

    setTimeout(() => {
      setAlertMessage({
        show: false,
        message: "",
        variant: "success",
      });
    }, limit);
  };

  return (
    <>
      {/* Register Number and Date Row  */}
      <Form onSubmit={addRecord}>
        <div className="d-flex justify-content-between">
          <div>
            <Form.Group as={Row} controlId="regNum">
              <Form.Label column sm="2">
                R.No.
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Enter Register Number"
                  min="0"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
          </div>
          <div>
            <Form.Group as={Row} controlId="date">
              <Form.Label column sm="2">
                Date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        {/* Received From Row */}
        <div>
          <Form.Group as={Row} controlId="receivedFrom">
            <Form.Label column sm="4">
              Received From
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Enter Received From"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>

        {/* Name Row */}
        <div>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="4">
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>

        {/* Laboratory Investigation  Row */}

        <div>
          <Form.Group as={Row} controlId="investigations">
            <Form.Label column sm="4">
              For Laboratory Investigation as Follows
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter Investigations"
                value={investigations}
                onChange={(e) => setInvestigations(e.target.value)}
              />
            </Col>
          </Form.Group>
        </div>

        {/* Price Row */}

        <div>
          <Form.Group as={Row} controlId="rs">
            <Form.Label column sm="4">
              Rs.
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="Enter Rs."
                min="0"
                value={price}
                onChange={(e) => onPriceChange(e.target.value)}
              />
              {priceInWords && <Form.Text>{priceInWords}</Form.Text>}
            </Col>
          </Form.Group>
        </div>
        <div className="text-center py-3">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
      {alertMessage.show && (
        <Alert variant={alertMessage.variant}>{alertMessage.message}</Alert>
      )}
    </>
  );
};

export default BillingForm;
