// Simulación de datos de empleados
const employees = [
    { username: 'julian', password: '123456' },
    { username: 'usuario2', password: 'contraseña2' },
    // Agregar más empleados según sea necesario
  ];
  
  // Función para manejar el inicio de sesión
  function handleLogin(event) {
    event.preventDefault();
  
    const form = event.target;
    const username = form.elements['first_name'].value;
    const password = form.elements['last_name'].value;
    const formData = new FormData(form);
    const employeeLogin = Object.fromEntries(formData.entries());

    console.log(username + password);

    let url = '/api/employees/login';
    const method = form.getAttribute('data-employee-id') ? 'PUT' : 'POST';

    console.log(JSON.stringify(employeeLogin));
    fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeLogin)
      })
      .then(response => {
        if (response.ok) {
          form.reset(); // Limpiar el formulario después de enviar
          window.location.href = '../index.html';   // Si las credenciales son correctas, redireccionar a la página de inicio
        } else {
            const loginMessage = document.getElementById('login-message');
            loginMessage.textContent = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            loginMessage.style.color = 'red';
        }
      })
      .catch(error => console.error('Error al enviar datos de empleado:', error));
  
    // Verificar si las credenciales son válidas
    const employee = employees.find(emp => emp.username === username && emp.password === password);
  }
  
  // Event listener para enviar el formulario al hacer clic en el botón "Iniciar Sesión"
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  