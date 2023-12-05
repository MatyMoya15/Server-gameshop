// Rutas para juegos
const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juego.controller');

// Crear un nuevo juego
router.post('/', juegoController.crearJuego);

// Obtener todos los juegos
router.get('/', juegoController.obtenerJuegos);

// Obtener un juego por ID
router.get('/:id', juegoController.obtenerJuegoPorId);

// Actualizar un juego por ID
router.put('/:id', juegoController.actualizarJuego);

// Eliminar un juego por ID
router.delete('/:id', juegoController.eliminarJuego);

module.exports = router;
