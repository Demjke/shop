import cors from "cors";
import express from "express";
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes)

// Раздача статических файлов из папки uploads
app.use("/uploads", express.static("./uploads"));

export default app;
