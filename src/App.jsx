import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import ServiceHistory from './components/ServiceHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-contrasena" element={<RecoverPassword />} />
        <Route path="/historial" element={<ServiceHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
