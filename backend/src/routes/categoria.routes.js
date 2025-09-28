import express from 'express';
const router = express.Router();


import { getCategorias } from '../controllers/categoria.controller.js';

// GET /categorias - retorna todas as categorias
router.get('/', getCategorias);

export default router;
