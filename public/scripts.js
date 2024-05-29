// Función para cargar las vistas al hacer clic en los enlaces del navbar
function loadView(viewName) {
    fetch(`/api/${viewName}`)
      .then(response => response.json())
      .then(data => {
        // Aquí puedes trabajar con los datos recibidos para mostrar la vista correspondiente
        // Por ejemplo, podrías generar una tabla si los datos son una lista de objetos
        // Luego, puedes añadir la tabla al div con id "main-content"
        console.log(`Datos de ${viewName}:`, data);
      })
      .catch(error => console.error(`Error al cargar ${viewName}:`, error));
  }
  
  // Función para activar la vista correspondiente al hacer clic en un enlace del navbar
  function activateView(event) {
    event.preventDefault();
    const viewName = event.target.id.split('-')[0] + 's'; // Agrega 's' al final para hacer coincidir con el nombre de la ruta del servicio REST
    loadView(viewName);
  }
  
  // Event listener para los enlaces del navbar
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', activateView);
  });
  
  // Carga una vista predeterminada al cargar la página
  loadView('employees');
  