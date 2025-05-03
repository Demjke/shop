import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoriesReducer from './slices/categoriesSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  }
})

export default store;