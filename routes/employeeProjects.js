// routes/employeeProjects.js
const express = require('express');
const router = express.Router();
const EmployeeProject = require('../models/EmployeeProject')

// Obtener todas las asociaciones entre empleados y proyectos
router.get('/', async (req, res) => {
    try {
      const employeeProjects = await EmployeeProject.findAll();
      res.json(employeeProjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Crear una nueva asociación entre empleado y proyecto
router.post('/', async (req, res) => {
  const { employee_id, project_id } = req.body;
  try {
    const association = await EmployeeProject.create({ employee_id, project_id });
    res.status(201).json(association);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
