// claseModel.js
const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
  nombreClase: {
    type: String,
    required: true,
  },
  profesor: {
    type: String,
    required: true,
  },
  nivelDificultad: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  categoriaArteMarcial: {
    type: String,
    required: true,
  },
});

const Clase = mongoose.model('Clase', claseSchema);

module.exports = Clase;