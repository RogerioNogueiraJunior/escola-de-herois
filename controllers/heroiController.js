// controllers/heroiController.js

const Heroi = require('../models/Heroi'); // Importa o Model

// 1. C: Criar um novo Herói
exports.createHeroi = async (req, res) => {
  try {
    const novoHeroi = new Heroi(req.body);
    await novoHeroi.save();
    res.status(201).json(novoHeroi);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar herói', erro: error.message });
  }
};

// 2. R: Listar todos os Heróis
exports.getHerois = async (req, res) => {
  try {
    const herois = await Heroi.find();
    res.status(200).json(herois);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar heróis', erro: error.message });
  }
};

// 3. R: Buscar um Herói por ID
exports.getHeroiById = async (req, res) => {
  try {
    const heroi = await Heroi.findById(req.params.id);
    if (!heroi) {
      return res.status(404).json({ mensagem: 'Herói não encontrado' });
    }
    res.status(200).json(heroi);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar herói', erro: error.message });
  }
};

// 4. U: Atualizar um Herói por ID
exports.updateHeroi = async (req, res) => {
  try {
    const heroiAtualizado = await Heroi.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!heroiAtualizado) {
      return res.status(404).json({ mensagem: 'Herói não encontrado para atualização' });
    }
    res.status(200).json(heroiAtualizado);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar herói', erro: error.message });
  }
};

// 5. D: Deletar um Herói por ID
exports.deleteHeroi = async (req, res) => {
  try {
    const heroiDeletado = await Heroi.findByIdAndDelete(req.params.id);
    if (!heroiDeletado) {
      return res.status(404).json({ mensagem: 'Herói não encontrado para exclusão' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar herói', erro: error.message });
  }
};