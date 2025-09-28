import React from 'react';

export default function ProductCard({ produto }) {
  return (
    <div>
      <h3>{produto.nome}</h3>
      <p>Categoria: {produto.categoria}</p>
      <p>Marca: {produto.marca}</p>
    </div>
  );
}
