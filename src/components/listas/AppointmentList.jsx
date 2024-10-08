import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const AppointmentList = ({
  appointments = [], 
  services = [], 
  veterinarios = [], 
  pets = [], 
  handleEditAppointmentClick,
  handleDeleteAppointmentClick,
  newAppointment = {}, 
  handleEditAppointmentChange,
  handleEditAppointmentSubmit,
  handleCreateAppointment,
  editingAppointment,
}) => (
  <div>
    <h3>Lista de Citas</h3>
    {appointments.map((appointment) => (
      <Card key={appointment.id} className="mb-4">
        <Card.Body>
          <Card.Title>
            {new Date(appointment.date).toLocaleString()}
            <Button className="ms-2" onClick={() => handleEditAppointmentClick(appointment)}>
              <BsFillPencilFill />
            </Button>
            <Button className="ms-2" onClick={() => handleDeleteAppointmentClick(appointment.id)}>
              <BsFillTrash3Fill />
            </Button>
          </Card.Title>
          {editingAppointment === appointment.id ? (
            <Form onSubmit={handleEditAppointmentSubmit}>
              <Form.Group controlId="formType">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={newAppointment.type || ''}
                  onChange={handleEditAppointmentChange}
                />
              </Form.Group>
              <Form.Group controlId="formAppointmentDate">
                <Form.Label>Fecha y Hora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="date"
                  value={newAppointment.date || ''}
                  onChange={handleEditAppointmentChange}
                />
              </Form.Group>
              <Form.Group controlId="formServiceId">
                <Form.Label>Servicio</Form.Label>
                <Form.Control
                  as="select"
                  name="service_id"
                  value={newAppointment.service_id || ''}
                  onChange={handleEditAppointmentChange}
                >
                  <option value="">Seleccionar Servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formVeterinarioId">
                <Form.Label>Veterinarios</Form.Label>
                <Form.Control
                  as="select"
                  name="veterinario_id"
                  value={newAppointment.veterinario_id || ''}
                  onChange={handleEditAppointmentChange}
                >
                  <option value="">Seleccionar Veterinario</option>
                  {veterinarios.map((veterinario) => (
                    <option key={veterinario.id} value={veterinario.id}>
                      {veterinario.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formPetId">
                <Form.Label>Mascota</Form.Label>
                <Form.Control
                  as="select"
                  name="pet_id"
                  value={newAppointment.pet_id || ''}
                  onChange={handleEditAppointmentChange}
                >
                  <option value="">Seleccionar Mascota</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </Form>
          ) : (
            <>
              <Card.Text>ID de Usuario: {appointment.user?.id}</Card.Text>
              <Card.Text>Nombre: {appointment.user?.name} {appointment.user?.lastName}</Card.Text>
              <Card.Text>Tipo de Cita: {appointment.type}</Card.Text>
              <Card.Text>Servicio: {appointment.service?.name || "No asignado"}</Card.Text>
              <Card.Text>Veterinario: {appointment.veterinario?.name || "No asignado"}</Card.Text>
              <Card.Text>Mascota: {appointment.pet?.name || "No asignado"}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    ))}
    {editingAppointment === null && (
      <>
        <h3>Crear Nueva Cita</h3>
        <Form onSubmit={handleCreateAppointment}>
          <Form.Group controlId="formType">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              name="type"
              value={newAppointment.type || ''}
              onChange={handleEditAppointmentChange}
            />
          </Form.Group>
          <Form.Group controlId="formAppointmentDate">
            <Form.Label>Fecha y Hora</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={newAppointment.date || ''}
              onChange={handleEditAppointmentChange}
            />
          </Form.Group>
          <Form.Group controlId="formServiceId">
            <Form.Label>Servicio</Form.Label>
            <Form.Control
              as="select"
              name="service_id"
              value={newAppointment.service_id || ''}
              onChange={handleEditAppointmentChange}
            >
              <option value="">Seleccionar Servicio</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formVeterinarioId">
            <Form.Label>Veterinarios</Form.Label>
            <Form.Control
              as="select"
              name="veterinario_id"
              value={newAppointment.veterinario_id || ''}
              onChange={handleEditAppointmentChange}
            >
              <option value="">Seleccionar Veterinario</option>
              {veterinarios.map((veterinario) => (
                <option key={veterinario.id} value={veterinario.id}>
                  {veterinario.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPetId">
            <Form.Label>Mascota</Form.Label>
            <Form.Control
              as="select"
              name="pet_id"
              value={newAppointment.pet_id || ''}
              onChange={handleEditAppointmentChange}
            >
              <option value="">Seleccionar Mascota</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear Cita
          </Button>
        </Form>
      </>
    )}
  </div>
);

export default AppointmentList;