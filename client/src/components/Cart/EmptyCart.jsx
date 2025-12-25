// src/components/Cart/EmptyCart.jsx
import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="py-24 text-center">
      <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" strokeWidth={1.5} />
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
      <p className="text-gray-600 mb-8">Add some awesome tires to get started!</p>
      <Link
        to="/shop"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
      >
        Start Shopping
      </Link>
    </div>
  );
}