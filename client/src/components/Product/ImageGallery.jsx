// src/components/Product/ImageGallery.jsx
import React, { useState } from "react";

export default function ImageGallery({ images = [], discount }) {
  const [mainImage, setMainImage] = useState(images[0] || "/images/placeholder.jpg");
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) images = ["/images/placeholder.jpg"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* LEFT: Thumbnails */}
      <div className="md:col-span-1 order-2 md:order-1">
        <div className="flex md:flex-col gap-3 max-h-96 overflow-y-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setMainImage(img);
                setActiveIndex(i);
              }}
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === i
                  ? "border-primary-600 shadow-xl ring-4 ring-primary-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img src={img} alt={`Thumb ${i + 1}`} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Main Image */}
      <div className="md:col-span-4 order-1 md:order-2">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={mainImage}
            alt="Main product"
            className="w-full h-96 md:h-full object-contain transition-all duration-500 hover:scale-105"
          />
          {discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-2 rounded-full text-lg shadow-lg z-10">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}