import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        navigate('/login');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error registrando el usuario:', error);
    }
  };

  return (
    <div className="body-register">
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Regístrate</h2>
          <input
            type="text"
            placeholder="Introduce name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name" 
          />
          <input
            type="email"
            placeholder="Introduce email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email" 
          />
          <input
            type="password"
            placeholder="Introduce password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" 
          />
          <button type="submit" className="register-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;