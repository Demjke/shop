import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import categoriesRoutes from "../routes/categories.js";
import productsRoutes from "../routes/products.js";

const app = express();

// CORS настройка
app.use(cors({
  origin: "https://demjke.github.io", // или ['https://site1', 'https://site2']
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Роуты
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Экспорт как serverless handler
export const handler = serverless(app);
