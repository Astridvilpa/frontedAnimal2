import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllPets, createPet, updatePetById, deletePetById } from "../../services/petCall";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const PetListContainer = () => {
  const { userToken } = useAuth();
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [error, setError] = useState(null);

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
      user_id: userToken.userId,
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
      user_id: userToken.userId,
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

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Centro de Mascota</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/services">Ver Servicios</Nav.Link>
            <Nav.Link as={Link} to="/pets">Mis Mascotas</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Galería</Nav.Link>
            <Nav.Link as={Link} to="/appointments">Mis Citas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1>Lista de Mascotas</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <div>
              <strong>{pet.name}</strong>
              <p>Tipo: {pet.type}</p>
              <Button variant="primary" onClick={() => handleEditPetClick(pet)}>Editar</Button>
              <Button variant="danger" onClick={() => handleDeletePet(pet.id)}>Eliminar</Button>
            </div>
          </li>
        ))}
      </ul>
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
        <Button type="submit">{selectedPet ? "Guardar Cambios" : "Crear Mascota"}</Button>
      </Form>
    </Container>
  );
};

export default PetListContainer;