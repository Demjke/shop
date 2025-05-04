import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import categoriesRoutes from "../routes/categories.js";
import productsRoutes from "../routes/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Настройка CORS
app.use(cors({
  origin: "https://demjke.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Маршруты API
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

// Раздача статических файлов из папки uploads
const uploadsPath = path.join(__dirname, "../uploads");
console.log("Serving static files from:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// Тестовый эндпоинт
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

export default app;