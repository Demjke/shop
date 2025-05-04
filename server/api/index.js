import cors from "cors";
import express from "express";
import categoriesRoutes from "../routes/categories.js";
import productsRoutes from "../routes/products.js";

const app = express();

// CORS
app.use(cors({
  origin: "https://demjke.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Явная обработка OPTIONS-запросов (для Vercel)
app.options("*", cors());

app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Добавьте тестовый эндпоинт для проверки
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

export default app;