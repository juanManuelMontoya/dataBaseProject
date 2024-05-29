// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, role_id, manager_id } = req.body;

  try {
    console.log(first_name);
    const employee = await Employee.create({ first_name, last_name, email, role_id, manager_id });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un empleado
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_Name, last_Name, email, role_id, manager_id } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.update({ first_Name, last_Name, email, role_id, manager_id });
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { first_name, last_name } = req.body;

  try {
    console.log(first_name + last_name);
    const employee = await Employee.findOne({
      where: {
        first_name,
        last_name
      }
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
