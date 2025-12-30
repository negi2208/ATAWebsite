import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Icons map (fallback supported)
import {
  Shield,
  Lightbulb,
  Sun,
  PanelLeft,
  PanelRight,
  Zap,
  Box,
  Package,
  Car,
  Wrench,
  Gauge,
  Disc,
  Wind,
  Layout,
} from "lucide-react";

const ICON_MAP = {
  mudguard: Shield,
  headlight: Lightbulb,
  visor: Sun,
  "tail-panel": PanelLeft,
  "side-panel": PanelRight,
  tpfc: Zap,
  "back-plate": Box,
  "chain-cover": Package,
  "full-body-kit": Car,
  "side-box": Wrench,
  blinker: Gauge,
  "rear-mudguard": Shield,
  "meter-cowling": Disc,
  "visor-glass": Wind,
  "inner-body": Layout,
};

const CategoriesDropdown = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ------------------ Outside Click ------------------ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  /* ------------------ Fetch Categories ------------------ */
  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );

        if (res.data?.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  /* ------------------ Category Click ------------------ */
  const handleCategoryClick = (slug) => {
    onClose();
    navigate(`/shop?category=${slug}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#314350]">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Categories */}
        <nav className="px-4 py-4 space-y-1">
          {loading ? (
            <p className="text-sm text-gray-500 px-2">
              Loading categories...
            </p>
          ) : (
            categories.map((cat) => {
              const Icon =
                ICON_MAP[cat.slug] || Layout;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="w-full flex items-center gap-3 py-3 px-3 rounded-lg
                  text-left text-gray-700 hover:bg-gray-100 transition"
                >
                  <Icon className="w-5 h-5 text-[#314350]" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })
          )}
        </nav>
      </div>
    </>
  );
};

export default CategoriesDropdown;
