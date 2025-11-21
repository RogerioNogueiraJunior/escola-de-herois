// server.js (Arquivo Principal - Atualizado)

const express = require('express');
const mongoose = require('mongoose');
const heroiRoutes = require('./routes/heroiRoutes'); 
const Heroi = require('./models/Heroi'); // Importa o modelo Mongoose para referência

const app = express();
const PORT = 3000;

app.use(express.json());

// String de conexão com o seu MongoDB (MUDE AQUI!)
const MONGODB_URI = 'mongodb://localhost:27017/escolaHeroisDB';

// Função para garantir a existência da Collection
async function ensureCollectionExists() {
  try {
    // Acessa o objeto de conexão do Mongoose
    const db = mongoose.connection.db;

    // Obtém a lista de collections existentes no banco de dados
    const collections = await db.listCollections({ name: 'herois' }).toArray();
    
    // 'herois' é o nome da collection que o Mongoose cria por padrão, 
    // baseado no nome do seu modelo ('Heroi')
    
    if (collections.length === 0) {
      // Se a collection 'herois' não for encontrada, ela é criada
      await db.createCollection('herois');
      console.log('✅ Collection "herois" criada com sucesso (ou já existia)!');
    } else {
      console.log('✅ Collection "herois" já existe.');
    }
  } catch (error) {
    console.error('⚠️ Erro ao verificar ou criar a collection:', error);
  }
}

// Conexão com o MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB! 💾');
    // Chama a função logo após a conexão ser estabelecida
    ensureCollectionExists(); 
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// --- USO DAS ROTAS ---
app.use('/api/herois', heroiRoutes); 

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo à Escola de Super-Heróis! Sistema MVC em ação.');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});