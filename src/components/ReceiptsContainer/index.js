import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchForm from "./SearchForm";

const ReceiptsContainer = () => {
  return (
    <div className="p-4">
      <Row className="m-0 p-0">
        <SearchForm />
      </Row>
    </div>
  );
};

export default ReceiptsContainer;
