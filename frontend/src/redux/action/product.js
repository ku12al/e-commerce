import axios from "axios";
import { server } from "../../server";

// Action Types
const PRODUCT_CREATE_REQUEST = "productCreateRequest";
const PRODUCT_CREATE_SUCCESS = "productCreateSuccess";
const PRODUCT_CREATE_FAIL = "productCreateFail";
const GET_ALL_PRODUCTS_SHOP_REQUEST = "getAllProductsShopRequest";
const GET_ALL_PRODUCTS_SHOP_SUCCESS = "getAllProductsShopSuccess";
const GET_ALL_PRODUCTS_SHOP_FAIL = "getAllProductsShopFail";
const DELETE_PRODUCT_REQUEST = "deleteProductRequest";
const DELETE_PRODUCT_SUCCESS = "deleteProductSuccess";
const DELETE_PRODUCT_FAIL = "deleteProductFail";
const GET_ALL_PRODUCTS_REQUEST = "getAllProductsRequest";
const GET_ALL_PRODUCTS_SUCCESS = "getAllProductsSuccess";
const GET_ALL_PRODUCTS_FAIL = "getAllProductsFail";

// Create a product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data?.message || "Failed to create product",
    });
  }
};

// Get all products for a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_SHOP_REQUEST });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    console.log(data);

    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_SHOP_FAIL,
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};

// Delete a product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      // { withCredentials: true }
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data?.message || "Failed to delete product",
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${server}/product/get-all-products`);

    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data.allProduct,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch products",
    });
  }
};
