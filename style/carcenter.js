// Función para validar el formulario de login
function validarLogin() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmarContraseña = document.getElementById('confirmarContraseña').value;
    const iPhone = document.getElementById('iPhone').value;

    if (usuario.length < 3) {
        alert('El usuario debe tener al menos 3 caracteres');
        return false;
    }

    if (contraseña.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    if (contraseña !== confirmarContraseña) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    const phoneRegex = /^(\+57|57)?[0-9]{10}$/;
    if (!phoneRegex.test(iPhone.replace(/\s+/g, ''))) {
        alert('Por favor ingrese un número de teléfono válido (10 dígitos)');
        return false;
    }

    return true;
}

// Funciones UI
function mostrarConfirmacion(mensaje) {
    alert(mensaje);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('loginForm');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            if (!validarLogin()) {
                e.preventDefault();
            }
        });
    }
});