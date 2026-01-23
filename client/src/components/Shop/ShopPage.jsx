import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { X, SlidersHorizontal } from "lucide-react";

import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function ShopPage() {
  /* ================= URL BASED CATEGORY ================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "all";
  const typeFromURL = searchParams.get("type") || "all";
  const [selectedType, setSelectedType] = useState(typeFromURL);

  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* ================= SYNC STATE WITH URL ================= */
  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  useEffect(() => {
    setSelectedType(typeFromURL);
  }, [typeFromURL]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product`,
          {
            params: {
              category: selectedCategory,
              ...(selectedType !== "all" && {
                type: selectedType === "parts" ? "single" : selectedType,
              }),
            },
          }
        );
        console.log(res)

        if (res.data?.success) {
          setProducts(res.data.data || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedType]);

  /* ================= SORTING ================= */
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, sortBy]);

  /* ================= PAGINATION ================= */
  const productsPerPage = 9;
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, selectedType]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-primary-600 to-rose-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shop
          </h1>
          <p className="text-xl">
            Premium Tires, Wheels & Accessories
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* MOBILE TOP BAR */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md"
            >
              <SlidersHorizontal className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* ================= DESKTOP SIDEBAR ================= */}
            <div className="lg:col-span-1 hidden lg:block">
              <CategoryFilter
                selected={selectedCategory}
                onSelect={(cat) => {
                  setSearchParams(cat === "all" ? {} : { category: cat });
                }}
              />
            </div>

            {/* ================= PRODUCTS AREA ================= */}
            <div className="lg:col-span-3 relative">
              {/* MOBILE FILTER */}
              {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex">
                  <div className="bg-white w-64 p-6 overflow-y-auto animate-slide-left">
                    <div className="flex justify-end mb-4">
                      <button onClick={() => setIsFilterOpen(false)}>
                        <X className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>

                    <CategoryFilter
                      selected={selectedCategory}
                      onSelect={(cat) => {
                        setSearchParams(cat === "all" ? {} : { category: cat });
                        setIsFilterOpen(false);
                      }}
                    />
                  </div>

                  <div
                    className="flex-1 bg-black/50"
                    onClick={() => setIsFilterOpen(false)}
                  />
                </div>
              )}

              {/* ================= TYPE SELECT (DROPDOWN) ================= */}
              <div className="flex justify-end mb-6">
                <select
                  value={selectedType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedType(value);

                    setSearchParams((prev) => {
                      const obj = Object.fromEntries(prev.entries());

                      if (value === "all") {
                        delete obj.type; // backend me type nahi jaayega
                      } else {
                        obj.type = value; // parts | kit
                      }

                      return obj;
                    });
                  }}
                  className="px-5 py-3 border rounded-lg text-sm font-medium
               focus:outline-none focus:ring-2 focus:ring-red-500
               bg-white shadow-sm"
                >
                  <option value="all">All Products</option>
                  <option value="parts">Parts</option>
                  <option value="kit">Kits</option>
                </select>
              </div>


              {/* ================= PRODUCT GRID ================= */}
              {loading ? (
                <p className="text-center py-20 text-gray-500">
                  Loading products...
                </p>
              ) : totalProducts === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600">
                    Try selecting a different category
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                      />
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

      {/* ================= SLIDE ANIMATION ================= */}
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
