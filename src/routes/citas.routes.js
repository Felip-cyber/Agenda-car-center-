const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const [citas] = await pool.query('SELECT * FROM citas');
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    try {
        const { cliente_id, empleado_id, fecha } = req.body;
        const [result] = await pool.query(
            'INSERT INTO citas (cliente_id, empleado_id, fecha) VALUES (?, ?, ?)',
            [cliente_id, empleado_id, fecha]
        );
        res.status(201).json({ id: result.insertId, message: 'Cita creada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;