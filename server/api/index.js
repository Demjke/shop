import cors from "cors";
import express from "express";
import categoriesRoutes from "../routes/categories.js";
import productsRoutes from "../routes/products.js";

const app = express();

// Настройка CORS
app.use(cors({
  origin: "https://demjke.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Явная обработка OPTIONS для всех маршрутов
app.options("*", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "https://demjke.github.io",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true",
  });
  res.status(204).send();
});

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

app.use(express.json());

// Маршруты API
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Тестовый эндпоинт
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;