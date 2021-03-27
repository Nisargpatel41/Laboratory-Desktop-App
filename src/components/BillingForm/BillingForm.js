import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { ToWords } from "to-words";

const toWords = new ToWords();

const BillingForm = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [price, setPrice] = useState("");
  const [priceInWords, setPriceInWords] = useState("");

  const onPriceChange = (price) => {
    setPrice(Number(price));
    let words = toWords.convert(Number(price), {
      currency: true,
      ignoreZeroCurrency: true,
    });
    console.log(words);
    setPriceInWords(words);
  };

  const addRecord = () => {
    showAlert("Record Added");
  };

  const showAlert = (message, variant = "success", limit = 2000) => {
    setAlert({
      show: true,
      message: message,
      variant: variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, limit);
  };

  return (
    <>
      {/* Register Number and Date Row  */}
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
              <Form.Control type="date" />
            </Col>
          </Form.Group>
        </div>
      </div>

      {/* Received From Name Row */}
      <div>
        <Form.Group as={Row} controlId="receivedFrom">
          <Form.Label column sm="4">
            Received From Name
          </Form.Label>
          <Col sm="8">
            <Form.Control type="text" placeholder="Enter Name" />
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
            <Form.Control type="text" placeholder="Enter Investigations" />
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
        <Button variant="primary" onClick={() => addRecord()}>
          Submit
        </Button>
      </div>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
    </>
  );
};

export default BillingForm;
