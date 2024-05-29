const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  manager_id: {
    type: DataTypes.INTEGER
  }
}, {
  // Agregar las propiedades "timestamps"
  timestamps: false
});

module.exports = Employee;
