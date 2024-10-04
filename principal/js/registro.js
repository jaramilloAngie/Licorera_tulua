document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const SERVER_URL = 'http://localhost:3000';

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        // Validación de los datos
        if (age < 18) {
            alert('Debes ser mayor de 18 años para registrarte.');
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            alert('Ingresa un número de teléfono válido de 10 dígitos.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('Ingresa un correo electrónico válido.');
            return;
        }

        const user = { name, age, phone, email };

        // Indicador de carga
        const submitButton = document.querySelector('.btn-primary');
        submitButton.disabled = true;
        submitButton.textContent = 'Registrando...';

        // Redirigir a la página principal de inmediato
        window.location.href = 'index.html';

        // Enviar datos al servidor
        fetch(`${SERVER_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Puedes usar esta línea para depuración
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al registrar el usuario. Inténtalo de nuevo.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Registrar';
        });
    });
});
