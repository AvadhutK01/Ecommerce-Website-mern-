import './App.css';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignup.js';
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import React from 'react';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions.js';
import Profile from './component/User/Profile.js';
import ProtectedRoute from './component/Routes/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrder.js';
import OrderDetails from './component/Order/OrderDetails.js';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [razorpayApiKey, setRazorpayApiKey] = useState("");

  async function getRazorpayApiKey() {
    const { data } = await axios.get("/api/v1/razorpayapikey");
    setRazorpayApiKey(data.razorpayApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getRazorpayApiKey();
  }, []);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route
          path="/account"
          element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/cart"
          element={<ProtectedRoute>
            <Cart />
          </ProtectedRoute>}
        />
        <Route
          path="/shipping"
          element={<ProtectedRoute>
            <Shipping />
          </ProtectedRoute>}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>}
        />
        {razorpayApiKey && (
          <Route
            path="/process/payment"
            element={<ProtectedRoute>
              <Payment razorpayApiKey={razorpayApiKey} />
            </ProtectedRoute>}
          />
        )}
        <Route
          path="/success"
          element={<ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

