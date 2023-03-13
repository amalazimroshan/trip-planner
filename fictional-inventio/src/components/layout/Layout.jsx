import React from "react";
import "./indes.css";
import { Container, Row as div, Col, Row } from "react-bootstrap";

const Layout = () => {
  return (
    <Container
      fluid
      style={{ backgroundColor: "#343434", width: "100vw" }}
      className=""
    >
      <Row style={{ height: "100vh", flexDirection: "row-reverse" }}>
        <Col md={8} className="column-1">
          map
        </Col>
        <Col className="column-2" style={{ width: "40px" }}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
