import React, { useState } from "react";
import "./index.css";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { FilePlus, Funnel, X, CloudArrowUpFill } from "react-bootstrap-icons";

const Navbarr = ({ getProprtyData, setFilters }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const filterShow = () => setShowFilterBox(true);
  const filterClose = () => setShowFilterBox(false);
  return (
    <Navbar style={{ backgroundColor: "#A3B18A" }} expand="sm">
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: "#000" }}>
          Gettng home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="posLeft">
            <Button
              onClick={handleShow}
              className="m-1 p-1 outline"
              style={{ color: "#DAD7CD", backgroundColor: "#3A5A40" }}
            >
              <FilePlus size={25} /> add a property
            </Button>

            <Modal show={show} backdrop="static" onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add a property</Modal.Title>
              </Modal.Header>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  let data = {
                    title: document.getElementById("title").value,
                    address: document.getElementById("address").value,
                    position: {
                      type: "Point",
                      coordinates: [
                        parseFloat(document.getElementById("longitude").value),
                        parseFloat(document.getElementById("lattitude").value),
                      ],
                    },
                    price: parseInt(document.getElementById("price").value),
                    squareft: parseInt(document.getElementById("area").value),
                    bedroom: parseInt(document.getElementById("bedroom").value),
                    bathroom: parseInt(
                      document.getElementById("bathroom").value
                    ),
                    parking: document.getElementById("parking").checked,
                    description: document.getElementById("description").value,
                    contactName: document.getElementById("contactName").value,
                    contactNumber:
                      document.getElementById("contactNumber").value,
                  };
                  getProprtyData(data);
                  // console.log(data);
                  handleClose();
                }}
              >
                <Modal.Body style={{ maxHeight: "70vh", overflow: "scroll" }}>
                  <div className="boxShadow p-2">
                    <Form.Group as={Col} className="mb-2" controlId="title">
                      <Form.Label>Title for your placement</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="title goes here"
                        className="outlineinput"
                      />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="address goes here"
                        className="outlineinput"
                      />
                    </Form.Group>
                    <Row>
                      <Form.Group
                        as={Col}
                        className="mb-2"
                        controlId="lattitude"
                      >
                        <Form.Label>lattitude</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="-90 to 90 degrees"
                          className="outlineinput"
                        />
                        <Form.Text>maximum 5 deciamal values</Form.Text>
                      </Form.Group>
                      <Form.Group as={Col} controlId="longitude">
                        <Form.Label>longitude</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="-180 to 180 degrees"
                          className="outlineinput"
                        />
                        <Form.Text>maximum 5 deciamal values</Form.Text>
                      </Form.Group>
                    </Row>
                    <Form.Group as={Col} controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="price in rupees"
                        className="outlineinput"
                      />
                    </Form.Group>
                  </div>
                  <div className="boxShadow p-2">
                    <h5>house details</h5>
                    <Form.Group as={Col} controlId="area">
                      <Form.Label>total area</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="in square feet"
                        className="outlineinput"
                      />
                    </Form.Group>
                    <Row>
                      <Form.Group as={Col} controlId="bedroom">
                        <Form.Label>no of bedroom</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          className="outlineinput"
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="bathroom">
                        <Form.Label>no of bathroom</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          className="outlineinput"
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="m-3" controlId="parking">
                      <Form.Check type="checkbox" label="car-parking" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="description">
                      <Form.Label>description</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        placeholder="any usefull info you wish to add"
                        className="outlineinput"
                      />
                    </Form.Group>
                  </div>
                  <div className="boxShadow p-2">
                    <h5>contact details</h5>
                    <Form.Group controlId="contactName">
                      <Form.Label>contact name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="your contact name"
                        className="outlineinput"
                      />
                    </Form.Group>
                    <Form.Group controlId="contactNumber">
                      <Form.Label>contact number</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="your contact number"
                        className="outlineinput"
                      />
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="m-1 p-1 outline"
                    onClick={handleClose}
                    style={{ backgroundColor: "#31572C", color: "#E6F9F8" }}
                  >
                    <X size={25} />
                  </Button>{" "}
                  <Button
                    type="submit"
                    className="m-1 p-1 outline"
                    style={{ backgroundColor: "#31572C", color: "#E6F9F8" }}
                  >
                    Upload
                    <CloudArrowUpFill size={25} className="mx-2" />
                  </Button>{" "}
                </Modal.Footer>
              </Form>
            </Modal>
            <>
              <Button
                className="m-1 outline"
                variant="outline-success"
                style={{ color: "#DAD7CD", backgroundColor: "#3A5A40" }}
                onClick={filterShow}
              >
                <Funnel size={25} /> add a filter
              </Button>
              <Offcanvas show={showFilterBox} onHide={filterClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Add a filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      filterClose();
                      let filter = {
                        price: parseInt(document.getElementById("price").value),
                        bedroom: parseInt(
                          document.getElementById("bedroom").value.split(" ")[0]
                        ),
                      };
                      setFilters(filter);
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Price below:</Form.Label>
                      <Form.Select id="price">
                        <option value="10000000"> 1,00,00,000 (1 crore)</option>
                        <option value="1000000"> 10,00,000 (10 lakh)</option>
                        <option value="500000"> 5,00,000 (5 lakh)</option>
                        <option value="100000"> 1,00,000 (1 lakh)</option>
                        <option value="80000"> 80,000 (80 thousand)</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>bedroom below:</Form.Label>
                      <Form.Select id="bedroom">
                        <option> 5</option>
                        <option> 4</option>
                        <option> 3</option>
                        <option> 2</option>
                      </Form.Select>
                    </Form.Group>

                    <Button
                      style={{ background: "#3a5a40", borderColor: "#f0edd1" }}
                      type="submit"
                    >
                      OK
                    </Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
