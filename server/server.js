import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/', (_req, res) => res.json({ service: 'NovaTech API', status: 'ok', version: '1.0.0' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);

async function start() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI не задан. Скопируйте .env.example в .env и укажите строку подключения (напр. MongoDB Atlas).');
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB подключена');
  app.listen(PORT, () => console.log(`🚀 NovaTech API запущен на http://localhost:${PORT}`));
}

start().catch(err => { console.error(err); process.exit(1); });
