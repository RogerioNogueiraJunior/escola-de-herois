// models/Heroi.js (Atualizado)

const mongoose = require('mongoose');

const HeroiSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  poderes: {
    type: [String], 
    required: true,
  },
  turma: {
    type: String,
    required: true,
  },
  categoriaPoder: {
    type: String,
    enum: ['Combate', 'Suporte', 'Mente', 'Energia', 'Tecnologia'],
    required: true,
  },
  tipo: {
    type: String,
    enum: ['Principal', 'Sidekick', 'Indefinido'], // NOVO VALOR
    default: 'Indefinido', // NOVO PADRÃO
  },
}, { timestamps: true });

const Heroi = mongoose.model('Heroi', HeroiSchema);

module.exports = Heroi;