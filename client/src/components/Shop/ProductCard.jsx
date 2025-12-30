import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ CORRECT: take all 3 images from SAME variant
  const images = product?.ProductVariants?.[0]?.ProductImage
    ? [
        product.ProductVariants[0].ProductImage.front_img,
        product.ProductVariants[0].ProductImage.left_img,
        product.ProductVariants[0].ProductImage.right_img,
      ].filter(Boolean)
    : [];

  const finalImages =
    images.length > 0 ? images : ["/images/placeholder.jpg"];

  useEffect(() => {
    if (finalImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % finalImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [finalImages.length]);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={finalImages[currentImageIndex]}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-opacity duration-700"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 hover:fill-red-600" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <p className="text-lg sm:text-xl font-bold text-primary-600 mt-2">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
