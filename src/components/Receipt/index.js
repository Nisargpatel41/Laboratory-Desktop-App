import React from "react";
import { Row, Col } from "react-bootstrap";
import * as moment from "moment";
import Header from "../Header";
import Footer from "../Footer";
import { ToWords } from "to-words";

const toWords = new ToWords();

const Receipt = ({ onClick, data }) => {
  return (
    <>
      <div
        className="border border-dark px-3"
        onClick={() => onClick(data?._id)}
      >
        <Header />
        {/* Register Number and Date Row  */}
        <Row>
          <Col>
            <label>R.No:</label>
            <span className="ml-2">{data?.registerNumber}</span>
          </Col>
          <Col className="text-right">
            <label>Date:</label>
            <span className="ml-2">
              {moment(data?.memoDate).format("DD/MM/YYYY")}
            </span>
          </Col>
        </Row>

        {/* Received From Row  */}
        <Row className="mt-2">
          <Col>
            <span>Received From: </span>
          </Col>
          <Col>
            <span>{data?.receivedFrom}</span>
          </Col>
        </Row>

        {/* Name Row  */}
        <Row className="mt-2">
          <Col>
            <span>Name: </span>
          </Col>
          <Col>
            <span>{data?.name}</span>
          </Col>
        </Row>

        {/* Investigation Row  */}
        <Row className="mt-2">
          <Col>
            <span>For Laboratory Investigation as Follows: </span>
          </Col>
          <Col>
            <span>{data?.investigations}</span>
          </Col>
        </Row>

        {/* Price Row  */}
        <Row className="mt-2">
          <Col>
            <span>Rs: </span>
          </Col>
          <Col>
            <div className="d-flex flex-column">
              <span>{data?.price.toFixed(2)}</span>
              <span className="">
                {toWords.convert(Number(data?.price), {
                  currency: true,
                  ignoreZeroCurrency: true,
                })}
              </span>
            </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </>
  );
};

export default Receipt;
