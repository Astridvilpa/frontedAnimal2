import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Alert, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProfileForm from "../../components/user_profile/ProfileForm";
import UserListContainer from "../../components/user_profile/UserListContainer";
import VeterinarioListContainer from "../../components/user_profile/VeterinarioListContainer";
import AppointmentListContainer from "../../components/user_profile/AppointmentListContainer";
import "./UserProfile.css";
import { useAuth } from "../../contexts/auth-context/AuthContext";
import { getProfile } from "../../services/userCall"; // Asegúrate de que esta línea esté presente y correcta

export default function UserProfile({ isAdmin }) {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [showSection, setShowSection] = useState('');
  const navigate = useNavigate();
  const { userToken, logout } = useAuth();

  useEffect(() => {
    const token = userToken?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileRes = await getProfile(token);

        if (profileRes.success) {
          setProfileData(profileRes.data);
        } else {
          console.error("Error al recuperar los datos del perfil:", profileRes.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error al obtener datos.");
      }
    };

    fetchProfile();
  }, [userToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    logout();
    navigate("/login");
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={() => setShowSection('')}>
            Centro de Mascota
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAdmin && (
                <>
                  <Nav.Link onClick={() => setShowSection('users')}>Usuarios</Nav.Link>
                  <Nav.Link onClick={() => setShowSection('veterinarios')}>Veterinarios</Nav.Link>
                  <Nav.Link onClick={() => setShowSection('appointments')}>Citas</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/">Ver Servicios</Nav.Link>
              {!isAdmin && (
                <>
                  <Nav.Link as={Link} to="/galeria">Galería</Nav.Link>
                  <Nav.Link onClick={() => setShowSection('appointments')}>Mis Citas</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown title={profileData.name} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => setShowSection('profile')}>Editar Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Cerrar Sesion</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {showSection === 'profile' && <ProfileForm profileData={profileData} setProfileData={setProfileData} />}
        {showSection === 'users' && <UserListContainer isAdmin={isAdmin} />}
        {showSection === 'veterinarios' && <VeterinarioListContainer isAdmin={isAdmin} />}
        {showSection === 'appointments' && (
          <AppointmentListContainer isAdmin={isAdmin} userId={profileData.id} />
        )}
        {!showSection && (
          <Row className="justify-content-center">
            <h1>Bienvenido, {profileData.name}!</h1>
          </Row>
        )}
      </Container>
    </div>
  );
}