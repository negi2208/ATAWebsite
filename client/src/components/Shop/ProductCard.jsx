import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getGuestToken } from "../../utils/guest";
import { addToWishlist } from "../../utils/Addwishlist";
import { toast } from "react-hot-toast";
import { resolveImageUrl } from "../../utils/ImagesUtils"

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  const images = product?.variants?.[0]?.ProductImage
    ? [
      resolveImageUrl(product.variants[0].ProductImage.front_img),
      resolveImageUrl(product.variants[0].ProductImage.left_img),
      resolveImageUrl(product.variants[0].ProductImage.right_img),
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
          variant_id: product.variants?.[0]?.id, // first variant
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

  const MAX_LENGTH = 60;
  const isLong = product.name.length > MAX_LENGTH;
  const defaultVariantId = product.variants?.[0]?.id;

  const displayName =
    showFullName || !isLong
      ? product.name
      : product.name.slice(0, MAX_LENGTH) + "...";


  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}/${defaultVariantId}`} >
          <img
            src={finalImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover transition-opacity duration-700"
          />
        </Link>
        {/* Wishlist (future) */}
        {/* <button onClick={handleWishlist} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 hover:fill-red-600" />
        </button> */}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="text-sm sm:text-base font-semibold text-gray-800">
          <Link
            to={`/product/${product.id}`}
            className="hover:text-primary-700 transition"
          >
            {displayName}
          </Link>

          {isLong && (
            <button
              onClick={(e) => {
                e.preventDefault(); // ❗ link navigate se roke
                setShowFullName(!showFullName);
              }}
              className="ml-2 text-primary-600 text-xs font-medium hover:underline"
            >
              {showFullName ? "Show less" : "Show more"}
            </button>
          )}
        </div>


        <p className="text-lg sm:text-xl font-bold text-primary-600 mt-2">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full mt-3 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2
            ${adding
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
