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

// App.js
// ... (import statements)

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      {!isAuthenticated && <LoginSignUp />}
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

