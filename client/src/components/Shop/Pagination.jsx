import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ current, total, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= total; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="p-3 rounded-lg bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-lg transition-all ${
            current === page
              ? "bg-primary-600 text-white shadow-lg"
              : "bg-white shadow hover:bg-gray-100 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="p-3 rounded-lg bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
