// src/components/UserPanel/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import UserLayout from '../../Layout/UserLayout';
import { Heart, Share2, ShoppingCart, Bell, Trash2, Star, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Dummy Data
  const dummyWishlist = [
    {
      id: 1,
      name: "Head Light Visor",
      category: "Lighting Parts",
      price: 2500,
      originalPrice: 2900,
      rating: 4.5,
      reviews: 156,
      image: "https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Head+Visor",
      stock: 10,
      addedDate: "15/01/2024"
    },
    {
      id: 2,
      name: "Front Mudguard",
      category: "Body Parts",
      price: 1800,
      originalPrice: 2400,
      rating: 4.8,
      reviews: 203,
      image: "https://via.placeholder.com/300x200/2d2d2d/ffffff?text=Mudguard",
      stock: 5,
      addedDate: "12/01/2024"
    },
    {
      id: 3,
      name: "Tail Panels",
      category: "Body Parts",
      price: 3200,
      originalPrice: 4000,
      rating: 4.2,
      reviews: 89,
      image: "https://via.placeholder.com/300x200/1f1f1f/ffffff?text=Tail+Panel",
      stock: 0,
      addedDate: "10/01/2024"
    }
  ];

  // Load from localStorage, fallback to dummy
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved && JSON.parse(saved).length > 0) {
      setWishlist(JSON.parse(saved));
    } else {
      setWishlist(dummyWishlist);
      localStorage.setItem('wishlist', JSON.stringify(dummyWishlist));
    }
  }, []);

  // Save to localStorage
  const saveWishlist = (items) => {
    localStorage.setItem('wishlist', JSON.stringify(items));
    setWishlist(items);
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(p => p.id !== id);
    saveWishlist(updated);
    toast.success('Removed from wishlist');
  };

  // Add to Cart + Redirect
  const addToCartAndRedirect = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if already in cart
    const existing = cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);

    // Redirect to Cart Page
    navigate('/cart');
  };

  // Add All to Cart + Redirect
  const handleAddAllToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let addedCount = 0;

    wishlist.forEach(product => {
      if (product.stock > 0) {
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
          addedCount++;
        }
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${addedCount} items added to cart!`);
    navigate('/cart');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Wishlist link copied!');
  };

  return (
    <UserLayout activePage="wishlist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-800">My Wishlist</h1>
            <p className="text-gray-600">{wishlist.length} items saved for later</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
            >
              <Share2 className="w-4 h-4" />
              Share Wishlist
            </button>
            <button
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image + Heart + Out of Stock */}
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-all"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                </button>
                {product.stock === 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
                <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Added {product.addedDate}</p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  {product.stock > 0 ? (
                    <button
                      onClick={() => addToCartAndRedirect(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  ) : (
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed">
                      <Bell className="w-4 h-4" />
                      Notify Me
                    </button>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Talk with Us Button */}
        <button className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-10">
          <Package className="w-6 h-6" />
        </button>
      </div>
    </UserLayout>
  );
}