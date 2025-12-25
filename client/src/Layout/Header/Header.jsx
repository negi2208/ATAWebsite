// src/components/Layout/Header.jsx → FINAL (Pehle jaisa hamburger + dropdown me cross)

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import CategoriesDropdown from "./CategoriesDropdown";
import { 
  Menu, Search, User, Heart, ShoppingCart, 
  HelpCircle, LogOut, Package, HeartHandshake, X 
} from "lucide-react";

export default function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuthStore();

  const wishlistCount = 1;
  const cartCount = 3;

  const handleAccountClick = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/my-account");
  };

  const handleLogout = () => {
    logout();
    navigate("/my-account");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Tires & Wheels", path: "/tires-wheels" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="border-b border-gray-200 bg-white font-sans sticky top-0 z-50 shadow-sm">
        {/* Top Bar */}
        <div className="bg-[#eff4f7]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-6 py-4">
              <a href="/" className="flex items-center">
                <img src="/images/Logo/ata-logo-84.png" alt="ATA" className="h-14 md:h-16 lg:h-20 transition-all hover:scale-105" />
              </a>

              <div className="flex-1 max-w-3xl mx-8 hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search popular products..."
                    className="w-full rounded-full border border-gray-300 bg-white py-3 pl-6 pr-14 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary-600 p-2.5 hover:bg-primary-700">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-4 lg:gap-6">
                {/* Account, Wishlist, Cart - Same */}
                <div className="relative group">
                  <button onClick={handleAccountClick} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-all">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:border-primary-500 overflow-hidden">
                      {user?.avatar ? <img src={user.avatar} alt="User" className="w-full h-full object-cover" /> : <User className="w-6 h-6 text-neutral-700" strokeWidth={2} />}
                    </div>
                    <div className="hidden lg:block text-left leading-tight">
                      {isLoggedIn ? (
                        <>
                          <div className="text-xs text-gray-500">Welcome back</div>
                          <div className="font-bold text-neutral-800 truncate max-w-32">{user?.name || user?.email?.split("@")[0]}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs text-gray-500">Hello, Sign in</div>
                          <div className="font-bold text-neutral-800">My Account</div>
                        </>
                      )}
                    </div>
                  </button>
                  {isLoggedIn && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-3">
                        <a href="/dashboard" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50"><Package className="w-4 h-4" /> Dashboard</a>
                        <a href="/orders" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50"><ShoppingCart className="w-4 h-4" /> My Orders</a>
                        <a href="/wishlist" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50"><HeartHandshake className="w-4 h-4" /> Wishlist</a>
                        <hr className="my-2 border-gray-200" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => navigate("/wishlist")} className="relative group">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${isActive("/wishlist") ? "bg-primary-50 border-primary-600" : "bg-white border-gray-300 group-hover:border-primary-500"}`}>
                    <Heart className={`w-5 h-5 ${isActive("/wishlist") ? "text-primary-600 fill-primary-600" : "text-neutral-700 group-hover:text-primary-600"}`} strokeWidth={2} fill={isActive("/wishlist") ? "currentColor" : "none"} />
                  </div>
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{wishlistCount}</span>}
                </button>

                <button onClick={() => navigate("/cart")} className="relative group">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${isActive("/cart") ? "bg-primary-50 border-primary-600" : "bg-white border-gray-300 group-hover:border-primary-500"}`}>
                    <ShoppingCart className={`w-5 h-5 ${isActive("/cart") ? "text-primary-600" : "text-neutral-700 group-hover:text-primary-600"}`} strokeWidth={2} />
                  </div>
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">{cartCount}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsCategoriesOpen(true)} className="flex items-center gap-3 hover:text-primary-600 transition font-bold text-sm">
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <span className="text-gray-400 hidden sm:inline">|</span>
              </button>

              <div className="hidden md:flex items-center gap-8 font-bold text-sm">
                {navLinks.map(link => (
                  <a key={link.path} href={link.path} className={`hover:text-primary-600 transition ${isActive(link.path) ? "text-primary-600" : "text-neutral-800"}`}>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <button className="hidden md:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition-all hover:scale-105">
              <HelpCircle className="w-5 h-5" />
              <span>Any Query?</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden"
            >
              <Menu className="w-8 h-8 text-neutral-800" />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU — Dropdown me Cross (X) */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Full Screen Menu */}
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Top Bar with Cross */}
            <div className="flex justify-end  border-b">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-8 h-8 text-neutral-800" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 pt-6 ">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-4 pl-6 pr-16 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-600 p-3 rounded-full hover:bg-primary-700">
                  <Search className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 px-6 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map(link => (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-5 text-xl font-medium transition border-b border-gray-100 last:border-0 ${
                      isActive(link.path) ? "text-primary-600" : "text-neutral-800 hover:text-primary-600"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <CategoriesDropdown isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} />
    </>
  );
}