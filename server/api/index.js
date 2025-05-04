import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';
import categoriesRoutes from '../routes/categories.js';
import productsRoutes from '../routes/products.js';

const app = express();

// Настройка CORS
const allowedOrigins = ['https://demjke.github.io']; // Разрешаем запросы только с этого домена
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Если домен разрешен или запрос идет с локального хоста
    } else {
      callback(new Error('Not allowed by CORS'), false); // Все остальные домены — не разрешаем
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);

export const handler = serverless(app);
