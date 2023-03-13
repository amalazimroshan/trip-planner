import React from "react";
import "./cards.css";
import { Card, Tab, Row, Nav, ListGroup } from "react-bootstrap";

const Cards = ({ property }) => {
  return (
    <Card
      style={{
        backgroundColor: "#F0EDD1",
        maxHeight: "30em",
        minHeight: "20em",
        width: "15em",
        marginLeft: "5px",
      }}
      className="mb-2"
    >
      {/* <Card.Img
        variant="top"
        style={{ width: "100%" }}
        src="https://picsum.photos/50"
        fluid
      /> */}
      <Card.Body>
        <Tab.Container defaultActiveKey="Home">
          <Row>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="Home" className="m-1 tabStyle">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="m-1" eventKey="details">
                  details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="m-1" eventKey="contact">
                  contact
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="Home">
                <h5>
                  <u>{property.title}</u>
                </h5>
                <p>{property.description}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "600",
                  }}
                >
                  <span>Price</span>
                  <span>{property.price}</span>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="details">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Address
                    <span className="keepRight">{property.address}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    square feet
                    <span className="keepRight">{property.squareft}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    bedroom<span className="keepRight">{property.bedroom}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    bathroom
                    <span className="keepRight">{property.bathroom}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    car parking
                    <span className="keepRight">
                      {property.parking ? "yes" : "no"}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
              <Tab.Pane eventKey="contact">
                <ListGroup>
                  <ListGroup.Item>
                    contact name
                    <span className="keepRight">
                      {property.contactName ? property.contactName : "null"}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    phone
                    <span className="keepRight">
                      {property.contactNumber ? property.contactNumber : "null"}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default Cards;
