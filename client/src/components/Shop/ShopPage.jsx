import React, { useState, useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { X, SlidersHorizontal } from "lucide-react"; // filter + close icons

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dummy Products
  const allProducts = [
    { id: 1, name: "Michelin Pilot Sport 4 225/45 R18", price: 12999, category: "Tires", images: [] },
    { id: 2, name: "Bridgestone Turanza T005", price: 11999, category: "Tires", images: [] },
    { id: 3, name: "OZ Racing Alloy Wheel 18\"", price: 45999, category: "Wheels", images: [] },
    { id: 4, name: "Brembo Brake Pads Set", price: 8999, category: "Brake Pads", images: [] },
    { id: 5, name: "Philips LED Headlight H11", price: 5499, category: "Headlights", images: [] },
    { id: 6, name: "Castrol EDGE 5W-30 4L", price: 3299, category: "Engine Oil", images: [] },
    { id: 7, name: "K&N Air Filter Honda City", price: 4499, category: "Air Filters", images: [] },
    { id: 8, name: "Bilstein Shock Absorber", price: 18999, category: "Suspension", images: [] },
    { id: 9, name: "MagnaFlow Exhaust System", price: 38999, category: "Exhaust", images: [] },
    { id: 10, name: "3D Car Floor Mats", price: 2499, category: "Accessories", images: [] },
    { id: 11, name: "Dash Cam 4K", price: 7999, category: "Accessories", images: [] },
    { id: 12, name: "Car Cover Waterproof", price: 1799, category: "Accessories", images: [] },
  ];

  // Filtering + Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "All Products"
        ? allProducts
        : allProducts.filter((p) => p.category === selectedCategory);

    if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

    return filtered;
  }, [selectedCategory, sortBy]);

  const productsPerPage = 9;
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  React.useEffect(() => setCurrentPage(1), [selectedCategory, sortBy]);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-r from-primary-600 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Shop</h1>
          <p className="text-xl">Premium Tires, Wheels & Accessories</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">

          {/* MOBILE TOP BAR */}
          <div className="flex justify-between items-center mb-6 lg:hidden">

            {/* FILTER ICON */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md"
            >
              <SlidersHorizontal className="w-6 h-6 text-gray-700" />
            </button>

            {/* SORT DROPDOWN */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl"
            >
              <option value="default">Default sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">

            {/* DESKTOP SIDEBAR */}
            <div className="lg:col-span-1 hidden lg:block">
              <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            {/* PRODUCTS AREA */}
            <div className="lg:col-span-3 relative">

              {/* MOBILE SLIDE-IN FILTER */}
              {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex">
                  {/* LEFT PANEL */}
                  <div
                    className="
                    bg-white w-64 p-6 overflow-y-auto animate-slide-left
                    rounded-none shadow-none
                    lg:rounded-xl lg:shadow-xl
                  "
                  >
                    <div className="flex justify-end mb-4">
                      <button onClick={() => setIsFilterOpen(false)}>
                        <X className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>

                    <CategoryFilter
                      selected={selectedCategory}
                      onSelect={(cat) => {
                        setSelectedCategory(cat);
                        setIsFilterOpen(false);
                      }}
                    />
                  </div>

                  {/* BACKDROP */}
                  <div
                    className="flex-1 bg-black/50"
                    onClick={() => setIsFilterOpen(false)}
                  />
                </div>
              )}

              {/* PRODUCT GRID + PAGINATION */}
              {totalProducts === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600">Try selecting a different category</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {totalProducts > productsPerPage && (
                    <Pagination
                      current={currentPage}
                      total={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE ANIMATION */}
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
