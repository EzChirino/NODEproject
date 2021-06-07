const express = require("express");

const router = express.Router();

const librosControllers = require('../controllers/libros-controllers');

// => /Libros/
router.get('/', librosControllers.getLibros);
router.post('/', librosControllers.postLibro);
router.get('/:id', librosControllers.getLibroPorId);
router.patch('/:id', librosControllers.updateLibro);
router.delete('/:id', librosControllers.deleteLibro);

module.exports = router;