// routes/heroiRoutes.js

const express = require('express');
const router = express.Router();
const heroiController = require('../controllers/heroiController'); // Importa o Controller

// POST /api/herois -> Cria um Herói
router.post('/', heroiController.createHeroi);

// GET /api/herois -> Lista todos os Heróis
router.get('/', heroiController.getHerois);

// GET /api/herois/:id -> Busca um Herói por ID
router.get('/:id', heroiController.getHeroiById);

// PUT /api/herois/:id -> Atualiza um Herói
router.put('/:id', heroiController.updateHeroi);

// DELETE /api/herois/:id -> Deleta um Herói
router.delete('/:id', heroiController.deleteHeroi);

module.exports = router;