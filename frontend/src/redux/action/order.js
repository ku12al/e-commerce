import axios from "axios";
import { server } from "../../server";


//get all products
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
      try {
        dispatch({
          type: "getAllOrdersUserRequest",
        });
    
        const { data } = await axios.get(
          `${server}/order/get-all-orders/${userId}`
        );
    
        dispatch({
          type: "getAllOrdersUserSuccess",
          payload: data.orders,
        });
      } catch (error) {
        dispatch({
          type: "getAllOrdersUserFailed",
          payload: error.message || "Failed to fetch products",
        });
      }
    };

    export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
      try {
        dispatch({
          type: "getAllOrdersShopRequest",
        });
    
        const { data } = await axios.get(
          `${server}/order/get-seller-all-orders/${shopId}`
        );
        dispatch({
          type: "getAllOrdersShopSuccess",
          payload: data.orders,
        });
      } catch (error) {
        dispatch({
          type: "getAllOrdersShopFailed",
          payload: error.message || "Failed to fetch products",
        });
      }
    };