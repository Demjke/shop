import cors from "cors";
import express from "express";
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';

const app = express();

app.use(cors());
app.use(express.json());

// Корневой маршрут для проверки
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

// Раздача статических файлов из папки uploads
app.use("/uploads", express.static("./uploads"));

export default app;