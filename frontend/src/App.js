import './App.css';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignup.js';
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { useEffect } from 'react';
import Payment from './component/Cart/Payment.js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrder.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard.js';
import UsersList from './component/Admin/UserList.js';
import OrderList from './component/Admin/OrderList.js';
import ProductList from './component/Admin/ProductList.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UpdateProduct from './component/Admin/UpdateProducts.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './component/layout/Not Found/NotFound.js';
import AdminRoute from './component/Routes/AdminRoute.js';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store';
import About from './component/layout/About/About.js';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/about" element={<About />} />
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
        <Route
          path="/process/payment"
          element={<ProtectedRoute>
            <Payment />
          </ProtectedRoute>}
        />
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
        <Route
          path="/admin/dashboard"
          element={<AdminRoute>
            <Dashboard />
          </AdminRoute>}
        />
        <Route
          path="/admin/users"
          element={<AdminRoute >
            <UsersList />
          </AdminRoute>}
        />
        <Route
          path="/admin/orders"
          element={<AdminRoute>
            <OrderList />
          </AdminRoute>}
        />
        <Route
          path="/admin/products"
          element={<AdminRoute>
            <ProductList />
          </AdminRoute>}
        />
        <Route
          path="/admin/reviews"
          element={<AdminRoute>
            <ProductReviews />
          </AdminRoute>}
        />
        <Route
          path="/admin/product"
          element={<AdminRoute>
            <NewProduct />
          </AdminRoute>}
        />
        <Route
          path="/admin/user/:id"
          element={<AdminRoute>
            <UpdateUser />
          </AdminRoute>}
        />
        <Route
          path="/admin/order/:id"
          element={<AdminRoute>
            <ProcessOrder />
          </AdminRoute>}
        />
        <Route
          path="/admin/product/:id"
          element={<AdminRoute>
            <UpdateProduct />
          </AdminRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

