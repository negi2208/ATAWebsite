import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getGuestToken } from "../../utils/guest";
import { addToWishlist } from "../../utils/Addwishlist";
import { toast } from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adding, setAdding] = useState(false);


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


  const handleAddToCart = async () => {
    try {
      setAdding(true);

      const guest_token = getGuestToken();
      const user_id = localStorage.getItem("user_id");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          product_id: product.id,
          variant_id: product.ProductVariants?.[0]?.id, // first variant
          quantity: 1,
          ...(user_id ? { user_id } : { guest_token }),
        }
      );

      // ✅ success → go to cart
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart failed", error);
      alert("Failed to add product to cart");
    } finally {
      setAdding(false);
    }
  };

const handleWishlist = async () => {
  try {
    await addToWishlist(product.id);
    toast.success("Added to wishlist ❤️");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to add to wishlist");
  }
};

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={finalImages[currentImageIndex]}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-opacity duration-700"
        />

        {/* Wishlist (future) */}
        {/* <button onClick={handleWishlist} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 hover:fill-red-600" />
        </button> */}
      </div>

      {/* CONTENT */}
     <div className="p-4">
      <Link
        to={`/product/${product.id}`}
        className="block font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 min-h-[40px] hover:text-primary-700 transition"
      >
        {product.name}
      </Link>

        <p className="text-lg sm:text-xl font-bold text-primary-600 mt-2">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full mt-3 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2
            ${
              adding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 text-white"
            }
          `}
        >
          <ShoppingCart className="w-5 h-5" />
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
