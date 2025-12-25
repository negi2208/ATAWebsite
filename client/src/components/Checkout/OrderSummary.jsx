// src/components/Checkout/OrderSummary.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderSummary({ items, address }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-5 border-b pb-3">Order Summary</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </div>

      <div className="border-t-2 mt-5 pt-5 space-y-3">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold pt-4 border-t">
          <span>Total</span>
          <span className="text-primary-600">₹{total.toFixed(0)}</span>
        </div>
      </div>

      {address && (
        <div className="mt-5 p-4 bg-gray-50 rounded-xl text-sm">
          <p className="font-bold text-primary-600">Delivering to:</p>
          <p>{address.name}</p>
          <p>{address.address}, {address.city} - {address.pincode}</p>
          <p>Phone: {address.phone}</p>
        </div>
      )}

      <Link to="/cart" className="block text-center mt-4 text-primary-600 font-medium hover:underline">
        ← Edit Cart
      </Link>
    </div>
  );
}