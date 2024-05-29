// Función para cargar la lista de clientes
function loadClients() {
    fetch('/api/clients')
      .then(response => response.json())
      .then(data => {
        const clientList = document.getElementById('client-list');
        clientList.innerHTML = ''; // Limpiar la lista antes de actualizar
  
        // Crear elementos de la lista para cada cliente
        data.forEach(client => {
          const clientItem = document.createElement('div');
          clientItem.innerHTML = `
            <p><strong>Nombre:</strong> ${client.name}</p>
            <p><strong>Correo Electrónico:</strong> ${client.email}</p>
            <button onclick="editClient(${client.id})">Editar</button>
            <button onclick="deleteClient(${client.id})">Eliminar</button>
          `;
          clientList.appendChild(clientItem);
        });
      })
      .catch(error => console.error('Error al cargar clientes:', error));
  }
  
  // Función para crear o actualizar un cliente
  function submitClient(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const clientData = Object.fromEntries(formData.entries());
  
    // Determinar si es una creación o una actualización
    const method = form.getAttribute('data-client-id') ? 'PUT' : 'POST';
    let url = '/api/clients';
    if (method === 'PUT') {
      url += `/${form.getAttribute('data-client-id')}`;
    }
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // Limpiar el formulario después de enviar
        loadClients(); // Recargar la lista de clientes
      } else {
        throw new Error('Error al crear o actualizar cliente');
      }
    })
    .catch(error => console.error('Error al enviar datos del cliente:', error));
  }
  
  // Función para cargar los datos de un cliente en el formulario para su edición
  function editClient(clientId) {
    fetch(`/api/clients/${clientId}`)
      .then(response => response.json())
      .then(client => {
        const form = document.getElementById('client-form');
        form.setAttribute('data-client-id', clientId);
        form.elements['name'].value = client.name;
        form.elements['email'].value = client.email;
      })
      .catch(error => console.error('Error al cargar datos del cliente:', error));
  }
  
  // Función para eliminar un cliente
  function deleteClient(clientId) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      fetch(`/api/clients/${clientId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          loadClients(); // Recargar la lista de clientes después de eliminar
        } else {
          throw new Error('Error al eliminar cliente');
        }
      })
      .catch(error => console.error('Error al eliminar cliente:', error));
    }
  }
  
  // Event listener para enviar el formulario al hacer clic en el botón "Guardar"
  document.getElementById('client-form').addEventListener('submit', submitClient);
  
  // Cargar la lista de clientes al cargar la página
  loadClients();
  