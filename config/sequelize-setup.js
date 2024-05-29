const { Sequelize } = require('sequelize');

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize('empresa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;
