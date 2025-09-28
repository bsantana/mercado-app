import React from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

import Home from './pages/Home';
import Lista from './pages/Lista';
import Dashboard from './pages/Dashboard';
import CadastroProduto from './pages/CadastroProduto';
import CadastroMercado from './pages/CadastroMercado';
import ListaProdutosPrecos from './pages/ListaProdutosPrecos';

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cadastro-produto">Cadastrar Produto</Button>
          <Button color="inherit" component={Link} to="/cadastro-mercado">Cadastrar Mercado</Button>
          <Button color="inherit" component={Link} to="/produtos-precos">Produtos e Preços</Button>
          <Button color="inherit" component={Link} to="/lista">Lista</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/cadastro-mercado" element={<CadastroMercado />} />
          <Route path="/produtos-precos" element={<ListaProdutosPrecos />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
