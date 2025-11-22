// view/src/components/ListaHerois.jsx

import React from 'react';

const ListaHerois = ({ titulo, herois }) => {
  return (
    <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px', backgroundColor: titulo === 'Heróis Principais' ? '#e0f7fa' : '#ffebee' }}>
      <h3>{titulo} ({herois.length})</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {herois.map(heroi => (
          <li key={heroi._id} style={{ marginBottom: '10px', padding: '5px', borderBottom: '1px dotted #aaa' }}>
            <strong>{heroi.nome}</strong> 
            <br />
            <small>Poderes: {heroi.poderes.join(', ')}</small>
          </li>
        ))}
      </ul>
      {herois.length === 0 && <p>Nenhum herói nesta turma ainda.</p>}
    </div>
  );
};

export default ListaHerois;