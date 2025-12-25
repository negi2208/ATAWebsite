// src/components/WishlistSection/wishlist.jsx
import React from "react";
import EmptyWishlist from "./EmptyWishlist"; // same folder mein hai → ./ use karo
import { Heart, Trash2, ShoppingCart } from "lucide-react";

const WishlistSection = () => {
  // Dummy data (baad mein Zustand se aayega)
  const wishlistItems = [];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist ({wishlistItems.length})</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="p-6">
          <div className="space-y-6">
            {/* Real items yahan aayenge */}
            <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition">
              <div className="bg-gray-200 border border-dashed rounded-xl w-24 h-24" />
              <div className="flex-1">
                <h3 className="font-semibold">Michelin Pilot Sport 4</h3>
                <p className="text-primary-600 font-bold">₹12,999</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <button className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;