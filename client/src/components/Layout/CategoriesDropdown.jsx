import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import {
  Sun,
  Shield,
  Layout,
  Box,
  Disc,
  Feather,
  Zap,
  Wrench,
  Gauge,
  Car,
  PanelLeft,
  PanelRight,
  Lightbulb,
  Wind,
  Package,
} from "lucide-react";

const CategoriesDropdown = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with fade-in */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar with slide-in animation */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header - PURANA WAHI */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#314350]">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Categories List - PURANA STYLE, NAYI CATEGORIES */}
        <nav className="px-4 py-4 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="w-full flex items-center gap-3 py-3 px-3 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition"
            >
              <cat.icon className="w-5 h-5 text-[#314350]" strokeWidth={2} />
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

// TUMHARE SCREENSHOT KE EXACT 15 CATEGORIES ADD KAR DI
const categories = [
  { id: 1, name: "Mudguard/Front Fender", icon: Shield },
  { id: 2, name: "Head Light Visor", icon: Lightbulb },
  { id: 3, name: "Head Light Visor Glass", icon: Sun },
  { id: 4, name: "Tail Panel", icon: PanelLeft },
  { id: 5, name: "Side Panel", icon: PanelRight },
  { id: 6, name: "TPFC", icon: Zap },
  { id: 7, name: "Back Plate", icon: Box },
  { id: 8, name: "Chain Cover PVC/Metal", icon: Package },
  { id: 9, name: "Full Body Kit", icon: Car },
  { id: 10, name: "Side Box", icon: Wrench },
  { id: 11, name: "Blinker/Indicator", icon: Gauge },
  { id: 12, name: "Rear Mudguard", icon: Shield },
  { id: 13, name: "Meter Cowling", icon: Disc },
  { id: 14, name: "Visor Glass", icon: Wind },
  { id: 15, name: "Inner Body", icon: Layout },
];

export default CategoriesDropdown;