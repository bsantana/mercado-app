import React from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import api from '../services/api';

export default function CadastroMercado() {
  const [form, setForm] = React.useState({ nome: '', endereco: '', cidade: '' });
  const [msg, setMsg] = React.useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/mercados', form);
      setMsg('Mercado cadastrado com sucesso!');
      setForm({ nome: '', endereco: '', cidade: '' });
    } catch {
      setMsg('Erro ao cadastrar mercado.');
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Cadastrar Mercado</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
        <TextField label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} required />
        <TextField label="Cidade" name="cidade" value={form.cidade} onChange={handleChange} required />
        <Button type="submit" variant="contained">Cadastrar</Button>
        {msg && <Typography color="primary">{msg}</Typography>}
      </Box>
    </Paper>
  );
}
