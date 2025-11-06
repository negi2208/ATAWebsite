import { useState } from "react";
import CategoriesDropdown from "@/components/Layout/CategoriesDropdown";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="border-b border-gray-200 bg-white font-sans">
        {/* Middle Section */}
        <div className="bg-[#eff4f7] py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-6">
              <a href="/" className="text-3xl font-bold text-primary-700">Ignavo</a>

              <div className="flex-1 max-w-3xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search popular products..."
                    className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-5 pr-12 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 hover:bg-gray-100">
                    <Search className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 group">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E2EAED] flex items-center justify-center group-hover:bg-white">
                    <User className="w-5 h-5 text-[#314350]" strokeWidth={2} />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs">Sign In</div>
                    <div className="font-medium">Account</div>
                  </div>
                </button>
                {/* wishlist */}
                <button className="relative group">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E2EAED] flex items-center justify-center group-hover:bg-white">
                    <Heart className="w-5 h-5 text-[#314350]" strokeWidth={2} />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    1
                  </span>
                </button>
                {/* shoppingcart */}
                <button className="relative group">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E2EAED] flex items-center justify-center group-hover:bg-white">
                    <ShoppingCart className="w-5 h-5 text-[#314350]" strokeWidth={2} />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full"></div>

        {/* Bottom Nav */}
        <nav className="bg-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm font-bold text-neutral-800">
              <button
                onClick={() => setIsCategoriesOpen(true)}
                className="flex items-center gap-3 hover:text-primary-600 transition"
              >
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
                <span className="text-gray-400">|</span>
              </button>

              <div className="flex items-center gap-8">
                <a href="#" className="hover:text-primary-600 flex items-center gap-1">
                  Home 
                </a>
                <a href="#" className="hover:text-primary-600 flex items-center gap-1">
                  Shop 
                </a>
                <a href="#" className="hover:text-primary-600">Tires & Wheels</a>
                <a href="#" className="hover:text-primary-600">Headlights & Lighting</a>
                <a href="#" className="hover:text-primary-600">Blogs</a>
                <a href="#" className="hover:text-primary-600">Contact</a>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
              <HelpCircle className="w-5 h-5" />
              <span>Any Query?</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== SIDEBAR (OUTSIDE HEADER) ===== */}
      <CategoriesDropdown
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
      />
    </>
  );
}