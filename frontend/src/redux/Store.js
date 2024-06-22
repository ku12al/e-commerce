import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/user";
import sellerReducer from "./reducer/seller";
import productReducer from "./reducer/product";
import eventReducer from "./reducer/event";
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
import sessionStorage from "redux-persist/lib/storage/session";
// Persistence configurations
const persistSellerConfig = { key: "seller", storage: sessionStorage, version: 1 };
const persistProductsConfig = { key: "products", storage, version: 1 };
const persistEventsConfig = { key: "events", storage, version: 1 };

// Persisted reducers
const persistedSellerReducer = persistReducer(persistSellerConfig, sellerReducer);
const persistedProductsReducer = persistReducer(persistProductsConfig, productReducer);
const persistedEventsReducer = persistReducer(persistEventsConfig, eventReducer);

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: persistedSellerReducer,
    products: persistedProductsReducer,
    events: persistedEventsReducer,
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
