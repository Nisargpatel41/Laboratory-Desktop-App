import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Receipt from "../Receipt";
import SearchForm from "./SearchForm";
import ReceiptModal from "../ReceiptModal";

const ReceiptsContainer = () => {
  let [modal, setModal] = useState(false);

  const onReceiptClick = () => {
    setModal(true);
  };

  return (
    <div className="p-4">
      <Row className="m-0 p-0">
        <Col xs={12}>
          <SearchForm />
        </Col>
      </Row>
      <Row className="m-0 p-0">
        <Col xs={6} className="pt-3 cursor-pointer">
          <Receipt onClick={onReceiptClick} />
        </Col>
        <Col xs={6} className="pt-3 cursor-pointer">
          <Receipt onClick={onReceiptClick} />
        </Col>
        <Col xs={6} className="pt-3 cursor-pointer">
          <Receipt onClick={onReceiptClick} />
        </Col>
      </Row>

      <ReceiptModal open={modal} close={setModal} />
    </div>
  );
};

export default ReceiptsContainer;
