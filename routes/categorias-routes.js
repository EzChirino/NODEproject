const express = require("express");

const router = express.Router();

const categoriaControllers = require('../controllers/categorias-controllers');

// => /categoria/
router.get('/', categoriaControllers.getCategorias);
router.get('/:id', categoriaControllers.getCategoriaPorId);
router.post('/', categoriaControllers.postCategoria);
router.patch('/:id', categoriaControllers.updateCategoria);
router.delete('/:id', categoriaControllers.deleteCategoria);

module.exports = router;