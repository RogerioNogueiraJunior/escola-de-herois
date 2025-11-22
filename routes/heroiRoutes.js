// routes/heroiRoutes.js (CORRETO)

const express = require('express');
const router = express.Router();
const heroiController = require('../controllers/heroiController');

// ----------------------------------------------------
// 1. ROTAS ESPECÍFICAS (LITERAIS) - DEVEM VIR PRIMEIRO
// ----------------------------------------------------

router.get('/triagem', heroiController.getHeroiIndefinidoEmTriagem); 
router.get('/gerar', heroiController.generateHeroi); 
router.get('/turmas', heroiController.getHeroisPorTurma);

// ----------------------------------------------------
// 2. ROTAS PRINCIPAIS (CRUD sem ID / Listar Todos)
// ----------------------------------------------------

router.post('/', heroiController.createHeroi); 
router.get('/', heroiController.getHerois); // GET para /api/herois

// ----------------------------------------------------
// 3. ROTAS GENÉRICAS COM PARÂMETRO ID (DEVEM VIR POR ÚLTIMO)
// ----------------------------------------------------

// Estas rotas usam :id e, portanto, só devem ser verificadas depois das rotas específicas.
router.get('/:id', heroiController.getHeroiById);
router.put('/:id', heroiController.updateHeroi); // Usada para definir o tipo!
router.delete('/:id', heroiController.deleteHeroi);

module.exports = router;