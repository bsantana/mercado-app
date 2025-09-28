import React from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import api from '../services/api';

export default function CadastroProduto() {
  const [form, setForm] = React.useState({ nome: '', categoria: '', marca: '' });
  const [msg, setMsg] = React.useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/produtos', form);
      setMsg('Produto cadastrado com sucesso!');
      setForm({ nome: '', categoria: '', marca: '' });
    } catch {
      setMsg('Erro ao cadastrar produto.');
    }
  };

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Cadastrar Produto</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
        <TextField label="Categoria" name="categoria" value={form.categoria} onChange={handleChange} required />
        <TextField label="Marca" name="marca" value={form.marca} onChange={handleChange} required />
        <Button type="submit" variant="contained">Cadastrar</Button>
        {msg && <Typography color="primary">{msg}</Typography>}
      </Box>
    </Paper>
  );
}
