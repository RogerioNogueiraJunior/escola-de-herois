// controllers/heroiController.js

const Heroi = require('../models/Heroi');
const { faker } = require('@faker-js/faker'); 

// Dados de referência para o gerador
const CATEGORIAS_E_PODERES = {
    Combate: ["Super Força", "Invulnerabilidade", "Agilidade Aumentada", "Geração de Fogo"],
    Suporte: ["Cura Rápida", "Campo de Força", "Teletransporte", "Alteração de Peso"],
    Mente: ["Telepatia", "Ilusão", "Controle Mental", "Leitura de Aura"],
    Energia: ["Rajadas Elétricas", "Gelo", "Manipulação de Luz", "Absorção de Energia"],
    Tecnologia: ["Controle de Máquinas", "Gerador de Escudos"]
};
const TURMAS = ["Físico", "Controle", "Tecnologia", "Linguagem", "Voadores"];


// 1. C: Criar um novo Herói (Criação manual)
exports.createHeroi = async (req, res) => {
  try {
    const novoHeroi = new Heroi(req.body);
    await novoHeroi.save();
    res.status(201).json(novoHeroi);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar herói', erro: error.message });
  }
};

// 2. R: Listar todos os Heróis (Método de listagem geral)
exports.getHerois = async (req, res) => {
  try {
    // Exclui heróis "Indefinido" da listagem geral
    const herois = await Heroi.find({ tipo: { $ne: 'Indefinido' } });
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

// 4. U: Atualizar um Herói por ID (Usado para definir o tipo)
exports.updateHeroi = async (req, res) => {
  try {
    // Certificamos que apenas os campos permitidos estão sendo passados, especialmente 'tipo'
    const updateData = req.body.tipo ? { tipo: req.body.tipo } : req.body;
    
    const heroiAtualizado = await Heroi.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!heroiAtualizado) {
      return res.status(404).json({ mensagem: 'Herói não encontrado para atualização' });
    }
    res.status(200).json(heroiAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar herói:', error);
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

// 6. R: Gerar e Salvar um Herói Aleatório (Tipo 'Indefinido' é o padrão do Model)
exports.generateHeroi = async (req, res) => {
    try {
        const categorias = Object.keys(CATEGORIAS_E_PODERES);
        const categoriaAleatoria = faker.helpers.arrayElement(categorias);
        
        const poderesDisponiveis = CATEGORIAS_E_PODERES[categoriaAleatoria];
        const numPoderes = faker.number.int({ min: 1, max: 3 });
        const poderesAleatorios = faker.helpers.arrayElements(poderesDisponiveis, numPoderes);
        
        const dadosHeroi = {
            nome: faker.person.fullName(),
            poderes: poderesAleatorios,
            turma: faker.helpers.arrayElement(TURMAS),
            categoriaPoder: categoriaAleatoria,
            // 'tipo' é automaticamente 'Indefinido' pelo Model
        };

        const novoHeroi = new Heroi(dadosHeroi);
        await novoHeroi.save();
        
        res.status(201).json(novoHeroi); 
        
    } catch (error) {
        console.error('Erro ao gerar e salvar herói:', error);
        res.status(500).json({ mensagem: 'Erro interno ao gerar herói aleatório.', erro: error.message });
    }
};

// 7. R: Retornar o Herói em Triagem (tipo: Indefinido)
exports.getHeroiIndefinidoEmTriagem = async (req, res) => {
    try {
        // Busca o herói Indefinido mais antigo (ou o primeiro encontrado)
        const heroiEmTriagem = await Heroi.findOne({ tipo: 'Indefinido' }).sort({ createdAt: 1 });
        
        if (!heroiEmTriagem) {
            return res.status(404).json({ mensagem: 'Nenhum herói em triagem encontrado.' });
        }
        
        res.status(200).json(heroiEmTriagem);
    } catch (error) {
        console.error('Erro ao buscar herói em triagem:', error);
        res.status(500).json({ mensagem: 'Erro interno ao buscar herói em triagem.', erro: error.message });
    }
};

// 8. R: Listar Heróis por Tipo (Principal ou Sidekick) - CORREÇÃO DE FILTRO
exports.getHeroisPorTurma = async (req, res) => {
  try {
    const { tipo, categoria } = req.query; 
    const query = {};

    // 1. FILTRO ESSENCIAL: Garante que só busca se o tipo for válido e definido.
    if (!tipo || !['Principal', 'Sidekick'].includes(tipo)) {
        // Se o tipo não for Principal ou Sidekick, retorna erro 400.
        return res.status(400).json({ mensagem: 'O parâmetro "tipo" deve ser "Principal" ou "Sidekick".' });
    }
    
    query.tipo = tipo; // Define o filtro EXATO ('Principal' ou 'Sidekick')

    // 2. Filtra por Categoria de Poder (opcional)
    if (categoria) {
      query.categoriaPoder = categoria;
    }
    
    const herois = await Heroi.find(query);

    if (herois.length === 0) {
      return res.status(404).json({ 
        mensagem: 'Nenhum herói encontrado com os filtros especificados.',
        filtros: query
      });
    }

    res.status(200).json(herois);
  } catch (error) {
    console.error('ERRO INTERNO NA BUSCA FILTRADA:', error); 
    res.status(500).json({ mensagem: 'Erro interno ao buscar heróis filtrados', erro: error.message });
  }
};