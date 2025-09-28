import React from 'react';

export default function MarketList({ mercados }) {
  return (
    <ul>
      {mercados.map(m => <li key={m.id}>{m.nome} - {m.cidade}</li>)}
    </ul>
  );
}
