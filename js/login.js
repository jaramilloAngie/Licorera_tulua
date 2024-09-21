document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const USERS_URL = 'http://localhost:5000/api/users'; // URL de la ruta para obtener todos los usuarios
  
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Obtener los valores del formulario
      const email = document.getElementById('loginEmail').value.trim();
      const contrasena = document.getElementById('loginPassword').value.trim();
  
      // Deshabilitar el botón de enviar para evitar múltiples envíos
      const submitButton = document.querySelector('.btn-primary');
      submitButton.disabled = true;
      submitButton.textContent = 'Iniciando sesión...';
  
      // Enviar los datos al servidor
      fetch(USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contrasena }) // Convertir el objeto a JSON
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
        if (data.message === 'Inicio de sesión exitoso') {
          console.log('Inicio de sesión exitoso:', data.user);
          alert('Inicio de sesión exitoso');
          // Redirigir a la página principal o a donde desees después del inicio de sesión
          window.location.href = 'index.html';
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo de nuevo.');
      })
      .finally(() => {
        // Volver a habilitar el botón de enviar
        submitButton.disabled = false;
        submitButton.textContent = 'Iniciar Sesión';
      });
    });
  });