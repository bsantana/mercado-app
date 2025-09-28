import cron from 'node-cron';
import { crawlGuanabara } from './guanabara.js';

cron.schedule('0 3 * * *', async () => {
  await crawlGuanabara();
  console.log('Crawler Guanabara executado!');
});
