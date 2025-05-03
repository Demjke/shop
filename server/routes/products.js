import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const productsData = path.join(__dirname, "../data/products.json");
const categoriesData = path.join(__dirname, "../data/categories.json");

router.get('/', async (req, res) => {
  try {
    const { page, size, query, categoryId, subcategoryId, characteristic, brand, designer } = req.query;

    const productsList = await fs.readFile(productsData, "utf8");
    const categoriesList = await fs.readFile(categoriesData, "utf8");
    const products = JSON.parse(productsList);
    const categories = JSON.parse(categoriesList);

    let filteredProducts = [...products];

    if (query) {
      filteredProducts = products.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));
      return res.json({ products: filteredProducts });
    }

    if (categoryId) filteredProducts = filteredProducts.filter(category => category.categoryId === +categoryId);

    if (subcategoryId) filteredProducts = filteredProducts.filter(subcategory => subcategory.subcategoryId === +subcategoryId);

    if (subcategoryId && categoryId) {
      const category = categories.find(cat => cat.id === Number(categoryId));
      if (category) filteredProducts = filteredProducts.filter(item => item.subcategoryId === +subcategoryId);
    }

    if (characteristic) {
      filteredProducts = filteredProducts.filter(({ characteristics }) => Object.values(characteristics).some(item => item.includes(characteristic.toUpperCase())));
    }

    if (brand) filteredProducts = filteredProducts.filter(item => item.brand && item.brand.toLowerCase().trim() === brand.toLowerCase().trim());

    if (designer) filteredProducts = filteredProducts.filter(item => item.designer && item.designer.toLowerCase().trim() === designer.toLowerCase().trim());

    const totalItems = filteredProducts.length;
    const pageNumber = page ? +page : 1;
    const pageSize = size ? +size : 12;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({ products: paginatedProducts, paginations: { pageSize, pageNumber, totalPages, totalItems } });
  } catch (error) {
    console.error("Error in products route:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get('/brands', async (req, res) => {
  try {
    const productsList = await fs.readFile(productsData, "utf8");
    const products = JSON.parse(productsList);

    const uniqueBrands = [...new Set(products.map(product => product.brand).filter(Boolean))].sort();

    res.json({ brands: uniqueBrands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands", details: error.message });
  }
});

router.get('/designers', async (req, res) => {
  try {
    const productsList = await fs.readFile(productsData, "utf8");
    const products = JSON.parse(productsList);

    const uniqueDesigners = [...new Set(products.map(product => product.designer).filter(Boolean))].sort();

    res.json({ designers: uniqueDesigners });
  } catch (error) {
    console.error("Error fetching designers:", error);
    res.status(500).json({ error: "Failed to fetch designers", details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const productsList = await fs.readFile(productsData, "utf8");
    const products = JSON.parse(productsList);

    const product = products.find(item => item.id === +id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

export default router;