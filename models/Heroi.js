// models/Heroi.js

const mongoose = require('mongoose');

const HeroiSchema = new mongoose.Schema({
  // ... (o conteúdo do seu HeroiSchema, como definido antes) ...
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
  tipo: {
    type: String,
    enum: ['Principal', 'Sidekick'],
    default: 'Sidekick',
  },
}, { timestamps: true });

const Heroi = mongoose.model('Heroi', HeroiSchema);

module.exports = Heroi;