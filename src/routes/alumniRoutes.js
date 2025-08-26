const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// GET all alumni
router.get('/', alumniController.getAllAlumni);

// GET single alumni by id
router.get('/:id', alumniController.getAlumniById);

module.exports = router;
