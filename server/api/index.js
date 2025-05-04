import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import categoriesRoutes from "../routes/categories.js";
import productsRoutes from "../routes/products.js";

const app = express();

// Настройка CORS
app.use(cors({
  origin: "*", // Разрешаем запросы с любых доменов
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"], // Только заголовки, которые необходимы
  credentials: false, // Отключаем использование cookies и авторизационных заголовков
}));

app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

export const handler = serverless(app);
