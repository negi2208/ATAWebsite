import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewsSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
   
    <section className="pb-12 bg-white">
       <hr className="border-gray-200 w-[1200px] m-auto py-8" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">

          {/* Left: Static Text + Rating */}
          <div className="flex-shrink-0 w-full md:w-80">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Excellent</h2>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-green-600 text-2xl">★</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Based on <strong>2,147</strong> reviews
            </p>
            <p className="text-gray-600 text-sm italic">
              All comments are from real users who have made purchases before.
            </p>
          </div>

          {/* Right: Horizontal Review Slider */}
          <div className="flex-1 relative min-w-0">
            {/* Left Arrow - Moved Further Out */}
            <button
              onClick={scrollLeft}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Right Arrow - Moved Further Out */}
            <button
              onClick={scrollRight}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Slider */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-4"
            >
              {/* Review 1 */}
              <div className="flex-shrink-0 w-72">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-600 text-lg">★</span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">Purchased user</span>
                </div>
                <p className="text-gray-800 text-sm mb-2 leading-relaxed line-clamp-3">
                  Great quality fast delivery and excellent customer service. Proin a accumsan mauris. Quisque laoreet consequat risus eget accumsan. Mauris...
                </p>
                <p className="text-sm font-medium text-gray-900">Jessica Lindström</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>

              {/* Review 2 */}
              <div className="flex-shrink-0 w-72">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-600 text-lg">★</span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">Purchased user</span>
                </div>
                <p className="text-gray-800 text-sm mb-2 leading-relaxed line-clamp-3">
                  Great quality fast delivery and excellent customer service. Proin a accumsan mauris. Quisque laoreet consequat risus eget accumsan. Mauris...
                </p>
                <p className="text-sm font-medium text-gray-900">John Malkovich</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>

              {/* Review 3 */}
              <div className="flex-shrink-0 w-72">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-600 text-lg">★</span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">Purchased user</span>
                </div>
                <p className="text-gray-800 text-sm mb-2 leading-relaxed line-clamp-3">
                  Great quality fast delivery and excellent customer service. Proin a accumsan mauris. Quisque laoreet consequat risus eget accumsan. Mauris...
                </p>
                <p className="text-sm font-medium text-gray-900">Teresa Holland</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>

              {/* Review 4 */}
              <div className="flex-shrink-0 w-72">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-600 text-lg">★</span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">Purchased user</span>
                </div>
                <p className="text-gray-800 text-sm mb-2 leading-relaxed line-clamp-3">
                  Great quality fast delivery and excellent customer service. Proin a accumsan mauris. Quisque laoreet consequat risus eget accumsan. Mauris...
                </p>
                <p className="text-sm font-medium text-gray-900">Jessica Lindström</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}