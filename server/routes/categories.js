import express from 'express';
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const categoriesData = path.join(process.cwd(), "data/categories.json");


router.get('/', async (req, res) => {
  const categoriesList = await fs.readFile(categoriesData, "utf8");
  const categories = JSON.parse(categoriesList);

  res.json(categories)
})

export default router