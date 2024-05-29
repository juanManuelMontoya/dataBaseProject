// Función para cargar la lista de productos
function loadProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar la lista antes de actualizar
  
        // Crear elementos de la lista para cada producto
        data.forEach(product => {
          const productItem = document.createElement('div');
          productItem.innerHTML = `
            <p><strong>Nombre:</strong> ${product.name}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Eliminar</button>
          `;
          productList.appendChild(productItem);
        });
      })
      .catch(error => console.error('Error al cargar productos:', error));
  }
  
  // Función para crear o actualizar un producto
  function submitProduct(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());
  
    // Determinar si es una creación o una actualización
    const method = form.getAttribute('data-product-id') ? 'PUT' : 'POST';
    let url = '/api/products';
    if (method === 'PUT') {
      url += `/${form.getAttribute('data-product-id')}`;
    }
  
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // Limpiar el formulario después de enviar
        loadProducts(); // Recargar la lista de productos
      } else {
        throw new Error('Error al crear o actualizar producto');
      }
    })
    .catch(error => console.error('Error al enviar datos del producto:', error));
  }
  
  // Función para cargar los datos de un producto en el formulario para su edición
  function editProduct(productId) {
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        const form = document.getElementById('product-form');
        form.setAttribute('data-product-id', productId);
        form.elements['name'].value = product.name;
        form.elements['price'].value = product.price;
      })
      .catch(error => console.error('Error al cargar datos del producto:', error));
  }
  
  // Función para eliminar un producto
  function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          loadProducts(); // Recargar la lista de productos después de eliminar
        } else {
          throw new Error('Error al eliminar producto');
        }
      })
      .catch(error => console.error('Error al eliminar producto:', error));
    }
  }
  
  // Event listener para enviar el formulario al hacer clic en el botón "Guardar"
  document.getElementById('product-form').addEventListener('submit', submitProduct);
  
  // Cargar la lista de productos al cargar la página
  loadProducts();
  