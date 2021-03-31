import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Receipt from "../Receipt";
import SearchForm from "./SearchForm";
import { ipcRenderer } from "electron";
import * as moment from "moment";

const ReceiptsContainer = () => {
  let [receiptsData, setReceiptsData] = useState([]);
  let [filterReceiptsData, setFilterReceiptsData] = useState([]);

  useEffect(() => {
    ipcRenderer.send("CashMemo:load");
  }, []);

  ipcRenderer.on("CashMemo:get", (e, memos) => {
    setReceiptsData(JSON.parse(memos));
    setFilterReceiptsData(JSON.parse(memos));
  });

  const onReceiptClick = (id) => {
    console.log(id);
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

  return (
    <div className="p-4">
      <Row className="m-0 p-0">
        <Col xs={12}>
          <SearchForm onClick={onSearchClick} />
        </Col>
      </Row>
      <Row className="m-0 p-0">
        {filterReceiptsData.length > 0 ? (
          filterReceiptsData.map((receipt, i) => (
            <Col xs={6} key={i} className="pt-3 cursor-pointer">
              <Receipt onClick={onReceiptClick} data={receipt} />
            </Col>
          ))
        ) : (
          <p>No Records Found</p>
        )}
      </Row>
    </div>
  );
};

export default ReceiptsContainer;
