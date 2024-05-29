const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('empresa', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Product = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  // Agregar las propiedades "timestamps"
  timestamps: false
});

module.exports = Product;

