const express = require('express');
const bodyParser = require('body-parser');
const employeesRouter = require('./routes/employee');
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const productsRouter = require('./routes/product');
const employeeProjectsRouter = require('./routes/employeeProjects');
const path = require('path');

const app = express();

const sequelize = require('./config/sequelize-setup'); // Importa la configuración de Sequelize

// Sincroniza los modelos con la base de datos al iniciar el servidor
sequelize.sync().then(() => {
  console.log('Modelos sincronizados correctamente');
}).catch(err => {
  console.error('Error al sincronizar modelos:', err);
});

app.use(bodyParser.json());

// Rutas para empleados
app.use('/api/employees', employeesRouter);

// Rutas para proyectos
app.use('/api/projects', projectsRouter);

// Rutas para clientes
app.use('/api/clients', clientsRouter);

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para asociaciones entre empleado y proyecto
app.use('/api/employee-projects', employeeProjectsRouter);

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
