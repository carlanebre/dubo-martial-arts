const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  clasesInscritas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clase',
  }],
  // Otros campos que puedas necesitar
});

// Enchufa passport-local-mongoose al esquema de usuario y especifica el campo 'username'
usuarioSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// Implementa manualmente la función authenticate
usuarioSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Especifica la colección en la que se almacenarán los documentos de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema, 'users');

module.exports = Usuario;
