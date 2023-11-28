// clases.js
document.addEventListener('DOMContentLoaded', function () {
  // Realiza una solicitud para obtener las clases desde el servidor
  fetch('/clases')
    .then(response => response.json())
    .then(data => {
      // Agrupa las clases por día
      const clasesPorDia = agruparClasesPorDia(data);

      // Define el orden de los días de la semana
      const ordenDiasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

      // Filtra los días de la semana que tienen clases
      const diasConClases = ordenDiasSemana.filter(dia => clasesPorDia[dia]);

      // Llama a una función para cargar las clases en la interfaz HTML
      cargarClasesEnHTML(clasesPorDia, diasConClases);
    })
    .catch(error => console.error('Error al obtener las clases:', error));

  // Función para agrupar las clases por día
  function agruparClasesPorDia(clases) {
    const clasesPorDia = {};

    clases.forEach(clase => {
      const dia = clase.dia;

      if (!clasesPorDia[dia]) {
        clasesPorDia[dia] = [];
      }

      clasesPorDia[dia].push(clase);
    });

    return clasesPorDia;
  }

  // Función para obtener la clase de Bootstrap y el icono según el nivel de dificultad
  function obtenerClaseNivelDificultad(clase) {
    switch (clase.nivelDificultad) {
      case 'Avanzado':
        return { claseBootstrap: 'badge-error', icono: '<ion-icon class="icon-clase" name="medal-outline"></ion-icon>' };
      case 'Intermedio':
        return { claseBootstrap: 'badge-warning', icono: '<ion-icon class="icon-clase" name="hand-left-outline"></ion-icon>' };
      case 'Principiante':
        return { claseBootstrap: 'badge-success', icono: '<ion-icon class="icon-clase" name="accessibility-outline"></ion-icon>' };
      default:
        return { claseBootstrap: '', icono: '' };
    }
  }

  // Función para cargar las clases en el interfaz HTML
  function cargarClasesEnHTML(clasesPorDia, diasConClases) {
    const contenedorClases = document.querySelector('.clases-container');

    // Itera sobre los días de la semana con clases
    diasConClases.forEach(dia => {
      const clasesDelDia = clasesPorDia[dia];

      // Estructura HTML para un bloque de día
      const htmlBloqueDia = `
        <div class="p-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <time class="text-lg font-semibold text-gray-900 dark:text-white">${dia}</time>
          <ol class="mt-3 divide-y divider-gray-200">
            ${clasesDelDia.map(clase => {
              const { claseBootstrap, icono } = obtenerClaseNivelDificultad(clase);

              // Estructura HTML para una clase
              return `
                <li>
                  <div class="class-row items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="class-group">
                      ${icono}
                      <div class="text-gray-600 dark:text-gray-400">
                        <div class="text-base font-normal">
                          <span class="font-medium text-gray-900 dark:text-white">${clase.nombreClase}</span>
                        </div>
                        <span class="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                          <span class="badge ${claseBootstrap} badge-sm">${clase.nivelDificultad}</span>
                          <span class="teachermini">${clase.hora} - ${clase.profesor}</span>
                        </span>
                      </div>
                    </div>
                    <a href="/apuntarClase/${clase._id}" class="btn btn-apuntarme">Apuntarme a la clase</a>
                  </div>
                </li>
              `;
            }).join('')}
          </ol>
        </div>
      `;

      contenedorClases.innerHTML += htmlBloqueDia;
    });
  }
});
