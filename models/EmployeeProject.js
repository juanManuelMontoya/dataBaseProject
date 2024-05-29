// models/EmployeeProject.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const EmployeeProject = sequelize.define('employee_projects', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  // Agregar las propiedades "timestamps"
  timestamps: false
});



module.exports = EmployeeProject;
