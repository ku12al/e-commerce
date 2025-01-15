import axios from "axios";
import { server } from "../../server";

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "loadSellerRequest" }); // Match the type casing
    const { data } = await axios.get(`${server}/shop/getseller`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "loadSellerSuccess", // Match the type casing
      payload: data.seller
    });
  } catch (error) {
    dispatch({
      type: "loadSellerFail", // Match the type casing
      payload: error.response.data.message,
    });
  }
};
