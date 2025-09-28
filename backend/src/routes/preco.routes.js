import express from 'express';
import { createPreco, getPrecosByProduto, getMaisBarato } from '../controllers/preco.controller.js';
const router = express.Router();

router.post('/', createPreco);
router.get('/produto/:id', getPrecosByProduto);
router.get('/barato/:nome', getMaisBarato);

export default router;
