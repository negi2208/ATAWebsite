// src/components/WishlistSection/EmptyWishlist.jsx
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyWishlist() {
  return (
    <div className="py-20 px-6 text-center">
      <Heart className="w-20 h-20 mx-auto text-gray-300 mb-6" strokeWidth={1.5} />
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Your wishlist is empty
      </h3>
      <p className="text-gray-500 mb-8">
        Save your favorite products and buy them later!
      </p>
      <Link
        to="/shop"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        Continue Shopping
      </Link>
    </div>
  );
}