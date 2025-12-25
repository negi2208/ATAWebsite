// src/components/Product/QuantitySelector.jsx
import React from "react";

export default function QuantitySelector({ qty, setQty }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition"
      >
        -
      </button>
      <span className="w-16 text-center font-bold text-lg">{qty}</span>
      <button
        onClick={() => setQty(qty + 1)}
        className="w-10 h-10 rounded-lg border hover:bg-gray-100 transition"
      >
        +
      </button>
    </div>
  );
}