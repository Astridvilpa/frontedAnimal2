import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./Register.css";
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        navigate('/login');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
    }
  };

  return (
    <div className="body-register">
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
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Regístrate</h2>
          <input
            type="text"
            placeholder="Introduce name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name" 
          />
          <input
            type="email"
            placeholder="Introduce email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email" 
          />
          <input
            type="password"
            placeholder="Introduce password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" 
          />
          <button type="submit" className="register-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;