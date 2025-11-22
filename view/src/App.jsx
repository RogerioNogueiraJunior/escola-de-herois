// view/src/App.jsx (Atualizado com Botão Vilão/Deletar)

import React, { useState, useEffect, useCallback } from 'react';
import { 
  gerarHeroi, 
  listarHeroisPorTipo, 
  atualizarTipoHeroi,
  buscarHeroiEmTriagem,
  deletarHeroi // NOVO IMPORT
} from './services/heroiService';
import ListaHerois from './components/ListaHerois';
import './App.css'; 

const App = () => {
  const [heroiAtual, setHeroiAtual] = useState(null);
  const [principais, setPrincipais] = useState([]);
  const [sidekicks, setSidekicks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar as listas de heróis (Principal e Sidekick)
  const fetchHeroisListas = useCallback(async () => {
    try {
      const [principaisData, sidekicksData] = await Promise.all([
        listarHeroisPorTipo('Principal'),
        listarHeroisPorTipo('Sidekick')
      ]);
      setPrincipais(principaisData);
      setSidekicks(sidekicksData);
    } catch (err) {
      console.error('Falha ao carregar listas:', err);
      setError('Falha ao carregar listas de heróis.');
    }
  }, []);

  // Função para buscar o herói em triagem existente ou gerar um novo
  const fetchHeroiParaTriagem = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let heroi = await buscarHeroiEmTriagem();
      if (!heroi) {
        heroi = await gerarHeroi(); 
      }
      setHeroiAtual(heroi);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Falha ao carregar/gerar novo herói.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para carregar o primeiro herói e as listas ao iniciar
  useEffect(() => {
    fetchHeroisListas();
    fetchHeroiParaTriagem();
  }, [fetchHeroisListas, fetchHeroiParaTriagem]);

  // Função para tratar a escolha do usuário (Principal/Sidekick)
  const handleEscolha = async (tipoEscolhido) => {
    if (!heroiAtual || loading) return;

    setLoading(true);
    setError(null);
    const heroiId = heroiAtual._id;
    
    try {
      // 1. Atualiza o tipo do herói no backend
      await atualizarTipoHeroi(heroiId, tipoEscolhido);
      
      // 2. Dispara a recarga das listas E a busca pelo próximo herói.
      await Promise.all([
        fetchHeroisListas(),
        fetchHeroiParaTriagem() 
      ]);
      
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError(`Falha ao registrar herói como ${tipoEscolhido}.`);
    } finally {
      setLoading(false);
    }
  };

  // NOVO: Função para deletar o herói (Vilão)
  const handleVilao = async () => {
    if (!heroiAtual || loading) return;
    
    if (!window.confirm(`Tem certeza que deseja DELETAR o herói ${heroiAtual.nome} e designá-lo como Vilão?`)) {
        return;
    }

    setLoading(true);
    setError(null);
    const heroiId = heroiAtual._id;
    
    try {
      // 1. Deleta o herói do banco
      await deletarHeroi(heroiId);
      
      // 2. O herói foi excluído, agora apenas busca o próximo herói (ou gera um novo)
      await fetchHeroiParaTriagem();
      
      // Não precisa recarregar listas laterais, pois o herói excluído não estava nelas.
      
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError(`Falha ao deletar o herói ${heroiAtual.nome}.`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="sky-high-app">
      <img class="logo" src="../public/sky high logo.webp" alt="" />
      <div className="main-content-area">
        
        {/* Coluna 1: Heróis Principais (ESQUERDA) */}
        <ListaHerois titulo="Heróis Principais" herois={principais} /> 
        
        {/* Coluna 2: Triagem (CENTRO) */}
        <div className="triagem-area">
          <h2>Heroi em Triagem:</h2>
          {loading && <p>Buscando/Gerando novo recruta...</p>}
          {error && <p className="error-message">Erro: {error}</p>}

          {heroiAtual && (
            <div className="heroi-card triagem-card">
              <h3>{heroiAtual.nome}</h3>
              <p>Turma: {heroiAtual.turma}</p>
              <p>Categoria de Poder: {heroiAtual.categoriaPoder}</p>
              
              <hr />
              <h4>Detalhes:</h4>
              <ul style={{textAlign: 'left', margin: '0 auto', width: 'fit-content'}}>
                <li>ID: {heroiAtual._id}</li>
                <li>Poderes: {heroiAtual.poderes.join(', ')}</li>
                <li>Status: {heroiAtual.tipo}</li> 
              </ul>
              <hr />

              <div className="botoes-escolha">
                <button 
                  onClick={() => handleEscolha('Principal')} 
                  disabled={loading}
                  className="btn-principal"
                >
                  Designar Principal
                </button>
                <button 
                  onClick={() => handleEscolha('Sidekick')} 
                  disabled={loading}
                  className="btn-sidekick"
                >
                  Designar Sidekick
                </button>
              </div>
              
              {/* NOVO BOTÃO DE DELEÇÃO */}
              <button 
                  onClick={handleVilao} 
                  disabled={loading}
                  className="btn-vilao"
                  style={{marginTop: '10px'}} // Adiciona um pequeno espaço
              >
                  Vilão (Deletar)
              </button>
              
            </div>
          )}
        </div>
        
        {/* Coluna 3: Sidekicks (DIREITA) */}
        <ListaHerois titulo="Ajudantes (Sidekicks)" herois={sidekicks} />
        
      </div>
    </div>
  );
};

export default App;