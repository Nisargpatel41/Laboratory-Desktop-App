import React, { useState } from "react";
import { Col, Form, Button } from "react-bootstrap";

const SearchForm = () => {
  const [isDate, setIsDate] = useState(true);
  const [selectedValue, setSelectedValue] = useState("date");
  const [searchText, setSearchText] = useState("");

  const onSearchClick = (e) => {
    e.preventDefault();
    console.log(["selectedValue", selectedValue]);
    console.log(["searchText", searchText]);
  };

  const onSelectChange = (e) => {
    setSearchText("");
    // Prevents React from resetting its properties:
    e.persist();
    setSelectedValue(e.target.value);
    if (e.target.value !== "date") {
      setIsDate(false);
    } else {
      setIsDate(true);
    }
  };

  return (
    <Form onSubmit={onSearchClick} className="w-100">
      <Form.Row className="align-items-center">
        <Col xs={1}>
          <Form.Label htmlFor="selectSearchType" srOnly>
            Select Search Type
          </Form.Label>

          <Form.Control
            as="select"
            className="mb-2 cursor-pointer"
            id="selectSearchType"
            value={selectedValue}
            onChange={onSelectChange}
          >
            <option value="date">Date</option>
            <option value="registerNumber">R.No.</option>
            <option value="name">Name</option>
          </Form.Control>
        </Col>

        <Col xs={isDate ? 2 : 4}>
          <Form.Label htmlFor="inlineFormInput" srOnly>
            searchInput
          </Form.Label>
          <Form.Control
            type={isDate ? "date" : "text"}
            className="mb-2"
            id="inlineFormInput"
            placeholder={isDate ? "" : "Search here..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
          />
        </Col>

        <Col xs={1}>
          <Button type="submit" className="mb-2">
            Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
