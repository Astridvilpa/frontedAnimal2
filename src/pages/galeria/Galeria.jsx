import React from "react";
import { Navbar, Container, Nav, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Galeria.css";

const Galeria = () => {
  return (
    <div className="galeria-body">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Centro de Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/galeria">Galeria</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="galeria-content">
        <h1>Galería de Servicios</h1>
        <Container>
          <Row>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/veti.jpeg" />
                <Card.Body>
                  <Card.Title>Servicio de Veterinario</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/veti1.jpg" />
                <Card.Body>
                  <Card.Title>Servicio de Veterinario</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/veti2.jpg" />
                <Card.Body>
                  <Card.Title>Servicio de Veterinario</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/pelu.jpg" />
                <Card.Body>
                  <Card.Title>Servicio de Peluquería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/pelu1.jpeg" />
                <Card.Body>
                  <Card.Title>Servicio de Peluquería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/pelu2.jpeg" />
                <Card.Body>
                  <Card.Title>Servicio de Peluquería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/gu.jpg" />
                <Card.Body>
                  <Card.Title>Servicio de Guardería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/gu1.jpeg" />
                <Card.Body>
                  <Card.Title>Servicio de Guardería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="galeria-card">
                <Card.Img variant="top" src="./img/gu2.jpg" />
                <Card.Body>
                  <Card.Title>Servicio de Guardería</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Galeria;