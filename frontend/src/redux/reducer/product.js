import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  products: [],
  success: false,
  error: null,
  message: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productCreateRequest: (state) => {
      state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    },
    productCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllProductsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    getAllProductsShopFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state) => {
      state.isLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteProductFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
