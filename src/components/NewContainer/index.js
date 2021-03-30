import React from "react";
import { Container } from "react-bootstrap";
import BillingForm from "../BillingForm";
import Footer from "../Footer";
import Header from "../Header";

const NewContainer = () => {
  return (
    <Container className="border border-dark my-4">
      <Header />
      <BillingForm />
      <Footer />
    </Container>
  );
};

export default NewContainer;
