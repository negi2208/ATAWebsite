// src/components/Cart/CartSection.jsx
import React, { useState } from "react";
import EmptyCart from "./EmptyCart";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartSection() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Michelin Pilot Sport 4",
      brand: "Michelin",
      price: 12999,
      quantity: 2,
      image: "/images/tires/michelin.jpg"
    },
    {
      id: 2,
      name: "Bridgestone Turanza T005",
      brand: "Bridgestone",
      price: 10999,
      quantity: 1,
      image: "/images/tires/bridgestone.jpg"
    }
  ]);

  // Update quantity
  const updateQuantity = (id, change) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0) // auto remove if qty becomes 0
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 xl:gap-8">
      {/* Cart Items - Full width on mobile */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5">
                {/* Image */}
                <div className="w-full sm:w-28 h-28 sm:h-24 flex-shrink-0">
                  <img
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl border"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-xl font-bold text-primary-600 mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quantity & Delete */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary - Sticky on large screens */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
          <h3 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h3>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18% GST)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary-600 text-2xl">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl text-center block transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="block text-center text-primary-600 font-medium mt-4 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}