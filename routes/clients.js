// routes/clients.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const client = await Client.create({ name, email, phone, address });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (client) {
      await client.update({ name, email, phone, address });
      res.json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (client) {
      await client.destroy();
      res.json({ message: 'Client deleted successfully' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
