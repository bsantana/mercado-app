import pkg from '../models/mercado.cjs';
const { Mercado } = pkg;

export const createMercado = async (req, res) => {
  try {
    const mercado = await Mercado.create(req.body);
    res.status(201).json({
      message: "Mercado cadastrado com sucesso",
      data: mercado
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMercados = async (req, res) => {
  try {
    const mercados = await Mercado.findAll();
    res.json({ data: mercados });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
