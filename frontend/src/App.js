import "./App.css";
import React from "react";
import { useEffect } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes.js";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
} from "./routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/Store.js";
import { loadSeller, loadUser } from "./redux/action/user";
import {getAllProductsShop} from "./redux/action/product"
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoutes.js";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    console.log("Dispatch")
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    // if (isSeller === true) {
    //   return <Navigate to="/shop" replace />;
    // }
  }, []);
  return (
    <>
      {loading || isLoading ? null : (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:name" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route
                path="/seller/activation/:activation_token"
                element={<SellerActivationPage />}
              />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route
                path="/shop/:_id"
                element={
                  //remember here use seller id like that :id current use 22

                  <SellerProtectedRoute isSeller={isSeller}>
                    <ShopHomePage />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ShopDashboardPage />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-create-product"
                element={
                  <ShopCreateProduct />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-products"
                element={
                  <ShopAllProducts />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-create-event"
                element={
                  <ShopCreateEvents />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />


              <Route          
                path="/dashboard-events"
                element={
                  <ShopAllEvents />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />

<Route          
                path="/dashboard-coupouns"
                element={
                  <ShopAllCoupouns />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />
            </Routes>

            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
