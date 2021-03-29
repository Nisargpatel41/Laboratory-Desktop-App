import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";

const Receipt = ({ onClick }) => {
  return (
    <>
      <div className="border border-dark px-3" onClick={onClick}>
        <Header />
        {/* Register Number and Date Row  */}
        <Row>
          <Col>
            <label>R.No:</label>
            <span className="ml-2">1234</span>
          </Col>
          <Col className="text-right">
            <label>Date:</label>
            <span className="ml-2">19/03/2021</span>
          </Col>
        </Row>

        {/* Received From Row  */}
        <Row className="mt-2">
          <Col>
            <span>Received From: </span>
          </Col>
          <Col>
            <span>Bhadreshbhai Bhatia</span>
          </Col>
        </Row>

        {/* Name Row  */}
        <Row className="mt-2">
          <Col>
            <span>Name: </span>
          </Col>
          <Col>
            <span>Bhadreshbhai Chandubhai Bhatia</span>
          </Col>
        </Row>

        {/* Investigation Row  */}
        <Row className="mt-2">
          <Col>
            <span>For Laboratory Investigation as Follows : </span>
          </Col>
          <Col>
            <span>Tav, Khasi, Shardi, loose motion etc.</span>
          </Col>
        </Row>

        {/* Price Row  */}
        <Row className="mt-2">
          <Col>
            <span>Rs : </span>
          </Col>
          <Col>
            <div className="d-flex flex-column">
              <span>1400.00</span>
              <span className="small">One Thousand Fourteen Hundred Only.</span>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </>
  );
};

export default Receipt;
