import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Form,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../../services/userCall";
import {
  createVeterinario,
  getAllVeterinarios,
  updateVeterinarioById,
  deleteVeterinarioById,
} from "../../services/veterinariosCall";
import {
  getAllAppointments,
  getUserAppointments,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
} from "../../services/appointment";
import { getAllServices } from "../../services/serviceCall";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import UserList from "../../components/listas/UserList";
import VeterinarioList from "../../components/listas/VeterinarioList";
import AppointmentList from "../../components/listas/AppointmentList";
import "./UserProfile.css";
import { useAuth } from "../../contexts/auth-context/AuthContext";

export default function UserProfile({ isAdmin }) {
  const [profileData, setProfileData] = useState(null);
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [showVeterinarios, setShowVeterinarios] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    name: "",
    email: "",
  });
  const [editVeterinarioForm, setEditVeterinarioForm] = useState({
    name: "",
    especialidad: "",
  });
  const [error, setError] = useState(null);
  const [showVeterinarioForm, setShowVeterinarioForm] = useState(false);
  const [editingVeterinario, setEditingVeterinario] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointment_date: "",
    service_id: "",
    veterinario_id: "",
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const navigate = useNavigate();
  const { userToken, logan, logout } = useAuth();

  useEffect(() => {
    const token = userToken?.token;
    const userId = userToken?.decoded.userId;

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, usersRes, veterinariosRes, servicesRes, appointmentsRes] =
          await Promise.all([
            getProfile(token),
            isAdmin ? getAllUsers(token) : Promise.resolve({ success: false }),
            getAllVeterinarios(token),
            getAllServices(token),
            isAdmin
              ? getAllAppointments(token)
              : getUserAppointments(userId, token),
          ]);

        if (profileRes.success) {
          setProfileData(profileRes.data);
          setEmail(profileRes.data.email);
        } else {
          console.error(
            "Error al recuperar los datos del perfil:",
            profileRes.message
          );
        }

        if (usersRes.success && Array.isArray(usersRes.data)) {
          setUsers(usersRes.data);
          setFilteredUsers(usersRes.data);
        } else if (isAdmin) {
          console.error("Expected array of users, received:", usersRes);
          setError("Error al obtener usuarios: respuesta inesperada.");
        }

        if (veterinariosRes.success && Array.isArray(veterinariosRes.data)) {
          setVeterinarios(veterinariosRes.data);
        } else {
          console.error("Expected array of veterinario, received:", veterinariosRes);
          setError("Error al obtener veterinarios: respuesta inesperada.");
        }

        if (servicesRes.success && Array.isArray(servicesRes.data)) {
          setServices(servicesRes.data);
        } else {
          console.error("Expected array of services, received:", servicesRes);
          setError("Error al obtener servicios: respuesta inesperada.");
        }

        if (appointmentsRes.success) {
          setUserAppointments(appointmentsRes.data);
        } else {
          setError(
            isAdmin
              ? "Error al obtener todas las citas."
              : "Error al obtener citas del usuario."
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error al obtener datos.");
      }
    };

    fetchData();
  }, [editing, userToken, navigate, isAdmin]);

  const editInputHandler = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitChanges = async () => {
    try {
      const response = await updateProfile(profileData, userToken.token);
      if (response.success) setEditing(false);
      else console.log("Error al guardar los datos:", response.error);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const handleEditUserClick = (user) => {
    setEditingUser(editingUser === user.id ? null : user.id);
    setEditForm(
      editingUser === user.id
        ? { name: "", lastName: "", email: "" }
        : user
    );
  };

  const handleEditUserChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(
        { id: editingUser, ...editForm },
        userToken.token
      );
      if (response.success) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser ? { ...user, ...editForm } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditingUser(null);
      } else {
        console.error("Error al actualizar el usuario:", response.message);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleDeleteUserClick = async (userId) => {
    try {
      const response = await deleteUserById(userId, userToken.token);
      if (response.success) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error("Error al eliminar el usuario:", response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const handleCreateVeterinario = async () => {
    try {
      const response = await createVeterinario(editVeterinarioForm, userToken.token);
      if (response.success) {
        setVeterinarios([...veterinarios, response.data]);
        setShowVeterinarioForm(false);
        setEditVeterinarioForm({ name: "", especialidad: "" });
      } else {
        console.error("Error al crear el veterinario:", response.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditVeterinarioClick = (veterinario) => {
    setEditingVeterinario(editingVeterinario === veterinario.id ? null : veterinario.id);
    setEditVeterinarioForm(
      editingVeterinario === veterinario.id
        ? { name: "", especialidad: "" }
        : veterinario
    );
  };

  const handleEditVeterinarioChange = (e) =>
    setEditVeterinarioForm({ ...editVeterinarioForm, [e.target.name]: e.target.value });

  const handleEditVeterinarioSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateVeterinarioById(
        { id: editingVeterinario, ...editVeterinarioForm },
        userToken.token
      );
      if (response.success) {
        const updatedVeterinarios = veterinarios.map((veterinario) =>
          veterinario.id === editingVeterinario
            ? { ...veterinario, ...editVeterinarioForm }
            : veterinario
        );
        setVeterinarios(updatedVeterinarios);
        setEditingVeterinario(null);
      } else {
        console.error("Error al actualizar el veterniario:", response.message);
      }
    } catch (error) {
      console.error("Error al actualizar el veterinario:", error);
    }
  };

  const handleDeleteVeterinarioClick = async (veterinarioId) => {
    try {
      const response = await deleteVeterinarioById(veterinarioId, userToken.token);
      if (response.success) {
        const updatedVeterinarios = veterinarios.filter(
          (veterinario) => veterinario.id !== veterinarioId
        );
        setVeterinarios(updatedVeterinarios);
      } else {
        console.error("Error al eliminar el veterinarios:", response.message);
      }
    } catch (error) {
      console.error("Error al eliminar el veterinario:", error);
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await createAppointment(
        { ...newAppointment, user_id: profileData.id },
        userToken.token
      );
      if (response.success) {
        setUserAppointments([...userAppointments, response.appointment]);
        setNewAppointment({
          appointment_date: "",
          service_id: "",
          veterinario_id: "",
        });
      } else {
        setError("Error al crear la cita.");
      }
    } catch (error) {
      setError("Error al crear la cita.");
    }
  };

  const handleEditAppointmentClick = (appointment) => {
    setEditingAppointment(appointment.id);
    setNewAppointment({
      appointment_date: appointment.appointment_date,
      service_id: appointment.service_id || "",
      veterinario_id: appointment.veterinario_id || "",
    });
  };

  const handleEditAppointmentChange = (e) =>
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value || "",
    });

  const handleEditAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAppointmentById(
        { id: editingAppointment, ...newAppointment },
        userToken.token
      );
      if (response.success) {
        const updatedAppointments = userAppointments.map((appointment) =>
          appointment.id === editingAppointment
            ? { ...appointment, ...newAppointment }
            : appointment
        );
        setUserAppointments(updatedAppointments);
        setEditingAppointment(null);
      } else {
        setError("Error al actualizar la cita.");
      }
    } catch (error) {
      setError("Error al actualizar la cita.");
    }
  };

  const handleDeleteAppointmentClick = async (appointmentId) => {
    try {
      const response = await deleteAppointmentById(appointmentId, userToken.token);
      if (response.success) {
        setUserAppointments(
          userAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      } else {
        setError("Error al eliminar la cita.");
      }
    } catch (error) {
      setError("Error al eliminar la cita.");
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => {
              setShowUsers(false);
              setEditing(false);
              setShowVeterinarios(false);
              setShowAppointments(false);
            }}
          >
            Centro de Mascota
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdmin ? (
                <>
                  <Nav.Link
                    onClick={() => {
                      setShowUsers(true);
                      setShowVeterinarios(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Usuarios
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowVeterinarios(true);
                      setShowUsers(false);
                      setShowAppointments(false);
                      navigate("/admin");
                    }}
                  >
                    Veterinarios
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowVeterinarios(false);
                      navigate("/admin");
                    }}
                  >
                    Citas
                  </Nav.Link>{" "}
                  <Nav.Link as={Link} to="/">
                    Ver Servicios
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    Ver Servicios
                  </Nav.Link>
                  <Nav.Link as={Link} to="/galeria">
                    Galería
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Veterinarios
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShowAppointments(true);
                      setShowUsers(false);
                      setShowVeterinarios(false);
                    }}
                  >
                    Mis Citas
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown
                title={profileData.name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    logout();
                    navigate("/login");
                  }}
                >
                  Cerrar Sesion
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {editing ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitChanges();
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={editInputHandler}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={editInputHandler}
                />
              </Form.Group>
            </Row>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={editInputHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        ) : showUsers ? (
          <UserList
            users={filteredUsers}
            filter={filter}
            setFilter={setFilter}
            handleEditUserClick={handleEditUserClick}
            handleDeleteUserClick={handleDeleteUserClick}
            editingUser={editingUser}
            handleEditUserSubmit={handleEditUserSubmit}
            handleEditUserChange={handleEditUserChange}
            editForm={editForm}
          />
        ) : showVeterinarios ? (
          isAdmin ? (
            <VeterinarioList
              veterinarios={veterinarios}
              handleEditVeterinarioClick={handleEditVeterinarioClick}
              handleDeleteVeterinarioClick={handleDeleteVeterinarioClick}
              editingVeterinario={editingVeterinario}
              handleEditVeterinarioSubmit={handleEditVeterinarioSubmit}
              handleEditVeterinarioChange={handleEditVeterinarioChange}
              editVeterinarioForm={editVeterinarioForm}
              showVeterinarioForm={showVeterinarioForm}
              setShowVeterinarioForm={setShowVeterinarioForm}
              handleCreateVeterinario={handleCreateVeterinario}
            />
          ) : (
            <VeterinarioList veterinarios={veterinarios} />
          )
        ) : showAppointments ? (
          isAdmin ? (
            <AppointmentList
              appointments={userAppointments}
              users={users}
              services={services}
              veterinarios={veterinarios}
              handleEditAppointmentClick={handleEditAppointmentClick}
              handleDeleteAppointmentClick={handleDeleteAppointmentClick}
              editingAppointment={editingAppointment}
              handleEditAppointmentChange={handleEditAppointmentChange}
              handleEditAppointmentSubmit={handleEditAppointmentSubmit}
              newAppointment={newAppointment}
              handleCreateAppointment={handleCreateAppointment}
            />
          ) : (
            <div>
              <h3>Mis Citas</h3>
              {userAppointments.map((appointment) => (
                <Card key={appointment.id} className="mb-4">
                  <Card.Body>
                    <Card.Title>
                      {new Date(appointment.appointment_date).toLocaleString()}
                      <Button
                        className="ms-2"
                        onClick={() => handleEditAppointmentClick(appointment)}
                      >
                        Editar
                      </Button>
                      <Button
                        className="ms-2"
                        onClick={() =>
                          handleDeleteAppointmentClick(appointment.id)
                        }
                      >
                        Eliminar
                      </Button>
                    </Card.Title>
                    <Card.Text>
                      Servicio:{" "}
                      {appointment.service
                        ? appointment.service.service_name
                        : "No asignado"}
                    </Card.Text>
                    <Card.Text>
                      Veterinario:{" "}
                      {appointment.veterinario
                        ? appointment.veterinario.name
                        : "No asignado"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <h3>Crear Nueva Cita</h3>
              <Form onSubmit={handleCreateAppointment}>
                <Form.Group controlId="formAppointmentDate">
                  <Form.Label>Fecha y Hora</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="appointment_date"
                    value={newAppointment.appointment_date}
                    onChange={handleEditAppointmentChange}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceId">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Control
                    as="select"
                    name="service_id"
                    value={newAppointment.service_id}
                    onChange={handleEditAppointmentChange}
                  >
                    <option value="">Seleccionar Servicio</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.service_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formVeterinarioId">
                  <Form.Label>Veterinario</Form.Label>
                  <Form.Control
                    as="select"
                    name="veterinario_id"
                    value={newAppointment.veterinario_id}
                    onChange={handleEditAppointmentChange}
                  >
                    <option value="">Seleccionar veterinarios</option>
                    {veterinarios.map((veterinario) => (
                      <option key={veterinario.id} value={veterinario.id}>
                        {veterinario.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {editingAppointment ? "Actualizar Cita" : "Crear Cita"}
                </Button>
              </Form>
            </div>
          )
        ) : (
          <Row className="justify-content-center">
            <h1>Bienvenido, {profileData.name}!</h1>
          </Row>
        )}

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
              <Form.Label>Bio</Form.Label>
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
      </Container>
    </div>
  );
}