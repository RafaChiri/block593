document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    // Escuchamos cuando el usuario hace clic en el botón de confirmar
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Detenemos el envío para validar primero
        
        let isValid = true;

        // Función interna para validar cada campo y mostrar el texto rojo
        function validarCampo(idInput, idError, condicion, mensaje) {
            const campo = document.getElementById(idInput);
            const spanError = document.getElementById(idError);
            
            if (condicion) {
                campo.classList.add('no-valid'); // Pone el borde rojo
                spanError.textContent = mensaje; // Escribe el error
                spanError.style.display = 'block'; // Muestra el texto
                return false;
            } else {
                campo.classList.remove('no-valid');
                spanError.style.display = 'none'; // Esconde el error
                return true;
            }
        }

        // --- VALIDACIONES INDIVIDUALES ---

        // Validar Nombre (mínimo 3 caracteres)
        if (!validarCampo('nombre', 'err-nombre', 
            document.getElementById('nombre').value.trim().length < 3, 
            'ESCRIBE TU NOMBRE COMPLETO')) isValid = false;

        // Validar Ciudad (no vacío)
        if (!validarCampo('ciudad', 'err-ciudad', 
            document.getElementById('ciudad').value.trim() === "", 
            'ESTE CAMPO ES OBLIGATORIO')) isValid = false;

        // Validar Email (formato correo)
        const email = document.getElementById('email').value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validarCampo('email', 'err-email', 
            !regexEmail.test(email), 
            'INTRODUCE UN EMAIL VÁLIDO')) isValid = false;

        // Validar Asunto
        if (!validarCampo('asunto', 'err-asunto', 
            document.getElementById('asunto').value.trim() === "", 
            'DANOS UN MOTIVO')) isValid = false;

        // Validar Descripción (mínimo 10 caracteres)
        if (!validarCampo('descripcion', 'err-desc', 
            document.getElementById('descripcion').value.trim().length < 10, 
            'CUÉNTANOS UN POCO MÁS (MÍN. 10 CARACTERES)')) isValid = false;

        // SI TODO ESTÁ BIEN
        if (isValid) {
            // Feedback visual en el botón
            const btn = document.querySelector('.btn-primary');
            const textoOriginal = btn.textContent;
            
            btn.textContent = "¡ENVIADO CON ÉXITO!";
            btn.style.backgroundColor = "#28a745"; // Verde éxito temporal
            
            // Limpiar formulario y resetear botón después de 3 segundos
            setTimeout(() => {
                form.reset();
                btn.textContent = textoOriginal;
                btn.style.backgroundColor = ""; // Vuelve al color del CSS
            }, 3000);
        }
    });
});