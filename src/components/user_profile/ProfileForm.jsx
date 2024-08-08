import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { updateProfile } from "../../services/userCall";
import { useAuth } from "../../contexts/auth-context/AuthContext";

const ProfileForm = ({ profileData, setProfileData }) => {
  const { userToken } = useAuth();
  const [email, setEmail] = useState(profileData.email);
  const [editing, setEditing] = useState(false);

  const editInputHandler = (e) => {
    const { name, value } = e.target;
    setEmail(name === "email" ? value : email);
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profileData, userToken.token);
      if (response.success) setEditing(false);
      else console.log("Error al guardar los datos:", response.error);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <Form onSubmit={submitChanges}>
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
  );
};

export default ProfileForm;