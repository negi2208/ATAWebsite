import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import UserAuth from "./pages/UserAuth";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ShopPage from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

// UserPanelRouting//


import Dashboard from './components/UserPanel/Dashboard';
import OrderHistory from './components/UserPanel/OrderHistory';
import Profile from './components/UserPanel/Profile';
import WishlistPage from './components/UserPanel/WishlistPage.jsx';
import SupportPage from './components/UserPanel/SupportPage.jsx';
import MyReviewsPage from './components/UserPanel/MyReviewsPage.jsx';
import OrderTrackingPage from './components/UserPanel/OrderTrackingPage.jsx'; 

function App() {
  return (
    
    <Routes>
      
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

      {/* UserPanel Routing */}

        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/orders" element={<OrderHistory />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/wishlist" element={<WishlistPage />} />
        <Route path="/user/support" element={<SupportPage />} />
        <Route path="/user/reviews" element={<MyReviewsPage />} />
        <Route path="/user/track" element={<OrderTrackingPage />} />
    </Routes>
  )
}

export default App