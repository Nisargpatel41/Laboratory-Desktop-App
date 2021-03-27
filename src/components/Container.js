import React from "react";
import { Container } from "react-bootstrap";
import BillingForm from "./BillingForm/BillingForm";
import Footer from "./Footer/Footer";
import Header from "./Header";

const AppContainer = () => {
  return (
    <Container className="border border-dark">
      <Header />
      <BillingForm />
      <Footer />
    </Container>
  );
};

export default AppContainer;
