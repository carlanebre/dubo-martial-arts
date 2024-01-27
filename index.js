// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('./app/model/User.js');
const Clase = require('./app/model/Clase.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Conéctate a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB Atlas:', error);
  });

// Configura express.static para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Configura Passport para utilizar el modelo de Usuario
app.use(passport.initialize());
app.use(passport.session());



// RUTAS
// Registro
// Ruta GET para la página de registro
app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/public/registro.html');
});

// Ruta POST para registrar un nuevo usuario desde el formulario
app.post('/registro', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.redirect('/registro?registroExitoso=false');
    }

    // Encripta la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({ email, password: hashedPassword });
    await nuevoUsuario.save();

    res.redirect('/registro?registroExitoso=true');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Login
// Ruta GET para la página de login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Ruta POST para manejar el formulario de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.redirect('/login?loginExitoso=false');
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (passwordMatch) {
      // Almacenar la información del usuario en la sesión
      req.session.user = {
        _id: usuario._id,
        email: usuario.email,
      };

      return res.redirect('/perfil');
    } else {
      return res.redirect('/login?loginExitoso=false');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});


// Nueva ruta para mostrar la información del usuario
app.get('/perfil', (req, res) => {
  if (!req.session.user) {
    // Si el usuario no está en sesión, redirige al inicio de sesión
    return res.redirect('/login.html'); // no estás logueado
  }

  // Muestra la información del usuario en la pantalla HTML
  return res.redirect('/profile.html');
});

// Ruta para obtener todas las clases y renderizar dash.html
app.get('/clases', async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases); // Envia las clases como JSON directamente al cliente
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/user', (req, res) => {
  if (!req.session.user) {
    // Si el usuario no está en sesión, devuelve un JSON vacío o un mensaje de error
    res.json({});
  } else {
    // Si el usuario está en sesión, devuelve los datos del usuario en formato JSON
    res.json(req.session.user);
  }
});

// Ruta para obtener las clases inscritas del usuario logueado
app.get('/misclasesjson', async (req, res) => {
  try {
    if (!req.session.user) {
      // Si el usuario no está en sesión, devuelve un JSON vacío o un mensaje de error
      return res.json({});
    }

    // Busca al usuario por su ID y popula las clasesInscritas para obtener la información completa de las clases
    const usuario = await Usuario.findById(req.session.user._id).populate('clasesInscritas');

    if (!usuario) {
      console.error('Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devuelve las clases inscritas del usuario en formato JSON
    res.json(usuario.clasesInscritas);
  } catch (error) {
    console.error('Error al obtener las clases inscritas del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Ruta para obtener todas las clases y renderizar dash.html
app.get('/dash', async (req, res) => {
  res.redirect('dash.html');
});

// Añade esta ruta a tu archivo principal)
app.get('/apuntarClase/:claseId', async (req, res) => {
  try {
    const claseId = req.params.claseId;
    const userId = req.session.user._id;

    // Busca al usuario por su ID
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      console.error('Usuario no encontrado');
      return res.status(404).send('Usuario no encontrado');
    }

    // Verifica si el usuario ya está apuntado a la clase
    if (usuario.clasesInscritas.includes(claseId)) {
      console.log('El usuario ya está apuntado a esta clase');
      return res.status(400).send('El usuario ya está apuntado a esta clase');
    }

    // Añade la clase al array de clasesInscritas del usuario
    usuario.clasesInscritas.push(claseId);

    // Guarda el usuario actualizado en la base de datos
    await usuario.save();

    console.log(`El usuario ${usuario.email} se ha apuntado a la clase ${claseId}`);
    res.status(200).send('Usuario apuntado exitosamente a la clase');
  } catch (error) {
    console.error('Error al apuntar al usuario a la clase:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Función para verificar la sesión en el lado del servidor
app.get('/checkSesion', (req, res) => {
  // Verifica si el usuario está en sesión
  const sesionIniciada = req.session.user ? true : false;

  // Devuelve el resultado como JSON
  res.json({ sesionIniciada });
});

// Ruta GET para cerrar sesión
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/hola', (req, res) => {
  res.send('Hola, mundo!');
});

// Predefinido
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});