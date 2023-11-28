// Obtener referencia al sidebar y al botón
const sidebar = document.getElementById('default-sidebar');
const button = document.querySelector('[data-drawer-target="default-sidebar"]');

// Función para cambiar las clases y la posición del sidebar
function toggleSidebar() {
  if (window.innerWidth <= 768) {
    // Si la pantalla es menor o igual a 768px, quitar la clase hidden
    sidebar.classList.remove('hidden');
  }

  if (window.innerWidth > 768) {
    // Si la pantalla es menor de 768px, mostrar el sidebar y ajustar la posición
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('sm:translate-x-0');
  } else {
    // Si la pantalla es mayor o igual a 768px, ocultar el sidebar y ajustar la posición
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('sm:translate-x-0');
  }
}

// Manejar clic en el botón
button.addEventListener('click', toggleSidebar);

// Ejecutar toggleSidebar al cargar la página para manejar el estado inicial
toggleSidebar();

// Escuchar cambios en el tamaño de la ventana
window.addEventListener('resize', toggleSidebar);
