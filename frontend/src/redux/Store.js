import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import {sellerReducer} from "./reducer/seller";
import {productReducer} from "./reducer/product";
import { cartReducer } from "./reducer/cart";
import { wishlistReducer } from "./reducer/wishlist";
import {eventReducer} from "./reducer/event";
import {orderReducer} from "./reducer/order";


const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default Store;
