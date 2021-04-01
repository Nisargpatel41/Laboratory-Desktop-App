import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Receipt from "../Receipt";
import SearchForm from "./SearchForm";
import { ipcRenderer } from "electron";
import * as moment from "moment";

const ReceiptsContainer = () => {
  let [receiptsData, setReceiptsData] = useState([]);
  let [filterReceiptsData, setFilterReceiptsData] = useState([]);
  let [singleReceiptOpen, setSingleReceiptOpen] = useState(false);
  let [printOpen, setPrintOpen] = useState(false);

  useEffect(() => {
    ipcRenderer.send("CashMemo:load");
  }, []);

  ipcRenderer.on("CashMemo:get", (e, memos) => {
    setReceiptsData(JSON.parse(memos));
    setFilterReceiptsData(JSON.parse(memos));
  });

  const onReceiptClick = (id) => {
    setSingleReceiptOpen(true);
    let result = receiptsData.filter((receipt) => receipt._id === id);
    setFilterReceiptsData(result);
    // console.log(id);
  };

  const onSearchClick = (filterCriteria) => {
    let filterType = filterCriteria[0];
    let filterText = filterCriteria[1];
    let result;
    if (filterType === "memoDate") {
      result = receiptsData.filter(
        (receipt) =>
          moment(receipt.memoDate).format("DD/MM/YYYY") ===
          moment(filterText).format("DD/MM/YYYY")
      );
    } else if (filterType === "registerNumber") {
      result = receiptsData.filter(
        (receipt) => receipt.registerNumber === Number(filterText)
      );
    } else {
      result = receiptsData.filter(
        (receipt) =>
          receipt.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
      );
    }
    setFilterReceiptsData(result);
  };

  const onBackClick = () => {
    setSingleReceiptOpen(false);
    setFilterReceiptsData(receiptsData);
  };

  const onPrintClick = () => {
    console.log("print");
    setPrintOpen(true);
  };

  return (
    <div className="p-4">
      <Row className="m-0 p-0">
        <Col xs={12}>
          {!singleReceiptOpen ? (
            <SearchForm onClick={onSearchClick} />
          ) : (
            !printOpen && (
              <>
                <Button variant="danger" onClick={() => onBackClick()}>
                  Cancel
                </Button>
                <Button className="ml-2" onClick={() => onPrintClick()}>
                  Print
                </Button>
              </>
            )
          )}
        </Col>
      </Row>
      <Row
        className={`${
          singleReceiptOpen ? "single-receipt " : "p-0 "
        } m-0 cursor-pointer`}
      >
        {filterReceiptsData.length > 0 ? (
          filterReceiptsData.map((receipt, i) => (
            <Col
              xs={singleReceiptOpen ? 12 : 6}
              key={i}
              className="pt-3 cursor-pointer"
            >
              <Receipt onClick={onReceiptClick} data={receipt} />
            </Col>
          ))
        ) : (
          <Row className="m-0 p-0">
            <Col>
              <span>No Records Found</span>
            </Col>
          </Row>
        )}
      </Row>
    </div>
  );
};

export default ReceiptsContainer;
