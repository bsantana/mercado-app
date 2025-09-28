import cron from 'node-cron';
import { populaCategoriasGuanabara, crawlGuanabara } from './guanabara.js';

// Agenda para rodar todos os dias às 3h da manhã
cron.schedule('0 3 * * *', async () => {
  console.log('Iniciando atualização de categorias e produtos do Guanabara...');
  await populaCategoriasGuanabara();
  await crawlGuanabara();
  console.log('Crawler Guanabara finalizado!');
});

// Para rodar manualmente (node src/crawlers/agenda-guanabara.js)
(async () => {
  await populaCategoriasGuanabara();
  await crawlGuanabara();
  process.exit(0);
})();
