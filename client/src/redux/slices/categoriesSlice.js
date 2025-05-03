import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loadingCategories: false,
  errorCategories: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload
      state.loadingCategories = false
    },
    loadingCategories: (state) => {
      state.loadingCategories = true
    },
    errorCategories: (state, action) => {
      state.errorCategories = action.payload
      state.loadingCategories = false
    }
  }
});

export const { getCategories, loadingCategories, errorCategories } = categoriesSlice.actions

export default categoriesSlice.reducer