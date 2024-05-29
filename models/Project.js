const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  department_id: {
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

module.exports = Project;
