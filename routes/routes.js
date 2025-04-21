const express = require('express');
const router = express.Router();

// Rutas de autenticación
router.get('/login', (req, res) => {
  res.sendFile('ProyectoCarCenter.html', { root: './' });
});

router.get('/registro', (req, res) => {
  res.sendFile('Registro.html', { root: './' });
});

// Rutas de servicios
router.get('/historial', (req, res) => {
  res.sendFile('HistorialServicios.html', { root: './' });
});

router.get('/dashboard', (req, res) => {
  res.sendFile('Segundaplantilla.html', { root: './' });
});

module.exports = router;
