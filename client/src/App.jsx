// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserAuth from "./pages/UserAuth";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ShopPage from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

// User Panel
import Dashboard from './components/UserPanel/Dashboard';
import OrderHistory from './components/UserPanel/OrderHistory';
import Profile from './components/UserPanel/Profile';
import WishlistPage from './components/UserPanel/WishlistPage.jsx';
import SupportPage from './components/UserPanel/SupportPage.jsx';
import MyReviewsPage from './components/UserPanel/MyReviewsPage.jsx';
import OrderTrackingPage from './components/UserPanel/OrderTrackingPage.jsx'; 

// Admin Panel
import AdminLogin from './pages/AdminAuth/AdminLogin.jsx';
import ForgotPassword from './pages/AdminAuth/ForgotPassword.jsx';
import ResetPassword from './pages/AdminAuth/ResetPassword.jsx';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
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
      </Route>

      {/* User Panel - Protected */}
      <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRole="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/orders"
        element={
          <ProtectedRoute allowedRole="user">
            <OrderHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <ProtectedRoute allowedRole="user">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/wishlist"
        element={
          <ProtectedRoute allowedRole="user">
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/support"
        element={
          <ProtectedRoute allowedRole="user">
            <SupportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/reviews"
        element={
          <ProtectedRoute allowedRole="user">
            <MyReviewsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/track"
        element={
          <ProtectedRoute allowedRole="user">
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />

      {/* Admin Dashboard - Protected */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <div className="p-8 bg-gray-50 min-h-screen">
              <h1 className="text-3xl font-bold text-red-600 mb-4">Admin Panel</h1>
              <p className="text-gray-700">Welcome to Admin Dashboard!</p>
              {/* Add your admin sidebar/layout here */}
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;