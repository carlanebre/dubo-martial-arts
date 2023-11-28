// Depslegable navbar clases
document.addEventListener('DOMContentLoaded', function () {
  var clasesDropdown = document.getElementById('clasesDropdown');

  // Agrega un escuchador de eventos de clic al documento
  document.addEventListener('click', function (event) {
    console.log('Clic en el documento');
    
    // Verifica si el menú desplegable está abierto
    var detailsElement = clasesDropdown.querySelector('details');
    var isDropdownOpen = detailsElement.open;

    // Verifica si el clic fue dentro o fuera del menú desplegable
    if (!clasesDropdown.contains(event.target)) {
      console.log('Clic fuera del menú desplegable');
      
      // Si el menú desplegable está abierto, lo cierra; de lo contrario, no hace nada
      if (isDropdownOpen) {
        detailsElement.open = false;
      }
    }
  });
});

// script.js
// Función para verificar la sesión
const checkSesion = async () => {
  try {
    const response = await fetch('/checkSesion');
    const data = await response.json();

    // Verifica la clase del body para determinar la página actual
    const isPageIndex = document.body.classList.contains('page-index');

    if (data.sesionIniciada) {
      // Si hay sesión
      let contentHtml;

      if (isPageIndex) {
        // Contenido con sesión y página index
        contentHtml = `
          <a href="dash.html" class="btn btn-login">Área personal</a>
          <div class="dropdown dropdown-end ml-2">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="img/default.png" />
              </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a href="/perfil" class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        `;
      } else {
        // Contenido con sesión y cualquier otra página
        contentHtml = `
        <div class="dropdown dropdown-end ml-2">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="img/default.png" />
            </div>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="/perfil" class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
        `;
      }

      // Insertar el contenido con sesión en el div con id 'btn-cambiar'
      document.getElementById('btn-cambiar').innerHTML = contentHtml;
    } else {
      // Si no hay sesión
      const loginButtonHtml = `<a href="login.html" class="btn btn-login">Iniciar sesión</a>`;

      // Insertar el contenido sin sesión en el div con id 'btn-cambiar'
      document.getElementById('btn-cambiar').innerHTML = loginButtonHtml;
    }
  } catch (error) {
    console.error('Error al verificar sesión:', error);
  }
};

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  checkSesion();
});