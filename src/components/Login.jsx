import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="cabecera">
        <img src="/Imagenes/logo sodimac.png" alt="Logo Sodimac" />
      </div>
      
      <div className="contenido">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.usuario}
            onChange={(e) => setFormData({...formData, usuario: e.target.value})}
            placeholder="Usuario"
            required
          />
          <input
            type="password"
            value={formData.contraseña}
            onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
            placeholder="Contraseña"
            required
          />
          <button type="submit" className="neumorphic-button">
            Iniciar Sesión
          </button>
        </form>
        
        <Link to="/recuperar-contrasena">¿Olvidó su contraseña?</Link>
        <Link to="/registro">Regístrese</Link>
      </div>

      <div className="container-img">
        <img src="/Imagenes/logo.jpg" alt="Logo Car Center" />
      </div>
    </div>
  );
};

export default Login;
