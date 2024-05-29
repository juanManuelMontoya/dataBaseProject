// models/Client.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Client = sequelize.define('Clients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  // Agregar las propiedades "timestamps"
  timestamps: false
});

module.exports = Client;
