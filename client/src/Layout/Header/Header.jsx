import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  Search,
  X,
  HelpCircle,
  Package,
} from "lucide-react";

import CategoriesDropdown from "./CategoriesDropdown";
import { useAuthStore } from "../../store/authStore";

/* ================= SEARCH IMAGE HELPER ================= */
const getSearchImage = (product) => {
  const variant = product.variants?.[0];
  const img = variant?.ProductImage;

  if (!img) return "/images/placeholder.webp";

  return (
    img.front_img ||
    img.left_img ||
    img.right_img ||
    "/images/placeholder.webp"
  );
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const { isLoggedIn, logout } = useAuthStore();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  /* ================= SEARCH API ================= */
  useEffect(() => {
    if (!isSearchOpen || !searchQuery.trim()) return;

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/search`,
          { params: { q: searchQuery.trim() } }
        );

        setSearchResults(res.data?.data || []);
      } catch (err) {
        console.error("Search error", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        {/* TOP BAR */}
        <div className="bg-[#eff4f7]">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
            {/* LOGO */}
            <Link to="/">
              <img
                src="/images/Logo/ata-logo-84.png"
                alt="ATA"
                className="h-14 md:h-16 lg:h-20 hover:scale-105 transition"
              />
            </Link>

            {/* DESKTOP SEARCH */}
            <div className="flex-1 max-w-3xl hidden md:block">
              <div className="relative">
                <input
                  readOnly
                  onClick={() => setIsSearchOpen(true)}
                  placeholder="Search popular products..."
                  className="w-full rounded-full border bg-white py-3 pl-6 pr-14 text-sm cursor-pointer"
                />
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 p-2.5 rounded-full"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* CALL BUTTON */}
            <button
              onClick={() => (window.location.href = "tel:+919175900003")}
              className="hidden md:flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full text-sm font-medium"
            >
              <HelpCircle className="w-5 h-5" />
              Any Query?
            </button>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <nav className="border-t bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* ALL CATEGORIES */}
              <button
                onClick={() => setIsCategoriesOpen(true)}
                className="flex items-center gap-3 font-bold text-sm hover:text-primary-600"
              >
                <Menu className="w-5 h-5" />
                All Categories
              </button>

              {/* DESKTOP LINKS */}
              <div className="hidden md:flex gap-8 font-bold text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`hover:text-primary-600 ${
                      isActive(link.path)
                        ? "text-primary-600"
                        : "text-neutral-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* MOBILE MENU BTN */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-end border-b p-2">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="px-6 pt-6">
              <input
                readOnly
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                placeholder="Search products..."
                className="w-full rounded-full border py-4 px-6 bg-gray-50"
              />
            </div>

            <div className="flex-1 px-6 mt-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-5 text-xl border-b ${
                    isActive(link.path)
                      ? "text-primary-600"
                      : "text-neutral-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ================= CATEGORIES DROPDOWN ================= */}
      <CategoriesDropdown
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
      />

      {/* ================= SEARCH MODAL ================= */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[9999] flex justify-center pt-12 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="font-bold">Search Products</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5">
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border-2 rounded-xl px-4 py-4"
              />
            </div>

            <div className="max-h-[65vh] overflow-y-auto border-t">
              {searchResults.length ? (
                searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setIsSearchOpen(false);
                    }}
                    className="flex gap-4 p-4 hover:bg-primary-50 cursor-pointer border-b"
                  >
                    <img
                      src={getSearchImage(p)}
                      alt={p.name}
                      className="w-14 h-14 object-contain"
                    />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{Number(p.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-4" />
                  {searchLoading ? "Searching..." : "No products found"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
