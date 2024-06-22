import axios from "axios";
import { server } from "../../server";


// load seller
export const loadSeller = () => async (dispatch) => {
      try {
        dispatch({
          type: "LoadSellerRequest",
        });
        const { data } = await axios.get(`${server}/shop/getseller`, {
          withCredentials: true,
        });
        console.log(data)
        dispatch({
          type: "LoadSellerSuccess",
          payload: data.seller
        });
        console.log(data);
      } catch (error) {
        dispatch({
          type: "LoadSellerFail",
          payload: error.response.data.message,
        });
      }
    };