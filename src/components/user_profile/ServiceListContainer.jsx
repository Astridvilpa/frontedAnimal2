import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Alert, Row, Col } from "react-bootstrap";
import { getAllServices, createService, updateServiceById, deleteServiceById } from "../../services/serviceCall";
import { useAuth } from "../../contexts/auth-context/AuthContext";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const ServiceListContainer = ({ isAdmin }) => {
  const { userToken } = useAuth();
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await getAllServices(userToken.token);
      if (response.success) {
        setServices(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error fetching services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async (event) => {
    event.preventDefault();
    const newService = { name: serviceName };
    try {
      const response = await createService(newService, userToken.token);
      if (response.success) {
        fetchServices();
        setServiceName("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error creating service");
    }
  };

  const handleEditServiceClick = (service) => {
    setSelectedService(service);
    setServiceName(service.name);
  };

  const handleEditServiceSubmit = async (event) => {
    event.preventDefault();
    if (!selectedService) return;
    const updatedServiceData = { id: selectedService.id, name: serviceName };
    try {
      const response = await updateServiceById(updatedServiceData, userToken.token);
      if (response.success) {
        fetchServices();
        setSelectedService(null);
        setServiceName("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error updating service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await deleteServiceById(serviceId, userToken.token);
      if (response.success) {
        fetchServices();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error deleting service");
    }
  };

  return (
    <Container>
      <h1>Lista de Servicios</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {services.map((service) => (
          <Col md={4} className="mb-3" key={service.id}>
            <Card>
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                {isAdmin && (
                  <>
                    <Button variant="primary" className="me-2" onClick={() => handleEditServiceClick(service)}>
                      <BsFillPencilFill /> Editar
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteService(service.id)}>
                      <BsFillTrash3Fill /> Eliminar
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {isAdmin && (
        <>
          <h2>{selectedService ? "Editar Servicio" : "Crear Nuevo Servicio"}</h2>
          <Form onSubmit={selectedService ? handleEditServiceSubmit : handleCreateService}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-3">
              {selectedService ? "Guardar Cambios" : "Crear Servicio"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ServiceListContainer;