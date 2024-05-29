// Función para cargar la lista de asociaciones entre empleados y productos
function loadEmployeeProducts() {
    fetch('/api/employee-projects')
      .then(response => response.json())
      .then(data => {
        const employeeProductList = document.getElementById('employee-product-list');
        employeeProductList.innerHTML = ''; // Limpiar la lista antes de actualizar
  
        // Crear elementos de la lista para cada asociación
        data.forEach(employeeProduct => {
          const employeeProductItem = document.createElement('div');
          employeeProductItem.innerHTML = `
            <p><strong>ID de Empleado:</strong> ${employeeProduct.employee_id}</p>
            <p><strong>ID de Producto:</strong> ${employeeProduct.project_id}</p>
            <button onclick="deleteEmployeeProduct(${employeeProduct.id})">Eliminar</button>
          `;
          employeeProductList.appendChild(employeeProductItem);
        });
      })
      .catch(error => console.error('Error al cargar asociaciones entre empleados y productos:', error));
  }
  
  // Función para asociar un producto a un empleado
  function submitEmployeeProduct(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const employeeProductData = Object.fromEntries(formData.entries());
  
    fetch('/api/employee-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeProductData)
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // Limpiar el formulario después de enviar
        loadEmployeeProducts(); // Recargar la lista de asociaciones
      } else {
        throw new Error('Error al asociar empleado y producto');
      }
    })
    .catch(error => console.error('Error al enviar datos de asociación entre empleado y producto:', error));
  }
  
  // Función para eliminar una asociación entre empleado y producto
  function deleteEmployeeProduct(employeeProductId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asociación entre empleado y producto?')) {
      fetch(`/api/employee-projects/${employeeProductId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          loadEmployeeProducts(); // Recargar la lista de asociaciones después de eliminar
        } else {
          throw new Error('Error al eliminar asociación entre empleado y producto');
        }
      })
      .catch(error => console.error('Error al eliminar asociación entre empleado y producto:', error));
    }
  }
  
  // Event listener para enviar el formulario al hacer clic en el botón "Guardar"
  document.getElementById('employee-product-form').addEventListener('submit', submitEmployeeProduct);
  
  // Cargar la lista de asociaciones al cargar la página
  loadEmployeeProducts();
  