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
    </Routes>
  )
}

export default App