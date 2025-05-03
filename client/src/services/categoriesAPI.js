import axios from "axios";
import { errorCategories, getCategories, loadingCategories } from '../redux/slices/categoriesSlice';

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCategories = async (dispatch) => {
  dispatch(loadingCategories());
  try {
    const { data: categories } = await axios.get(`${apiUrl}categories`);
    dispatch(getCategories(categories))

    return categories;
  } catch (err) {
    dispatch(errorCategories(err.message));
    return [];
  }
};