// src/components/Shop/ShopPage.jsx
import React, { useState, useMemo } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  // Dummy Products (real API se replace kar dena)
  const allProducts = [
    { id: 1, name: "Michelin Pilot Sport 4 225/45 R18", price: 12999, category: "Tires", images: ["/img/1a.jpg", "/img/1b.jpg"] },
    { id: 2, name: "Bridgestone Turanza T005", price: 11999, category: "Tires", images: ["/img/2a.jpg", "/img/2b.jpg"] },
    { id: 3, name: "OZ Racing Alloy Wheel 18\"", price: 45999, category: "Wheels", images: ["/img/3a.jpg", "/img/3b.jpg"] },
    { id: 4, name: "Brembo Brake Pads Set", price: 8999, category: "Brake Pads", images: ["/img/4a.jpg", "/img/4b.jpg"] },
    { id: 5, name: "Philips LED Headlight H11", price: 5499, category: "Headlights", images: ["/img/5a.jpg", "/img/5b.jpg"] },
    { id: 6, name: "Castrol EDGE 5W-30 4L", price: 3299, category: "Engine Oil", images: ["/img/6a.jpg", "/img/6b.jpg"] },
    { id: 7, name: "K&N Air Filter Honda City", price: 4499, category: "Air Filters", images: ["/img/7a.jpg", "/img/7b.jpg"] },
    { id: 8, name: "Bilstein Shock Absorber", price: 18999, category: "Suspension", images: ["/img/8a.jpg", "/img/8b.jpg"] },
    { id: 9, name: "MagnaFlow Exhaust System", price: 38999, category: "Exhaust", images: ["/img/9a.jpg", "/img/9b.jpg"] },
    { id: 10, name: "3D Car Floor Mats", price: 2499, category: "Accessories", images: ["/img/10a.jpg", "/img/10b.jpg"] },
    { id: 11, name: "Dash Cam 4K", price: 7999, category: "Accessories", images: ["/img/11a.jpg", "/img/11b.jpg"] },
    { id: 12, name: "Car Cover Waterproof", price: 1799, category: "Accessories", images: ["/img/12a.jpg", "/img/12b.jpg"] },
    // Add more if needed
  ];

  // FILTER + SORT LOGIC
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === "All Products"
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);

    // Sort
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  const productsPerPage = 9;
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Current page products
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  // SHOW PAGINATION ONLY IF MORE THAN 9 PRODUCTS
  const showPagination = totalProducts > productsPerPage;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Shop</h1>
          <p className="text-xl">Premium Tires, Wheels & Accessories</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            {/* Products Area */}
            <div className="lg:col-span-3">
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-gray-600 font-medium">
                  Showing {currentProducts.length > 0 ? `${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, totalProducts)}` : "0"} of {totalProducts} results
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:outline-none"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* No Products Message */}
              {totalProducts === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600">Try selecting a different category</p>
                </div>
              ) : (
                <>
                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* PAGINATION - ONLY SHOW IF MORE THAN 9 PRODUCTS */}
                  {showPagination && (
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
    </>
  );
}