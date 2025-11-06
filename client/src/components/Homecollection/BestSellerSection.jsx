import { useState } from "react";

export default function BestSeller() {
  const [activeTab, setActiveTab] = useState("Brakes");

  const tabs = ["Brakes", "Tires & Wheels", "Tools & Equipment"];

  const productsData = {
    "Brakes": [
      {
        id: 1,
        img: "/bestseller/bestseller-demo.webp",
        title: "Zerex G05 Phosphate Free Antifreeze Coolant Concentrate 1 Gallon",
        rating: 4.33,
        reviews: 3,
        price: 33.43,
        oldPrice: 48.55,
      },
      {
        id: 2,
        img: "/bestseller/bestseller-demo.webp",
        title: "Anzo USA – 111630A FORD F-150 15-17 FULL LED PROJECTOR HEADLIGHTS",
        rating: 3.33,
        reviews: 3,
        price: 117.25,
        oldPrice: 171.89,
      },
      {
        id: 3,
        img: "/bestseller/bestseller-demo.webp",
        title: "Zerex G05 Phosphate Free Antifreeze Coolant Concentrate 1 Gallon",
        rating: 4.33,
        reviews: 3,
        price: 33.43,
        oldPrice: 48.55,
      },
      {
        id: 4,
        img: "/bestseller/bestseller-demo.webp",
        title: "Anzo USA – 111630A FORD F-150 15-17 FULL LED PROJECTOR HEADLIGHTS",
        rating: 3.33,
        reviews: 3,
        price: 117.25,
        oldPrice: 171.89,
      },
      {
        id: 5,
        img: "/bestseller/bestseller-demo.webp",
        title: "Anzo USA – 111630A FORD F-150 15-17 FULL LED PROJECTOR HEADLIGHTS",
        rating: 3.33,
        reviews: 3,
        price: 117.25,
        oldPrice: 171.89,
      },
    ],
    "Tires & Wheels": [
      {
        id: 5,
        img: "/bestseller/bestseller-demo.webp",
        title: "Goodyear Eagle Exhilarate UHP All Season 245_45ZR17 99Y XL",
        rating: 3.67,
        reviews: 3,
        price: 198.55,
        oldPrice: 299.88,
      },
      {
        id: 6,
        img: "/bestseller/bestseller-demo.webp",
        title: "Michelin Pilot Sport 4 Performance Tire 235/40ZR18",
        rating: 4.5,
        reviews: 4,
        price: 225.49,
        oldPrice: 289.00,
      },
    ],
    "Tools & Equipment": [
      {
        id: 7,
        img: "/bestseller/bestseller-demo.webp",
        title: "Mechanic Tool Set 120 PCS Chrome Vanadium",
        rating: 4.8,
        reviews: 6,
        price: 135.99,
        oldPrice: 169.99,
      },
      {
        id: 8,
        img: "/bestseller/bestseller-demo.webp",
        title: "Hydraulic Floor Jack 3 Ton Heavy Duty",
        rating: 4.7,
        reviews: 5,
        price: 185.49,
        oldPrice: 229.99,
      },
    ],
  };

  const products = productsData[activeTab];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Tabs */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex flex-wrap items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">Best Seller</h2>
            <div className="flex space-x-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-gray-300 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <a href="/shop" className="text-blue-600 font-medium hover:underline mt-3 sm:mt-0">
            View All
          </a>
        </div>

        <hr className="my-6" />

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col"
            >
              {/* Image */}
              <div className="relative mb-4 flex items-center justify-center h-48">
                <img
                  src={p.img}
                  alt={p.title}
                  className="max-h-full max-w-full object-contain"
                />
                {/* ❤️ Wishlist icon */}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.313 9 12 9 12s9-4.687 9-12z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center space-x-1 text-yellow-400 text-sm mb-1">
                  {"★".repeat(Math.round(p.rating))}
                  <span className="text-gray-600 font-semibold ml-1">
                    {p.rating}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({p.reviews})
                  </span>
                </div>
                <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2">
                  {p.title}
                </h3>
                <div className="text-xl font-bold text-green-600">
                  ${p.price.toFixed(2)}{" "}
                  <span className="text-gray-400 line-through text-sm">
                    ${p.oldPrice.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart */}
                <button className="mt-2 bg-blue-700 text-white rounded-md py-2 font-medium hover:bg-blue-800 transition">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
