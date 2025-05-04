// api/index.js
import cors from "cors";
import express from "express";
import serverless from 'serverless-http';
import categoriesRoutes from '../routes/categories.js';
import productsRoutes from '../routes/products.js';

const app = express();

app.use(cors({
  origin: 'https://demjke.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

export const handler = serverless(app);
