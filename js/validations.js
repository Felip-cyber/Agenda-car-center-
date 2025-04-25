function validarLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    if (!usuario || !password) {
        mostrarError('Todos los campos son requeridos');
        return false;
    }
    
    // Aquí iría la llamada a la API de autenticación
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard';
        } else {
            mostrarError(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarError('Error al intentar iniciar sesión');
    });
}

function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}