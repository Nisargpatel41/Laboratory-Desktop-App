import React from "react";
import { Row, Col } from "react-bootstrap";
import Receipt from "../Receipt";
import SearchForm from "./SearchForm";

const ReceiptsContainer = () => {
  return (
    <div className="p-4">
      <Row className="m-0 p-0">
        <Col xs={12}>
          <SearchForm />
        </Col>
      </Row>
      <Row className="m-0 p-0">
        <Col xs={6} className="pt-3 cursor-pointer">
          <Receipt />
        </Col>
        <Col xs={6} className="pt-3">
          <Receipt />
        </Col>
        <Col xs={6} className="pt-3">
          <Receipt />
        </Col>
      </Row>
    </div>
  );
};

export default ReceiptsContainer;
