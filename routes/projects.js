// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
  const { name, start_date, end_date, department_id, manager_id } = req.body;
  try {
    const project = await Project.create({ name, start_date, end_date, department_id, manager_id });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, start_date, end_date, department_id, manager_id } = req.body;
  try {
    const project = await Project.findByPk(id);
    if (project) {
      await project.update({ name, start_date, end_date, department_id, manager_id });
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (project) {
      await project.destroy();
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
