import db from '../models/index.js';
const { Produto, Preco, Mercado } = db;

export const createProduto = async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [
        {
          model: Preco,
          as: 'precos',
          separate: true,
          limit: 1,
          order: [['data', 'DESC']],
          include: [
            {
              model: Mercado,
              as: 'Mercado'
            }
          ]
        }
      ]
    });
    res.json({ data: produtos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
