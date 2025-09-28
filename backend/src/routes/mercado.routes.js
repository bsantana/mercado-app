import express from 'express';
import { createMercado, getMercados } from '../controllers/mercado.controller.js';
const router = express.Router();

router.post('/', createMercado);
router.get('/', getMercados);

export default router;
