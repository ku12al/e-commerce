import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import sellerReducer from "./reducer/seller";
import { productReducer } from "./reducer/product";
import { eventReducer } from "./reducer/event";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persistence configuration
const persistConfig = { key: "seller", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, sellerReducer);

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: persistedReducer,
    products: productReducer,
    events: eventReducer,
    // cart: cartReducer,
    // wishlist: wishlistReducer,
    // order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(Store);
export default Store;
