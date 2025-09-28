import express from 'express';
import { createProduto, getProdutos } from '../controllers/produto.controller.js';
const router = express.Router();

router.post('/', createProduto);
router.get('/', getProdutos);

export default router;
