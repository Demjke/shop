import cors from "cors";
import express from "express";
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';

const app = express();
const port = 8000;

app.use(cors({
  origin: 'https://Demjke.github.io/shop'
}));
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes)

// Раздача статических файлов из папки uploads
app.use("/uploads", express.static("./uploads"));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
