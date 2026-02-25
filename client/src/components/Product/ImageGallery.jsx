// src/components/Product/ImageGallery.jsx
import React, { useState } from "react";

export default function ImageGallery({ images = [], discount }) {
    const safeImages = images.length ? images : ["/images/placeholder.jpg"];
  const [mainImage, setMainImage] = useState(images[0] || "/images/placeholder.jpg");
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) images = ["/images/placeholder.jpg"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
          className={`flex items-center justify-center rounded-lg border transition
            ${
              activeIndex === i
                ? "border-primary-600 ring-2 ring-primary-200"
                : "border-gray-300 hover:border-gray-400"
            }`}
        >
          <img
            src={img}
            alt={`Thumb ${i + 1}`}
            className="w-16 h-16 object-contain bg-white"
          />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Main Image */}
      <div className="md:col-span-4 order-1 md:order-2">
        <div className="relative bg-white rounded-xl shadow-lg flex items-center justify-center
                        h-[420px] md:h-[460px] p-6">
          <img
            src={safeImages[activeIndex]}
            alt="Main product"
            className="max-h-full max-w-full object-contain"
          />

          {discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white
                             px-3 py-1 rounded-full text-sm font-bold">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}