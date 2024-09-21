import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: false,  // Ensure this is included
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, builder => {
  builder
    .addCase('loadSellerRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('loadSellerSuccess', (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    })
    .addCase('loadSellerFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

// Action creators
export const loadSellerRequest = () => ({ type: 'loadSellerRequest' });
export const loadSellerSuccess = (payload) => ({ type: 'loadSellerSuccess', payload });
export const loadSellerFail = (payload) => ({ type: 'loadSellerFail', payload });
export const clearErrors = () => ({ type: 'clearErrors' });

export default sellerReducer;
