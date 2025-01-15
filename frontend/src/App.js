import "./App.css";
import React, { useEffect } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage,
  OrderTrackPage,
} from "./routes/Routes.js";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopAllOrders,
  ShopOrdersDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage
} from "./routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/Store.js";
import { loadUser } from "./redux/action/user";
import { loadSeller } from "./redux/action/seller.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoutes.js";
import Loader from "./component/Layout/Loader.jsx";
import { getAllEvents } from "./redux/action/event.js";
import { getAllProducts } from "./redux/action/product.js";
import { useState } from "react";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const [stripeApikey, setStripeApikey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApikey(data.stripeApikey);
  }
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();

    // if (isSeller === true) {
    //   return <Navigate to="/shop" replace />;
    // }
  }, []);
  return (
    <>
      {loading || isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <BrowserRouter>
            {stripeApikey && (
              <Elements stripe={loadStripe(stripeApikey)}>
                <Routes>
                  <Route path="/payment" element={<PaymentPage />} />
                </Routes>
              </Elements>
            )}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />

              <Route
                path="/checkout"
                element={
                  // <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/order/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/track/order/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <OrderTrackPage />
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
                path="/settings"
                element={
                  //remember here use seller id like that :id current use 22

                  // <SellerProtectedRoute isSeller={isSeller}>
                  <ShopSettingsPage />
                  // </SellerProtectedRoute>
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
                path="/dashboard-orders"
                element={
                  <ShopAllOrders />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-refunds"
                element={
                  <ShopAllRefunds />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ShopOrdersDetails />
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

              <Route
                path="/dashboard-withdraw-money"
                element={
                  <ShopWithdrawMoneyPage />
                  // <SellerProtectedRoute>

                  // </SellerProtectedRoute>
                }
              />
              <Route path="/dashboard-messages" element={
                <ShopInboxPage />
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
