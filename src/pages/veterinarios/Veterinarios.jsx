import { Navbar, Container, Nav, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Veterinarios.css';

const Veterinarios = () => {
  const veterinarios = [
    {
      Nombre: 'Dr. Alejandro Gómez',
      Especialidad: 'Medicina General',
      imagen: './img/ale.jpeg',
      Reseña: 'Se dedica a proporcionar un diagnóstico preciso y tratamientos efectivos para asegurar la salud y el bienestar de tus animales',
    },
    {
      Nombre: 'Dra. Beatriz Martínez',
      Especialidad: 'Medicina General',
      imagen: './img/beatriz.jpg',
      Reseña: 'Es conocida por su enfoque cuidadoso y su habilidad para tratar una variedad de afecciones en mascotas.',
    },
    {
      Nombre: 'Dr. Gustavo Sánchez',
      Especialidad: 'Peluquería',
      imagen: './img/gustavo.jpeg',
      Reseña: 'Es un experto en peluquería veterinaria, proporcionando servicios de calidad para mantener a tus mascotas luciendo y sintiéndose lo mejor posible',
    },
    {
      Nombre: 'Dr. Carlos Hernández',
      Especialidad: 'Peluquería',
      imagen: './img/carlos.jpeg',
      Reseña: 'Conocido por su habilidad y dedicación para brindar un cuidado estético superior a las mascotas.',
    },
    {
      Nombre: 'Dr. Ernesto Ramírez',
      Especialidad: 'Guardería',
      imagen: './img/ernesto.jpg',
      Reseña: 'Es un profesional en el cuidado de mascotas, especializado en servicios de guardería. Con una pasión por crear un ambiente seguro y acogedor',
    },
    {
      Nombre: 'Dra. Helena Fernández',
      Especialidad: 'Guardería',
      imagen: './img/helena.jpeg',
      Reseña: 'Especializada en servicios de guardería. Con una atención meticulosa y un profundo amor por los animales',
    },
  ];

  return (
    <div className="veterinarios-body">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Centro de Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/galeria">Galeria</Nav.Link>
              <Nav.Link as={Link} to="/veterinarios">Veterinarios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="veterinarios-content">
        <h1>Nuestros Profesionales</h1>
        <Container>
          <Row>
            {veterinarios.map((veterinario, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card className="veterinarios-card">
                  <Card.Img variant="top" src={veterinario.imagen} />
                  <Card.Body>
                    <Card.Title>{veterinario.Nombre}</Card.Title>
                    <Card.Text>{veterinario.Reseña}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Veterinarios;