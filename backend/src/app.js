import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import mercadoRoutes from './routes/mercado.routes.js';
import produtoRoutes from './routes/produto.routes.js';
import precoRoutes from './routes/preco.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/mercados', mercadoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/precos', precoRoutes);
app.use('/categorias', categoriaRoutes);


// Inicia o agendamento dos crawlers
import './crawlers/scheduler.js';

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
