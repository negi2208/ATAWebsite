import React from "react";

const categories = [
  "All Products", "Tires", "Wheels", "Brake Pads", "Headlights", 
  "Engine Oil", "Air Filters", "Suspension", "Exhaust", "Accessories"
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs lg:max-w-none">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Product Categories</h3>
      <div className="space-y-2">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
          >
            <input
              type="radio"
              name="category"
              value={cat}
              checked={selected === cat}
              onChange={() => onSelect(cat)}
              className="w-4 h-4 text-primary-600 accent-primary-600"
            />
            <span className={`text-sm ${selected === cat ? "font-bold text-primary-600" : "text-gray-700"}`}>
              {cat}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
