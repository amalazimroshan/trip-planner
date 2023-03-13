import React, { useState, useEffect } from "react";
import { FilePlus } from "react-bootstrap-icons";
import {
  Button,
  FloatingLabel,
  Form,
  Modal,
  Col,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import "./index.css";

const Navbar = ({ getProprtyData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ backgroundColor: "#DAD7CD" }}>
      <h1 className="heading-nav">Getting_home</h1>
      <Button
        className="justify-content-end add-btn"
        variant="primary"
        onClick={handleShow}
      >
        <FilePlus color="white" size={50} /> Add a property
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your details</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            let data = {
              name: e.target[0].value,
              position: {
                type: "Point",
                coordinates: [e.target[1].value, e.target[2].value],
              },
            };
            getProprtyData(data);
            handleClose();
          }}
        >
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="title" />
              </FloatingLabel>
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">lat</InputGroup.Text>
                    <FormControl
                      placeholder="lattitude"
                      aria-label="lattitude"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">lng</InputGroup.Text>
                    <FormControl
                      placeholder="longitude"
                      aria-label="longitude"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Navbar;
