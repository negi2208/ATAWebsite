import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 hover:fill-red-600" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 h-10">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-yellow-400 ${i < 4 ? "fill-yellow-400" : ""}`}>★</span>
          ))}
          <span className="text-xs text-gray-500 ml-1">(124)</span>
        </div>
        <p className="text-lg sm:text-xl font-bold text-primary-600">₹{product.price.toLocaleString("en-IN")}</p>
        <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
