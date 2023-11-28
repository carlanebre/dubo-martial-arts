// archivo misclases.js

// Función para obtener las clases inscritas del usuario
const getMisClases = async () => {
  try {
    const response = await fetch('/misclasesjson');
    const data = await response.json();

    // Llama a la función para construir y mostrar la tabla con las clases inscritas
    buildTable(data);
  } catch (error) {
    console.error('Error al obtener las clases inscritas:', error);
  }
};

// Función para construir y mostrar la tabla HTML con las clases inscritas
const buildTable = (clases) => {
  const tableBody = document.getElementById('clasesTableBody');

  // Limpia el contenido actual de la tabla antes de agregar las nuevas filas
  tableBody.innerHTML = '';

  // Itera sobre las clases y agrega una fila a la tabla por cada clase
  clases.forEach((clase, index) => {
    const row = document.createElement('tr');

    // Columna con el checkbox
    const checkboxCell = document.createElement('td');
    const checkboxLabel = document.createElement('label');
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.className = 'checkbox';
    checkboxLabel.appendChild(checkboxInput);
    checkboxCell.appendChild(checkboxLabel);
    row.appendChild(checkboxCell);

    // Columna con el nombre de la clase
    const nombreCell = document.createElement('td');
    const nombreDiv = document.createElement('div');
    nombreDiv.className = 'font-bold mb-1';
    nombreDiv.innerText = clase.nombreClase;
    nombreCell.appendChild(nombreDiv);
    row.appendChild(nombreCell);

    // Columna con el profesor
    const profesorCell = document.createElement('td');
    profesorCell.innerText = clase.profesor;
    row.appendChild(profesorCell);

    // Columna con el nivel de dificultad
    const nivelCell = document.createElement('td');
    nivelCell.innerText = clase.nivelDificultad;
    row.appendChild(nivelCell);

    // Columna con el día y hora
    const diaHoraCell = document.createElement('td');
    diaHoraCell.innerText = `${clase.dia} - ${clase.hora}`;
    row.appendChild(diaHoraCell);

    // Columna con los botones
    const botonesCell = document.createElement('td');
    const apuntarseButton = document.createElement('button');
    apuntarseButton.className = 'btn btn-secondary btn-xs btn-w';
    apuntarseButton.innerText = 'ver detalles';
    botonesCell.appendChild(apuntarseButton);

    row.appendChild(botonesCell);

    // Agrega la fila a la tabla
    tableBody.appendChild(row);
  });
};

// Llama a la función para obtener las clases inscritas al cargar la página
document.addEventListener('DOMContentLoaded', getMisClases);
