// src/pages/Wishlist.jsx
import React from "react";
import WishlistSection from "../components/WishlistSection/wishlist"; // correct path

const Wishlist = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">My Wishlist</h1>
          <p className="text-lg opacity-90">Items you love, saved for later</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <WishlistSection />
        </div>
      </section>
    </>
  );
};

export default Wishlist;