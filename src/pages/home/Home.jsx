import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  return (
    <div className="body-home">
      <Navbar expand="lg" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="custom-navbar-brand">Centro de Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-navbar-toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="custom-navbar-nav">
              <Nav.Link as={Link} to="/Centro" className="custom-nav-link">Centro</Nav.Link>
              <Nav.Link as={Link} to="/Veterinarios" className="custom-nav-link">Veterinarios</Nav.Link>
              <Nav.Link as={Link} to="/Galeria" className="custom-nav-link">Galeria</Nav.Link>
              <Nav.Link as={Link} to="/Register" className="custom-nav-link">Register</Nav.Link>
              <Nav.Link as={Link} to="/Login" className="custom-nav-link">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="welcome-container">
        <Container>
          <h1 className="text-center">Bienvenidos al Centro de Mascotas</h1>
          <p className="init">Donde la Felicidad y el Bienestar de tu Mascota son Nuestra Prioridad</p>
          <p className="init">En nuestro Centro de Mascotas, nos dedicamos a proporcionar el mejor cuidado y servicios para tus queridas mascotas. Ya sea que necesiten atención médica, un lugar cómodo donde quedarse mientras estás fuera, o simplemente un día lleno de diversión y ejercicio, estamos aquí para ayudarte.</p>
        </Container>
      </div>
    </div>
  );
}