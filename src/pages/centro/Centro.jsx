import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Centro.css"; 

const Centro = () => {
  React.useEffect(() => {
    document.body.classList.add('centro-body');
    
    return () => {
      document.body.classList.remove('centro-body');
    };
  }, []);

  return (
    <div className="centro-view">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Centro de Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/galeria">Galeria</Nav.Link>
              <Nav.Link as={Link} to="/veterinarios">Veterinarios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="centro-content">
        <div className="centro-text">
          <h1>Centro de Mascotas</h1>
          <p>
            El "Centro de Mascotas" fue fundado en MCMXC  con la visión de crear un espacio dedicado al bienestar y felicidad de nuestras queridas mascotas. Desde sus inicios, nuestro centro ha estado comprometido con brindar servicios de la más alta calidad, asegurando que cada mascota reciba el amor y cuidado que merece.
          </p>
          <div className="studio-image">
            <img src="./img/center.jpeg" alt="center" />
          </div>
          <p>
            Lo que comenzó como un pequeño proyecto de amantes de los animales ha crecido hasta convertirse en un referente en el cuidado de mascotas en nuestra comunidad. Gracias a un equipo de profesionales apasionados y altamente capacitados, hemos logrado establecer un lugar donde las mascotas y sus dueños se sienten como en casa.
          </p>
          <div className="studio-image">
            <img src="./img/equipo.jpg" alt="equipo" />
          </div>
          <p>
            Nuestro centro no solo ofrece servicios veterinarios de primera clase, sino también un ambiente amigable y acogedor para todas las mascotas. Con el paso de los años, hemos ampliado nuestros servicios para incluir alojamiento, adiestramiento y actividades recreativas, siempre manteniendo nuestro compromiso con la excelencia y el cuidado personalizado.
          </p>
          <div className="studio-image">
            <img src="./img/alojamiento.jpg" alt="alojamiento" />
          </div>
          <p>
            En el "Centro de Mascotas", continuamos creciendo y evolucionando, pero nuestra misión permanece constante: asegurar que cada mascota tenga una vida feliz y saludable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Centro;