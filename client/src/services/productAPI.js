import axios from "axios";
import { errorProduct, getProduct, loadingProduct } from "../redux/slices/productsSlice";

const apiUrl = process.env.REACT_APP_API_URL;

// Универсальная функция для получения продуктов
export const fetchProduct = async (dispatch, id) => {
  try {
    dispatch(loadingProduct());
    const { data: product } = await axios.get(`${apiUrl}products/${id}`);
    dispatch(getProduct(product));


    return product;
  } catch (err) {
    dispatch(errorProduct(err.message));
    console.error("Ошибка загрузки товара:", err);
    return [];
  }
};