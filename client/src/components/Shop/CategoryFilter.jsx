import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryFilter({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );

        if (res.data?.success) {
          // Add "All Products" manually
          setCategories([
            { id: "all", name: "All Products", slug: "all" },
            ...res.data.data,
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs lg:max-w-none">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Product Categories
      </h3>

      {loading ? (
        <p className="text-sm text-gray-500">Loading categories...</p>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={selected === cat.slug}
                onChange={() => onSelect(cat.slug)}
                className="w-4 h-4 accent-primary-600"
              />
              <span
                className={`text-sm ${
                  selected === cat.slug
                    ? "font-bold text-primary-600"
                    : "text-gray-700"
                }`}
              >
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
