// Manejo de alerta registro
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if (params.has('registroExitoso')) {
    const alertContainer = document.createElement('div');
    alertContainer.setAttribute('role', 'alert');

    if (params.get('registroExitoso') === 'true') {
      // Alerta de éxito
      alertContainer.classList.add('alert', 'alert-success', 'mb-5');
      alertContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Tu cuenta se ha registrado con éxito.</span>
      `;
    } else {
      // Alerta de error
      alertContainer.classList.add('alert', 'alert-error', 'mb-5');
      alertContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error al registrar la cuenta.</span>
      `;
    }

    const alertaRegistroDiv = document.getElementById('alerta-registro');
    alertaRegistroDiv.appendChild(alertContainer);
  }
});



// Manejo de alerta login
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if (params.has('loginExitoso')) {
    const alertContainer = document.createElement('div');
    alertContainer.setAttribute('role', 'alert');

    if (params.get('loginExitoso') === 'true') {
      // Alerta de éxito
      alertContainer.classList.add('alert', 'alert-success', 'mb-5');
      alertContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Inicio de sesión exitoso, ¡bienvenido!</span>
      `;
    } else {
      // Alerta de error
      alertContainer.classList.add('alert', 'alert-error', 'mb-5');
      alertContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Error en el inicio de sesión. Verifica tus credenciales.</span>
      `;
    }

    const alertaLoginDiv = document.getElementById('alerta-login');
    alertaLoginDiv.appendChild(alertContainer);
  }
});