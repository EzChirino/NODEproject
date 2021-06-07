const express = require("express");

const router = express.Router();

const personasControllers = require('../controllers/personas-controllers');

// => /categoria/
router.get('/', personasControllers.getPersonas);
router.get('/:id', personasControllers.getPersonasPorId);
router.post('/', personasControllers.postPersonas);
router.patch('/:id', personasControllers.updatePersonas);
router.delete('/:id', personasControllers.deletePersonas);

module.exports = router;
