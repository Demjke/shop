import axios from "axios";
import { errorProducts, getBrands, getDesigners, getProducts, getSearchProducts, loadingProducts } from '../redux/slices/productsSlice';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchProducts = async (dispatch, { query, params }) => {
  dispatch(loadingProducts());
  try {
    if (!query) dispatch(getSearchProducts([]));

    const { data } = await axios.get(`${apiUrl}products`, {
      params: query ? { query } : params || {},
      headers: {
        'Content-Type': 'application/json',
      },
    });

    query ? dispatch(getSearchProducts(data.products)) : dispatch(getProducts(data));

    return data.products;
  } catch (err) {
    console.error("Fetch products error:", err.response?.status, err.response?.data, err.message);
    dispatch(errorProducts(err.message));
    return [];
  }
};

export const fetchBrands = async (dispatch) => {
  dispatch(loadingProducts());
  try {
    const { data: { brands } } = await axios.get(`${apiUrl}products/brands`);
    dispatch(getBrands(brands));
    return brands;
  } catch (err) {
    console.error("Fetch brands error:", err.response?.status, err.response?.data, err.message);
    return [];
  }
};

export const fetchDesigners = async (dispatch) => {
  dispatch(loadingProducts());
  try {
    const { data: { designers } } = await axios.get(`${apiUrl}products/designers`);
    dispatch(getDesigners(designers));
    return designers;
  } catch (err) {
    console.error("Fetch designers error:", err.response?.status, err.response?.data, err.message);
    return [];
  }
};