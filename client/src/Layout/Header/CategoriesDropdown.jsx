import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ---------------- Icons ---------------- */
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

/* -------- Category slug → Icon map -------- */
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

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  /* ================= FETCH CATEGORIES ================= */
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

  /* ================= CATEGORY CLICK ================= */
  const handleCategoryClick = (slug) => {
    onClose();
    navigate(`/shop?category=${slug}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 translate-x-0"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Categories
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Category List */}
        <nav className="p-4 space-y-1">
          {loading ? (
            <p className="text-sm text-gray-500 px-2">
              Loading categories...
            </p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-gray-500 px-2">
              No categories found
            </p>
          ) : (
            categories.map((cat) => {
              const Icon = ICON_MAP[cat.slug] || Layout;

              return (
                <button
                  key={cat._id || cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg
                  text-left text-gray-700 hover:bg-gray-100 transition"
                >
                  <Icon className="w-5 h-5 text-gray-700" />
                  <span className="font-medium">
                    {cat.name}
                  </span>
                </button>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
};

export default CategoriesDropdown;
