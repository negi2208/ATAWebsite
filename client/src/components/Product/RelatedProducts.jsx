// src/components/Product/RelatedProducts.jsx
import React from "react";
import { Heart } from "lucide-react";

export default function RelatedProducts() {
  const related = [
    { name: "Zerex G05 Antifreeze", price: 3343, old: 4855, off: "32%" },
    { name: "Rislone Stop Whine", price: 988, old: 1599, off: "39%" },
    { name: "Pennzoil Platinum 0W-20", price: 2696, old: 4711, off: "43%" },
    { name: "Catalytic Cleaner", price: 2118, old: 3845, off: "45%" },
     { name: "Catalytic Cleaner", price: 2118, old: 3845, off: "45%" },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {related.map((p, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <div className="relative">
              <img src="/images/bestseller/bestseller-demo.webp" alt={p.name} className="w-full h-48 object-cover rounded-t-xl" />
              <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                {p.off} OFF
              </span>
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm line-clamp-2 mb-2">{p.name}</p>
              <div className="text-yellow-400 text-sm">★★★★☆ 4.33 (3)</div>
              <div className="mt-2">
                <span className="text-xl font-bold text-green-600">₹{p.price}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{p.old}</span>
              </div>
              <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}