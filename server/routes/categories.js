import express from 'express';
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const categoriesData = path.join(__dirname, "../data/categories.json");

router.get('/', async (req, res) => {
  try {
    const categoriesList = await fs.readFile(categoriesData, "utf8");
    const categories = JSON.parse(categoriesList);
    res.json(categories);
  } catch (error) {
    console.error("Error reading categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;