import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      // payload: error.response.data.message,
    });
  }
};

//user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.reaponse.data.message,
      });
    }
  };

//update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          updateAddressSuccessMessage: "User address updated successfully",
          user: data.user
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.reaponse.data.message,
      });
    }
  };


  //delete user address
  export const deleteUserAddress = (id) => async(dispatch) =>{
    try{
      dispatch({
        type: "deleteUserAddressRequest",
      });
      const { data } = await axios.delete(
        `${server}/user/delete-user-address/:${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
          successMessage: "User address deleted successfully",
          user: data.user
        },
      });
    }catch(error){
      dispatch({
        type: "deleteUserAddressFailed",
        // payload: error.reaponse.data.message,
      });
    }
  }
