// src/components/Product/ProductDetailPage.jsx
import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import QuantitySelector from "./QuantitySelector";
import RelatedProducts from "./RelatedProducts";
import ReviewSection from "./ReviewSection"; // YE IMPORT KIYA
import { Heart, Truck, Shield } from "lucide-react";

export default function ProductDetailPage() {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = {
    name: "Castrol GTX High Mileage 5W-30 Synthetic Blend Motor Oil, 5 Quarts",
    sku: "MN020WGB",
    rating: 4.3,
    reviews: 124,
    price: 4116,
    oldPrice: 5777,
    discount: 29,
    images: [
      "/images/bestseller/bestseller-back.webp",
      "/images/bestseller/bestseller-demo.webp",
      "/images/bestseller/bestseller-back.webp",
      "/images/bestseller/bestseller-demo.webp",
      "/images/bestseller/bestseller-back.webp"
    ]
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4 border-b">
        <div className="container mx-auto px-4 text-sm text-gray-600">
          <a href="/" className="hover:text-primary-600">Home</a> / 
          <a href="/shop" className="hover:text-primary-600 ml-1">Oils and fluids</a> / 
          <span className="ml-1 text-gray-900 font-medium">{product.name}</span>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
            
            {/* LEFT: Image Gallery */}
            <div className="order-2 lg:order-1">
              <ImageGallery images={product.images} discount={product.discount} />
            </div>

            {/* RIGHT: Product Details */}
            <div className="order-1 lg:order-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating + SKU + Wishlist */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "fill-yellow-400" : ""}>★</span>
                      ))}
                    </div>
                    <span className="font-medium text-gray-700">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-500">SKU: {product.sku}</span>
                </div>

                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition whitespace-nowrap">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium hover:underline">Add to wishlist</span>
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="text-2xl text-gray-500 line-through">₹{product.oldPrice.toLocaleString("en-IN")}</span>

              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <QuantitySelector qty={qty} setQty={setQty} />
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>

              {/* Category & Brand */}
              <div className="mt-8 text-sm text-gray-600 space-y-1 border-t pt-6">
                <p><strong>Category:</strong> Oils and fluids</p>
                <p><strong>Brand:</strong> Castrol</p>
              </div>
            </div>
          </div>

          {/* Trust Badges WITH DIVIDER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 py-12 border-t bg-white rounded-2xl shadow-sm divide-x divide-gray-300">
            {[
              { icon: Truck, title: "Fast Shipping", desc: "Free shipping on orders over ₹999" },
              { icon: Shield, title: "Easy Return", desc: "30 days hassle-free return policy" },
              { icon: Shield, title: "Warranty Policy", desc: "Official brand warranty included" }
            ].map((item, i) => (
              <div key={i} className="text-center px-8 first:pl-0 last:pr-0">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-9 h-9 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs: Description & Reviews */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-8 py-5 font-bold text-lg transition-colors ${
                    activeTab === "description"
                      ? "text-primary-600 border-b-4 border-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-8 py-5 font-bold text-lg transition-colors ${
                    activeTab === "reviews"
                      ? "text-primary-600 border-b-4 border-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reviews ({product.reviews})
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* DESCRIPTION TAB */}
              {activeTab === "description" && (
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    <strong>1.4X superior sludge protection</strong> compared to tough industry standards, as measured in the Sequence VH Sludge test vs. API SP test limits.
                  </p>
                  <p>
                    Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. 
                    Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a.
                  </p>
                  <p>
                    Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. 
                    Praesent aliquam dignissim viverra. Maecenas lacinia purus in venenatis mollis.
                  </p>
                </div>
              )}

              {/* REVIEWS TAB – ALAG COMPONENT SE */}
              {activeTab === "reviews" && <ReviewSection />}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <RelatedProducts />
          </div>
        </div>
      </section>
    </>
  );
}