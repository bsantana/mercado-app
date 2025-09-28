import precoPkg from '../models/preco.cjs';
import produtoPkg from '../models/produto.cjs';
import mercadoPkg from '../models/mercado.cjs';
const { Preco } = precoPkg;
const { Produto } = produtoPkg;
const { Mercado } = mercadoPkg;

export const createPreco = async (req, res) => {
  try {
    const preco = await Preco.create(req.body);
    res.status(201).json(preco);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPrecosByProduto = async (req, res) => {
  try {
    const precos = await Preco.findAll({
      where: { ProdutoId: req.params.id },
      include: [Produto, Mercado]
    });
    res.json(precos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMaisBarato = async (req, res) => {
  try {
    const precos = await Preco.findAll({
      include: [Produto, Mercado],
      where: {},
      order: [['valor', 'ASC']]
    });
    const preco = precos.find(p => p.Produto.nome.toLowerCase().includes(req.params.nome.toLowerCase()));
    if (!preco) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(preco);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
