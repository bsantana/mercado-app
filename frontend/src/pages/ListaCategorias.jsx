import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Card, CardContent, CardMedia, Typography, Grid, Paper, CircularProgress, Alert
} from '@mui/material';

export default function ListaCategorias() {
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

  return (
    <Paper sx={{ maxWidth: 1100, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Categorias</Typography>
      {loading && <CircularProgress />}
      {erro && <Alert severity="error">{erro}</Alert>}
      <Grid container spacing={3}>
        {categorias.map((cat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
            <Card sx={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 2 }}>
              {cat.imagem ? (
                <CardMedia
                  component="div"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    background: `#f5f5f5 url(${cat.imagem}) center/contain no-repeat`,
                    mb: 1
                  }}
                />
              ) : (
                <div style={{ width: 80, height: 80, background: '#eee', borderRadius: 8, marginBottom: 8 }} />
              )}
              <CardContent sx={{ p: 1 }}>
                <Typography variant="subtitle1" align="center" fontWeight={600}>{cat.nome}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
