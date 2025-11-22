// view/src/services/heroiService.js (Atualizado)

import axios from 'axios';

const API_URL = '/api/herois'; 

// 1. Gerar Novo Herói (GET /api/herois/gerar)
export const gerarHeroi = async () => {
  try {
    const response = await axios.get(`${API_URL}/gerar`);
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar herói:', error);
    throw error;
  }
};

// 2. Listar Heróis por Tipo (GET /api/herois/turmas?tipo=...)
export const listarHeroisPorTipo = async (tipo) => {
  try {
    // Busca Principal ou Sidekick
    const response = await axios.get(`${API_URL}/turmas?tipo=${tipo}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao listar heróis do tipo ${tipo}:`, error);
    if (error.response && error.response.status === 404) {
        return [];
    }
    throw error;
  }
};

// 3. Atualizar o Tipo do Herói (PUT /api/herois/:id)
export const atualizarTipoHeroi = async (id, novoTipo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { tipo: novoTipo });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar herói ${id} para ${novoTipo}:`, error);
    throw error;
  }
};

// NOVO: 4. Buscar Herói em Triagem (GET /api/herois/triagem)
export const buscarHeroiEmTriagem = async () => {
  try {
    const response = await axios.get(`${API_URL}/triagem`);
    return response.data;
  } catch (error) {
    // Se retornar 404 (nenhum em triagem), retorna null
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return null; 
    }
    console.error('Erro ao buscar herói em triagem:', error);
    throw error;
  }
};

// NOVO: 5. Deletar um Herói (DELETE /api/herois/:id)
export const deletarHeroi = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    // O backend retorna status 204 (No Content), então não esperamos dados.
    return response.status; 
  } catch (error) {
    console.error(`Erro ao deletar herói ${id}:`, error);
    throw error;
  }
};