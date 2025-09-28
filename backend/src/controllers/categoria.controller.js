import db from '../models/index.js';
const { Categoria } = db;

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
};
