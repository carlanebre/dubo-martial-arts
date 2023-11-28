document.addEventListener('DOMContentLoaded', function () {
  // Realizar una solicitud GET a la API para obtener los datos del usuario
  fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(userData => {
      // Verificar si se recibieron datos del usuario
      if (Object.keys(userData).length > 0) {
        // Llamar a la función para mostrar los datos del usuario en el HTML
        displayUserData(userData);
      } else {
        // Si no hay datos del usuario, mostrar un mensaje de error
        document.getElementById('bloque1').innerHTML = '<p>Error al cargar los datos del usuario. No estás logueado.</p>';
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      document.getElementById('bloque1').innerHTML = '<p>Error al cargar los datos del usuario. No estás logueado.</p>';
    });
});

// Función para mostrar los datos del usuario en el HTML
function displayUserData(userData) {
  // Obtener el contenedor HTML donde se mostrarán los datos del usuario
  const userDataContainer1 = document.getElementById('bloque1');
  const userDataContainer2 = document.getElementById('bloque2');

  // Crear HTML utilizando template literals para el primer bloque
  const htmlUserData1 = `
    <div class="flex flex-col items-center pb-10">
      <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="img/default.png" alt="avatar"/>
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${userData.email ? userData.email : 'Usuario Doe'}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">${userData.role || 'Aprendiz de Judo'}</span>
    </div>
  `;

  // Crear HTML utilizando template literals para el segundo bloque
  const htmlUserData2 = `
    <p class="title-mm">¡Bienvenido, ${userData.email || 'Usuario'}!</p>
    <p>ID: ${userData._id}</p>
    <p>Email: ${userData.email}</p>
  `;

  // Insertar el HTML en los contenedores respectivos
  userDataContainer1.innerHTML = htmlUserData1;
  userDataContainer2.innerHTML = htmlUserData2;
}
