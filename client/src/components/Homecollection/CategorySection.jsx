import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategorySection() {
  const scrollRef = useRef(null);

  const categories = [
    { id: 1, img: "/images/categories/category-air-condition.png", title: "Head light visor", slug: "head-light-visor" },
    { id: 2, img: "/images/categories/category-wiper.png", title: "Front mudguard", slug: "front-mudguard" },
    { id: 3, img: "/images/categories/category-brakes.png", title: "Tail panels", slug: "tail-panels" },
    { id: 4, img: "/images/categories/category-care.png", title: "Side panel", slug: "side-panel" },
    { id: 5, img: "/images/categories/category-engine.png", title: "Scooty front nose", slug: "scooty-front-nose" },
    { id: 6, img: "/images/categories/category-damping.png", title: "Front wings", slug: "front-wings" },
    { id: 7, img: "/images/categories/category-wiper.png", title: "Seat cover", slug: "seat-cover" },
    { id: 8, img: "/images/categories/category-wiper.png", title: "Tyres", slug: "tyres" },
    { id: 9, img: "/images/categories/category-wiper.png", title: "Chain sprocket", slug: "chain-sprocket" },
    { id: 10, img: "/images/categories/category-wiper.png", title: "Battery", slug: "battery" },
    { id: 11, img: "/images/categories/category-wiper.png", title: "Side mirror", slug: "side-mirror" },
    { id: 12, img: "/images/categories/category-wiper.png", title: "Handle bar", slug: "handle-bar" },
    { id: 13, img: "/images/categories/category-wiper.png", title: "Leg guard", slug: "leg-guard" },
    { id: 14, img: "/images/categories/category-wiper.png", title: "Silencer", slug: "silencer" },
    { id: 15, img: "/images/categories/category-wiper.png", title: "Indicators", slug: "indicators" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 50) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Shop by Category
        </h2>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 snap-x snap-mandatory pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...categories, ...categories].map((cat, index) => (
              <a
                key={`${cat.id}-${index}`}
                href={`/category/${cat.slug}`}
                className="flex-shrink-0 w-64 snap-center group/item"
              >
                {/* Main Card */}
                <div className="relative flex flex-col items-center justify-center p-8 bg-[#F1F5F9] rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
                  
                  {/* Red Overlay (Hover Only) */}
                  <div className="absolute inset-0 bg-red-600 scale-0 group-hover/item:scale-100 transition-transform duration-300 origin-center"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="mb-5 h-32 w-32 flex items-center justify-center">
                      <img
                        src={cat.img}
                        alt={cat.title}
                        className="max-h-[500px] max-w-full object-contain transition-all duration-300 
                           group-hover/item:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center transition-colors duration-300 
                      group-hover/item:text-white">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}