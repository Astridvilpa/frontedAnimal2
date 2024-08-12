import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Navbar, Nav, NavDropdown, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllPets, createPet, updatePetById, deletePetById } from "../../services/petCall";
import { useAuth } from "../../contexts/auth-context/AuthContext";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const PetListContainer = () => {
  const { userToken, logout } = useAuth();
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const response = await getAllPets(userToken.token);
      if (response.success) {
        setPets(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error fetching pets");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleCreatePet = async (event) => {
    event.preventDefault();
    const newPet = {
      name: petName,
      type: petType,
    };
    try {
      const response = await createPet(newPet, userToken.token);
      if (response.success) {
        fetchPets();
        setPetName("");
        setPetType("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error creating pet");
    }
  };

  const handleEditPetClick = (pet) => {
    setSelectedPet(pet);
    setPetName(pet.name);
    setPetType(pet.type);
  };

  const handleEditPetSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPet) return;
    const updatedPetData = {
      id: selectedPet.id,
      name: petName,
      type: petType,
    };
    try {
      const response = await updatePetById(updatedPetData, userToken.token);
      if (response.success) {
        fetchPets();
        setSelectedPet(null);
        setPetName("");
        setPetType("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error updating pet");
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const response = await deletePetById(petId, userToken.token);
      if (response.success) {
        fetchPets();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error deleting pet");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Centro de Mascota</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/services">Ver Servicios</Nav.Link>
              <Nav.Link as={Link} to="/pets">Mis Mascotas</Nav.Link>
              <Nav.Link as={Link} to="/galeria">Galería</Nav.Link>
              <Nav.Link as={Link} to="/appointment">Mis Citas</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Perfil" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleEditProfile}>Editar Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Lista de Mascotas</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {pets.map((pet) => (
          <Col md={4} className="mb-3" key={pet.id}>
            <Card>
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>Tipo: {pet.type}</Card.Text>
                <Button variant="primary" className="me-2" onClick={() => handleEditPetClick(pet)}>
                  <BsFillPencilFill /> Editar
                </Button>
                <Button variant="danger" onClick={() => handleDeletePet(pet.id)}>
                  <BsFillTrash3Fill /> Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2>{selectedPet ? "Editar Mascota" : "Crear Nueva Mascota"}</h2>
      <Form onSubmit={selectedPet ? handleEditPetSubmit : handleCreatePet}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          {selectedPet ? "Guardar Cambios" : "Crear Mascota"}
        </Button>
      </Form>
    </Container>
  );
};

export default PetListContainer;