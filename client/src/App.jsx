import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserAuth from "./pages/UserAuth";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ShopPage from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import OrderSuccess from "./pages/OrderSuccess";
import WhatsAppButton from "./components/WhatsAppButton";

// Layouts
import Layout from './Layout/Layout';
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';

// User Panel
import Dashboard from './components/UserPanel/Dashboard';
import OrderHistory from './components/UserPanel/OrderHistory';
import Profile from './components/UserPanel/Profile';
import WishlistPage from './components/UserPanel/WishlistPage.jsx';
import SupportPage from './components/UserPanel/SupportPage.jsx';
import MyReviewsPage from './components/UserPanel/MyReviewsPage.jsx';
import OrderTrackingPage from './components/UserPanel/OrderTrackingPage.jsx';

// Admin Auth
import AdminLogin from './pages/AdminAuth/AdminLogin.jsx';
import ForgotPassword from './pages/AdminAuth/ForgotPassword.jsx';
import ResetPassword from './pages/AdminAuth/ResetPassword.jsx';

// Admin Panel
import AdminDashboard from './components/AdminPanel/AdminDashboard.jsx';
import AdminUsers from "./components/AdminPanel/UserManagement.jsx";
import AdminProduct from "./components/AdminPanel/AdminProduct.jsx";
import AdminProductDetails from "./components/AdminPanel/AdminProductDetails.jsx"
import AdminOrder from "./components/AdminPanel/AdminOrder.jsx";
import AdminPayments from "./components/AdminPanel/Payments.jsx";
import Profilesetting from "./components/AdminPanel/ProfileSettings.jsx";

// IMPORT THE PROTECTED ROUTES
import AdminProtectedRoute from './pages/AdminAuth/AdminProtectedRoute.jsx';
import UserProtectedRoute from './components/UserAuth/UserProtectedRoute.jsx';
import UserPublicRoute from './components/UserAuth/UserPublicRoute.jsx'; 

import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <>
     <ScrollToTop />
    <Routes>  []
      {/* Public Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-account" element={<UserAuth />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Route>
  
      {/* Admin Protected Routes */}
      {/* <Route element={<AdminProtectedRoute />}> */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/products/:productId" element={<AdminProductDetails />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
          <Route path="/admin/orders/:orderId" element={<AdminOrder />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/profile-settings" element={<Profilesetting />} />
        </Route>
      {/* </Route> */}

      {/* User Protected Routes */}
      <Route element={<UserProtectedRoute />}>
        <Route element={<UserLayout />}> </Route>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/orders" element={<OrderHistory />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/wishlist" element={<WishlistPage />} />
          <Route path="/user/support" element={<SupportPage />} />
          <Route path="/user/reviews" element={<MyReviewsPage />} />
          <Route path="/user/track" element={<OrderTrackingPage />} />
       
      </Route>

      {/* Optional: Prevent logged-in users from seeing login */}
      <Route element={<UserPublicRoute />}>
        <Route path="/my-account" element={<UserAuth />} />
      </Route>

      {/* Admin Auth Routes (Public) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />
    </Routes>
    <WhatsAppButton />
    </>
  );
}

export default App; 
