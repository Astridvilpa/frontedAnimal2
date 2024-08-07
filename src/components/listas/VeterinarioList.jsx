import React from 'react';
import { Card, Col, Button, Row, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

const VeterinarioList = ({
  veterinarios,
  handleEditVeterinarioClick,
  handleDeleteVeterinarioClick,
  editingVeterinario,
  editVeterinarioForm,
  handleEditVeterinarioChange,
  handleEditVeterinarioSubmit,
  showVeterinarioForm,
  setShowVeterinarioForm,
  handleCreateVeterinario
}) => {
  return (
    <div>
      <Button variant="primary" className="my-4" onClick={() => setShowVeterinarioForm(true)}>
        Crear Veterinario
      </Button>
      <Row>
        {veterinarios.map((veterinario) => (
          <Col key={veterinario.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {veterinario.name}
                  <BsFillPencilFill className="ms-2" onClick={() => handleEditVeterinarioClick(veterinario)} />
                  <BsFillTrash3Fill className="ms-2" onClick={() => handleDeleteVeterinarioClick(veterinario.id)} />
                </Card.Title>
                <Card.Text>{veterinario.Especialidad}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{veterinario.Specialty}</Card.Subtitle>
                {editingVeterinario === veterinario.id && (
                  <Form onSubmit={handleEditVeterinarioSubmit}>
                    <Form.Group controlId="formName">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={editVeterinarioForm.name}
                        onChange={handleEditVeterinarioChange} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formEspecialidad">
                      <Form.Label>Especialidad</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="Especialidad"
                        value={editVeterinarioForm.Especialidad}
                        onChange={handleEditVeterinarioChange} 
                      />
                    
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Guardar Cambios
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {showVeterinarioForm && (
        <Form className="my-4">
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={editVeterinarioForm.name}
              onChange={handleEditVeterinarioChange} 
            />
          </Form.Group>
          <Form.Group controlId="formEspecialidad">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control 
              type="text" 
              name="Especialidad"
              value={editVeterinarioForm.Especialidad}
              onChange={handleEditVeterinarioChange} 
            />
          
          </Form.Group>
          <Button variant="primary" onClick={handleCreateVeterinario}>
            Crear Veterinario
          </Button>
        </Form>
      )}
    </div>
  );
}

export default VeterinarioList;