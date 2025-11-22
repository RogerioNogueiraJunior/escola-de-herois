// server.js (Versão Final para MVC com Checagem de Collection)

const express = require('express');
const mongoose = require('mongoose');
const heroiRoutes = require('./routes/heroiRoutes'); 
const Heroi = require('./models/Heroi'); // Importa o modelo para referência

const app = express();
const PORT = 3000;

app.use(express.json());

const MONGODB_URI = 'mongodb://localhost:27017/escolaHeroisDB';

async function ensureCollectionExists() {
  // ... (Lógica de checagem de collection) ...
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB! 💾');
    ensureCollectionExists(); 
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// --- USO DAS ROTAS ---
// TODAS as rotas, incluindo /gerar, são acessadas aqui
app.use('/api/herois', heroiRoutes); 

app.get('/', (req, res) => {
  res.send('Bem-vindo à Escola de Super-Heróis! Sistema MVC em ação.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});