import axios from "axios";
import { errorProducts, getBrands, getDesigners, getProducts, getSearchProducts, loadingProducts } from '../redux/slices/productsSlice';

const apiUrl = process.env.REACT_APP_API_URL;


export const fetchProducts = async (dispatch, { query, params }) => {
  dispatch(loadingProducts());
  try {
    if (!query) dispatch(getSearchProducts([]));

    const { data } = await axios.get(`${apiUrl}products`, {
      params: query ? { query } : params || {}
    });

    query ? dispatch(getSearchProducts(data.products)) : dispatch(getProducts(data))

    return data.products
  } catch (err) {
    dispatch(errorProducts(err.message));
    return [];
  }
};

export const fetchBrands = async (dispatch) => {
  dispatch(loadingProducts());
  try {
    const { data: { brands } } = await axios.get(`${apiUrl}products/brands`);

    dispatch(getBrands(brands))
    return brands
  } catch (err) {
    return [];
  }
};

export const fetchDesigners = async (dispatch) => {
  dispatch(loadingProducts());
  try {
    const { data: { designers } } = await axios.get(`${apiUrl}products/designers`);

    dispatch(getDesigners(designers))
    return designers
  } catch (err) {
    return [];
  }
};