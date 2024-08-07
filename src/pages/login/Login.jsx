import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Login.css";
import { CustomInput } from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../services/auth.services";
import { useAuth } from "../../contexts/auth-context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { logan } = useAuth(); 

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      setErrorMsg("Todos los campos son requeridos");
      return;
    }

    try {
      const token = await login(credentials);
      const decoded = jwtDecode(token);

      if (token) {
        const userToken = {
          token: token,
          decoded: decoded,
        };

        logan(userToken);

        if (decoded.userRoleName === "super_admin") {
          navigate("/Admin");
        } else if (decoded.userRoleName === "user") {
          navigate("/Profile");
        } else {
          setErrorMsg("Rol de usuario desconocido");
        }
      } else {
        console.log("Login sin éxito");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMsg("Error en el inicio de sesión");
    }
  };

  return (
    <div className="login-body">
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Centro de Mascotas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <CustomInput
            type="email"
            name="email"
            placeholder="Introduce email"
            value={credentials.email}
            handler={inputHandler}
          />
          <CustomInput
            type="password"
            name="password"
            placeholder="Introduce password"
            value={credentials.password}
            handler={inputHandler}
          />
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}