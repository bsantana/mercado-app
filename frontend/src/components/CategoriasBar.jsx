import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Chip, CircularProgress, Alert } from '@mui/material';

export default function CategoriasBar({ onSelect, selected }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/categorias')
      .then(res => {
        setCategorias(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErro('Erro ao buscar categorias.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress size={24} sx={{ m: 2 }} />;
  if (erro) return <Alert severity="error">{erro}</Alert>;

  return (
    <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'flex-start' }}>
      <Chip
        key="all"
        label="Todas"
        clickable
        color={selected == null ? 'primary' : 'default'}
        onClick={() => onSelect && onSelect(null)}
        variant={selected == null ? 'filled' : 'outlined'}
        sx={{
          fontWeight: 400,
          fontSize: 13,
          px: 1.2,
          py: 0.2,
          opacity: selected == null ? 1 : 0.7,
          backgroundColor: selected == null ? 'primary.main' : 'background.paper',
          color: selected == null ? 'primary.contrastText' : 'text.secondary',
          borderColor: 'grey.300',
          boxShadow: 'none',
          transition: 'all 0.2s',
        }}
      />
      {categorias.map(cat => (
        <Chip
          key={cat.id}
          label={cat.nome}
          clickable
          color={selected === cat.id ? 'primary' : 'default'}
          onClick={() => onSelect && onSelect(cat)}
          variant={selected === cat.id ? 'filled' : 'outlined'}
          sx={{
            fontWeight: 400,
            fontSize: 13,
            px: 1.2,
            py: 0.2,
            opacity: selected === cat.id ? 1 : 0.7,
            backgroundColor: selected === cat.id ? 'primary.main' : 'background.paper',
            color: selected === cat.id ? 'primary.contrastText' : 'text.secondary',
            borderColor: 'grey.300',
            boxShadow: 'none',
            transition: 'all 0.2s',
          }}
        />
      ))}
    </Box>
  );
}
