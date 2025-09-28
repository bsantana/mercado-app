import axios from 'axios';
import * as cheerio from 'cheerio';
// Popula categorias do menu do Guanabara


export async function populaCategoriasGuanabara() {
  try {
    const db = await import('../models/index.js');
    const { Mercado, Categoria } = db.default;
    const url = 'https://www.supermercadosguanabara.com.br/produtos';
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Garante o mercado Guanabara
    const [mercado] = await Mercado.findOrCreate({
      where: { nome: 'Guanabara' },
      defaults: { endereco: '', cidade: '' }
    });

    const categorias = [];
    $('.products-menu .item-col').each((i, el) => {
      const nome = $(el).find('.name').text().trim();
      const href = $(el).find('a').attr('href');
      let imagem = null;
      const style = $(el).find('.col.image').attr('style');
      if (style) {
        const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
        if (match && match[1]) {
          imagem = match[1].startsWith('http') ? match[1] : `https:${match[1]}`;
        }
      }
      if (nome && href) {
        categorias.push({ nome, url: href, imagem });
      }
    });

    for (const cat of categorias) {
      await Categoria.findOrCreate({
        where: { nome: cat.nome, MercadoId: mercado.id },
        defaults: { nome: cat.nome, url: cat.url, MercadoId: mercado.id }
      });
      // Atualiza url se necessário
      await Categoria.update(
        { url: cat.url },
        { where: { nome: cat.nome, MercadoId: mercado.id } }
      );
    }
    console.log(`Categorias do Guanabara populadas: ${categorias.length}`);
  } catch (err) {
    console.error('Erro ao popular categorias do Guanabara:', err);
  }
}




export async function crawlGuanabara() {
  try {
    const db = await import('../models/index.js');
    const { Produto, Preco, Mercado, Categoria } = db.default;
    const baseUrl = 'https://www.supermercadosguanabara.com.br';

    // Garante o mercado Guanabara
    const [mercado] = await Mercado.findOrCreate({
      where: { nome: 'Guanabara' },
      defaults: { endereco: '', cidade: '' }
    });

    // Busca todas as categorias do mercado
    const categorias = await Categoria.findAll({ where: { MercadoId: mercado.id } });
    let totalProdutos = 0;

    for (const categoria of categorias) {
      if (!categoria.url) continue;
      const url = categoria.url.startsWith('http') ? categoria.url : baseUrl + categoria.url;
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      const produtos = [];
      $('.col.item').each((i, el) => {
        const nome = $(el).find('.name').text().trim();
        const precoStr = $(el).find('.price .number').first().text().replace(',', '.').trim();
        const preco = parseFloat(precoStr);
        // Extrai a imagem do background-image do style
        let imagem = null;
        const style = $(el).find('.col.image').attr('style');
        if (style) {
          const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
          if (match && match[1]) {
            imagem = match[1].startsWith('http') ? match[1] : `https:${match[1]}`;
          }
        }
        // A fonte é a URL da página de onde veio
        const fonte = url;
        if (nome && !isNaN(preco)) {
          produtos.push({ nome, preco, imagem, fonte });
        }
      });

      for (const prod of produtos) {
        // Upsert do produto com fonte, imagem e CategoriaId
        const [produto, created] = await Produto.upsert(
          { nome: prod.nome, fonte: prod.fonte, imagem: prod.imagem, CategoriaId: categoria.id },
          { returning: true }
        );
        const produtoId = produto.id || (produto.dataValues && produto.dataValues.id);
        // Cria registro de preço associado ao produto e mercado, ignora erro de duplicidade
        try {
          await Preco.create({
            valor: prod.preco,
            data: new Date(),
            ProdutoId: produtoId,
            MercadoId: mercado.id
          });
        } catch (err) {
          if (err.name === 'SequelizeUniqueConstraintError') {
            console.log(`Preço já existe para ProdutoId=${produtoId}, MercadoId=${mercado.id}, valor=${prod.preco}`);
          } else {
            console.error('Erro ao criar preço:', err);
          }
        }
      }
      totalProdutos += produtos.length;
    }
    console.log(`Crawler Guanabara: ${totalProdutos} produtos processados.`);
  } catch (err) {
    console.error('Erro no crawler Guanabara:', err);
  }
}
