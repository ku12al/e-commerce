import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  UserInbox,
} from "./routes/Routes.js";

import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopAllOrders,
  ShopPreviewPage,
  ShopOrdersDetails,
  ShopAllRefunds,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
  ShopInboxPage,
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
  const [stripeApikey, setStripeApikey] = useState(null);
  const [isStripeLoading, setIsStripeLoading] = useState(true);

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${server}/payment/stripeapikey`);
      setStripeApikey(data.stripeApikey);
    } catch (error) {
      console.error("Error fetching Stripe API key", error);
    } finally {
      setIsStripeLoading(false);
    }
  }
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);
  return (
    <>
      {loading || isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <BrowserRouter>
            {!isStripeLoading && stripeApikey && (
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
              <Route path="/inbox" element={<UserInbox />} />

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
              <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
              <Route path="/shop-create" element={<ShopCreatePage />} />
              <Route
                path="/seller/activation/:activation_token"
                element={<SellerActivationPage />}
              />
              <Route path="/shop-login" element={<ShopLoginPage />} />
              <Route
                path="/shop/:id"
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

                  <SellerProtectedRoute isSeller={isSeller}>
                    <ShopSettingsPage />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <SellerProtectedRoute isSeller={isSeller}>
                    <ShopDashboardPage />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-create-product"
                element={
                  <SellerProtectedRoute>
                    <ShopCreateProduct />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-orders"
                element={
                  <SellerProtectedRoute>
                    <ShopAllOrders />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-refunds"
                element={
                  <SellerProtectedRoute>
                    <ShopAllRefunds />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <SellerProtectedRoute>
                    <ShopOrdersDetails />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-products"
                element={
                  <SellerProtectedRoute>
                    <ShopAllProducts />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-create-event"
                element={
                  <SellerProtectedRoute>
                    <ShopCreateEvents />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-events"
                element={
                  <SellerProtectedRoute>
                    <ShopAllEvents />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-coupouns"
                element={
                  <SellerProtectedRoute>
                    <ShopAllCoupouns />
                  </SellerProtectedRoute>
                }
              />

              <Route
                path="/dashboard-withdraw-money"
                element={
                  <SellerProtectedRoute>
                    <ShopWithdrawMoneyPage />
                  </SellerProtectedRoute>
                }
              />
              <Route
                path="/dashboard-messages"
                element={
                  <SellerProtectedRoute>
                    <ShopInboxPage />
                  </SellerProtectedRoute>
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
