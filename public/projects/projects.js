// Función para cargar la lista de proyectos
function loadProjects() {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = ''; // Limpiar la lista antes de actualizar
  
        // Crear elementos de la lista para cada proyecto
        data.forEach(project => {
          const projectItem = document.createElement('div');
          projectItem.innerHTML = `
            <p><strong>Nombre:</strong> ${project.name}</p>
            <p><strong>Fecha de Inicio:</strong> ${project.start_date}</p>
            <p><strong>Fecha de Fin:</strong> ${project.end_date}</p>
            <p><strong>ID de Departamento:</strong> ${project.department_id}</p>
            <p><strong>ID de Manager:</strong> ${project.manager_id}</p>
            <button onclick="editProject(${project.id})">Editar</button>
            <button onclick="deleteProject(${project.id})">Eliminar</button>
          `;
          projectList.appendChild(projectItem);
        });
      })
      .catch(error => console.error('Error al cargar proyectos:', error));
  }
  
  // Función para crear o actualizar un proyecto
  function submitProject(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const projectData = Object.fromEntries(formData.entries());
  
    // Determinar si es una creación o una actualización
    const method = form.getAttribute('data-project-id') ? 'PUT' : 'POST';
    let url = '/api/projects';
    if (method === 'PUT') {
      url += `/${form.getAttribute('data-project-id')}`;
    }
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // Limpiar el formulario después de enviar
        loadProjects(); // Recargar la lista de proyectos
      } else {
        throw new Error('Error al crear o actualizar proyecto');
      }
    })
    .catch(error => console.error('Error al enviar datos del proyecto:', error));
  }
  
  // Función para cargar los datos de un proyecto en el formulario para su edición
  function editProject(projectId) {
    fetch(`/api/projects/${projectId}`)
      .then(response => response.json())
      .then(project => {
        const form = document.getElementById('project-form');
        form.setAttribute('data-project-id', projectId);
        form.elements['name'].value = project.name;
        form.elements['start_date'].value = project.start_date;
        form.elements['end_date'].value = project.end_date;
        form.elements['department_id'].value = project.department_id;
        form.elements['manager_id'].value = project.manager_id;
      })
      .catch(error => console.error('Error al cargar datos del proyecto:', error));
  }
  
  // Función para eliminar un proyecto
  function deleteProject(projectId) {
    if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          loadProjects(); // Recargar la lista de proyectos después de eliminar
        } else {
          throw new Error('Error al eliminar proyecto');
        }
      })
      .catch(error => console.error('Error al eliminar proyecto:', error));
    }
  }
  
  // Event listener para enviar el formulario al hacer clic en el botón "Guardar"
  document.getElementById('project-form').addEventListener('submit', submitProject);
  
  // Cargar la lista de proyectos al cargar la página
  loadProjects();
  