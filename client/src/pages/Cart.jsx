// src/pages/Cart.jsx
import React from "react";
import CartSection from "../components/Cart/CartSection";

export default function Cart() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Shopping Cart</h1>
          <p className="text-lg opacity-90">Review your items before checkout</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <CartSection />
        </div>
      </section>
    </>
  );
}