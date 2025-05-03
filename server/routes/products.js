// Список маршрутов:

// api/products/12

// api/products?query=asd
// api/products?size=40
// api/products?page=2&size=10
// api/products?categoryId=2
// api/products?categoryId=2&subcategoryId=3
// api/products?subcategoryId=3
// api/products?characteristics=xl (допустим: xl, coror)
// api/products?characteristic=xl&size=30
// api/products?characteristic=xl&page=2&size=20
// api/products?brands=tingles
// api/products?brands=tingles&size=10
// api/products?brands=tingles&page=2&size=10
// api/products?designer=judith powers
// api/products?designer=judith powers&size=10
// api/products?designer=judith powers&page=2&size=10


import express from "express";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const productsData = path.join(process.cwd(), "data/products.json");
const categoriesData = path.join(process.cwd(), "data/categories.json");

router.get('/', async (req, res) => {
  const { page, size, query, categoryId, subcategoryId, characteristic, brand, designer } = req.query;

  const productsList = await fs.readFile(productsData, "utf8");
  const categoriesList = await fs.readFile(categoriesData, "utf8");
  const products = JSON.parse(productsList);
  const categories = JSON.parse(categoriesList);

  let filteredProducts = [...products];

  if (query) {
    filteredProducts = products.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()))
    return res.json({ products: filteredProducts });
  }

  if (categoryId) filteredProducts = filteredProducts.filter(category => category.categoryId === +categoryId);

  if (subcategoryId) filteredProducts = filteredProducts.filter(subcategory => subcategory.subcategoryId === +subcategoryId);

  if (subcategoryId && categoryId) {
    const category = categories.find(cat => cat.id === Number(categoryId));
    if (category) filteredProducts = filteredProducts.filter(item => item.subcategoryId === +subcategoryId)
  }

  if (characteristic) {
    filteredProducts = filteredProducts.filter(({ characteristics }) => Object.values(characteristics).some(item => item.includes(characteristic.toUpperCase())));
  }

  if (brand) filteredProducts = filteredProducts.filter(item => item.brand && item.brand.toLowerCase().trim() === brand.toLowerCase().trim())

  if (designer) filteredProducts = filteredProducts.filter(item => item.designer && item.designer.toLowerCase().trim() === designer.toLowerCase().trim());

  // Количество элементов
  const totalItems = filteredProducts.length

  // Страница
  const pageNumber = page ? +page : 1;

  // Количство элементов на странице
  const pageSize = size ? +size : 12;

  // Общее количество страниц
  const totalPages = Math.ceil(totalItems / pageSize);

  // Первый элемент на данной странице
  const startIndex = (pageNumber - 1) * pageSize;

  // Последний элемент на данной странице
  const endIndex = startIndex + pageSize;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({ products: paginatedProducts, paginations: { pageSize, pageNumber, totalPages, totalItems } });
})

router.get('/brands', async (req, res) => {
  try {
    const productsList = await fs.readFile(productsData, "utf8");
    const products = JSON.parse(productsList);

    const uniqueBrands = [...new Set(products.map(product => product.brand).filter(Boolean))].sort();

    res.json({ brands: uniqueBrands });
  } catch (error) {
    console.error("Ошибка при получении брендов:", error);
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
    console.error("Ошибка при получении дизайнеров:", error);
    res.status(500).json({ error: "Failed to fetch brands", details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const productsList = await fs.readFile(productsData, "utf8");
  const products = JSON.parse(productsList);

  const product = products.find(item => item.id === +id)
  res.json(product);
})

export default router;