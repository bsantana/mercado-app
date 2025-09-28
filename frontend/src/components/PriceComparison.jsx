import React from 'react';

export default function PriceComparison({ precos }) {
  return (
    <div>
      <h4>Comparação de Preços</h4>
      <ul>
        {precos.map(p => (
          <li key={p.id}>{p.Mercado.nome}: R$ {p.valor.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
