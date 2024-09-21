document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const SERVER_URL = 'http://localhost:5000/api/register'; // Asegúrate de que la URL coincida con la ruta del servidor
  
    userForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Obtener los valores del formulario
      const nombre = document.getElementById('name').value.trim();
      const edad = document.getElementById('age').value;
      const telefono = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const contrasena = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
  
      // Validar que las contraseñas coincidan
      if (contrasena !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
  
      // Validación de edad (mayor a 18)
      if (edad < 18) {
        alert('Debes ser mayor de 18 años para registrarte.');
        return;
      }
  
      // Validación de número de teléfono (10 dígitos)
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(telefono)) {
        alert('Ingresa un número de teléfono válido de 10 dígitos.');
        return;
      }
  
      // Validación de correo electrónico
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        alert('Ingresa un correo electrónico válido.');
        return;
      }
  
      // Crear un objeto con los datos del usuario
      const user = { nombre, edad, telefono, email, contrasena };
  
      // Deshabilitar el botón de enviar para evitar múltiples envíos
      const submitButton = document.querySelector('.btn-primary');
      submitButton.disabled = true;
      submitButton.textContent = 'Registrando...';
  
      // Enviar los datos al servidor
      fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Convertir el objeto a JSON
      })
      .then(response => {
        // Verifica si la respuesta no es exitosa (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Obtener la respuesta en formato JSON
      })
      .then(data => {
        console.log('Usuario registrado:', data);
        alert('Usuario registrado con éxito');
        // Redirigir a la página principal
        window.location.href = 'index.html';
      })
      .catch(error => {
        console.error('Error al registrar el usuario:', error);
        if (error.message.includes('400')) {
          alert('Error: Verifica los campos ingresados.');
        } else if (error.message.includes('500')) {
          alert('Error en el servidor. Inténtalo más tarde.');
        } else {
          alert('Hubo un problema al registrar el usuario. Inténtalo de nuevo.');
        }
      })
      .finally(() => {
        // Volver a habilitar el botón de enviar
        submitButton.disabled = false;
        submitButton.textContent = 'Registrar';
      });
    });
  });