import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  searchProducts: [],
  currentProduct: {},
  brands: [],
  product: {},
  designers: [],
  currentPage: 1,
  totalPages: 0,
  pageSize: 12,
  totalProducts: 0,
  loadingProducts: false,
  errorProducts: null,
  loadingProduct: false,
  errorProduct: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.products
      state.currentPage = action.payload.paginations.pageNumber
      state.pageSize = action.payload.paginations.pageSize
      state.totalPages = action.payload.paginations.totalPages
      state.totalProducts = action.payload.paginations.totalItems
      state.loadingProducts = false
    },
    getProduct: (state, action) => {
      state.product = action.payload
      state.loadingProduct = false
    },
    getSearchProducts: (state, action) => {
      state.searchProducts = action.payload
      state.loadingProducts = false
    },
    getBrands: (state, action) => {
      state.brands = action.payload
      state.loadingProducts = false
    },
    getDesigners: (state, action) => {
      state.designers = action.payload
      state.loadingProducts = false
    },
    loadingProducts: (state) => {
      state.loadingProducts = true
    },
    errorProducts: (state, action) => {
      state.errorProducts = action.payload
      state.loadingProducts = false
    },
    loadingProduct: (state) => {
      state.loadingProduct = true
    },
    errorProduct: (state, action) => {
      state.errorProduct = action.payload
      state.loadingProduct = false
    }
  }
});

export const { getProducts, getSearchProducts, loadingProducts, errorProducts, getBrands, getDesigners, getProduct, loadingProduct, errorProduct } = productsSlice.actions

export default productsSlice.reducer