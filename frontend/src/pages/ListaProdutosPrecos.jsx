import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Paper, Typography, List, ListItem, Alert, TextField, Grid, Card, CardContent, CardMedia, Box
} from '@mui/material';
import CategoriasBar from '../components/CategoriasBar';


export default function ListaProdutosPrecos() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data.data || []);
      } catch (err) {
        setErro('Erro ao buscar produtos.');
      }
    };
    fetchProdutos();
  }, []);

  return (
    <Paper sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Lista de Produtos</Typography>
      <CategoriasBar
        onSelect={cat => setCategoriaSelecionada(cat ? cat.id : null)}
        selected={categoriaSelecionada}
      />
      <TextField
        size="small"
        label="Buscar produto"
        variant="outlined"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        sx={{ mb: 2, mt: 1, width: 300 }}
      />
      {erro && <Alert severity="error">{erro}</Alert>}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {produtos
          .filter(produto =>
            (!categoriaSelecionada || produto.CategoriaId === categoriaSelecionada || (produto.categoria && produto.categoria.id === categoriaSelecionada)) &&
            (!busca || (produto.nome && produto.nome.toLowerCase().includes(busca.toLowerCase())))
          )
          .map((produto) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={produto.id}>
              <Card sx={{ minHeight: 290, maxHeight: 290, minWidth: 260, maxWidth: 260, width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column' }}>
                {produto.imagem ? (
                  <CardMedia
                    component="div"
                    sx={{ height: 120, background: `#fff url(${produto.imagem}) center/contain no-repeat` }}
                    title={produto.nome}
                  />
                ) : (
                  <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafafa', color: '#bbb' }}>
                    Sem imagem
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ lineHeight: 1.1 }}>{produto.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {produto.categoria || '-'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {produto.marca || '-'}
                  </Typography>
                  {produto.precos && produto.precos.length > 0 ? (
                    <List dense>
                      {produto.precos.map((preco) => (
                        <ListItem key={preco.id} sx={{ p: 0 }}>
                          R$ {preco.valor.toFixed(2).replace('.', ',')} - {preco.Mercado ? preco.Mercado.nome : 'Mercado desconhecido'}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Sem preços cadastrados</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
}
