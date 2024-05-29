// Función para cargar la lista de empleados
function loadEmployees() {
  fetch('/api/employees')
    .then(response => response.json())
    .then(data => {
      const employeeList = document.getElementById('employee-list');
      employeeList.innerHTML = ''; // Limpiar la lista antes de actualizar

      // Crear elementos de la lista para cada empleado
      data.forEach(employee => {
        const employeeItem = document.createElement('div');
        employeeItem.innerHTML = `
          <p><strong>Nombre:</strong> ${employee.first_name} ${employee.last_name}</p>
          <p><strong>Correo Electrónico:</strong> ${employee.email}</p>
          <p><strong>ID de Rol:</strong> ${employee.role_id}</p>
          <p><strong>ID de Manager:</strong> ${employee.manager_id}</p>
          <button onclick="editEmployee(${employee.id})">Editar</button>
          <button onclick="deleteEmployee(${employee.id})">Eliminar</button>
        `;
        employeeList.appendChild(employeeItem);
      });
    })
    .catch(error => console.error('Error al cargar empleados:', error));
}

// Función para crear o actualizar un empleado
function submitEmployee(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const employeeData = Object.fromEntries(formData.entries());

  // Determinar si es una creación o una actualización
  const method = form.getAttribute('data-employee-id') ? 'PUT' : 'POST';
  let url = '/api/employees';
  if (method === 'PUT') {
    url += `/${form.getAttribute('data-employee-id')}`;
  }

  console.log(JSON.stringify(employeeData));

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
  .then(response => {
    if (response.ok) {
      form.reset(); // Limpiar el formulario después de enviar
      loadEmployees(); // Recargar la lista de empleados
    } else {
      throw new Error('Error al crear o actualizar empleado');
    }
  })
  .catch(error => console.error('Error al enviar datos de empleado:', error));
}

// Función para cargar los datos de un empleado en el formulario para su edición
function editEmployee(employeeId) {
  fetch(`/api/employees/${employeeId}`)
    .then(response => response.json())
    .then(employee => {
      const form = document.getElementById('employee-form');
      form.setAttribute('data-employee-id', employeeId);
      form.elements['first_name'].value = employee.first_name;
      form.elements['last_name'].value = employee.last_name;
      form.elements['email'].value = employee.email;
      form.elements['role_id'].value = employee.role_id;
    })
    .catch(error => console.error('Error al cargar datos del empleado:', error));
}

// Función para eliminar un empleado
function deleteEmployee(employeeId) {
  if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
    fetch(`/api/employees/${employeeId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        loadEmployees(); // Recargar la lista de empleados después de eliminar
      } else {
        throw new Error('Error al eliminar empleado');
      }
    })
    .catch(error => console.error('Error al eliminar empleado:', error));
  }
}

// Event listener para enviar el formulario al hacer clic en el botón "Guardar"
document.getElementById('employee-form').addEventListener('submit', submitEmployee);

// Cargar la lista de empleados al cargar la página
loadEmployees();
