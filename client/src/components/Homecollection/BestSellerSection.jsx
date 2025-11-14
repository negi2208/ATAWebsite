import { useState, useRef, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function BestSeller() {
  const scrollRef = useRef(null);

  // API READY — Future mein backend se aayega
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data (baad mein API se replace hoga)
  useEffect(() => {
    const demoData = [
      { id: 1, front: "images/bestseller/bestseller-demo.webp", back: "images/bestseller/bestseller-back.webp", title: "Zerex G05 Phosphate Free", rating: 4.8, reviews: 23, price: 33.43, oldPrice: 48.55 },
      { id: 2, front: "images/bestseller/bestseller-demo.webp", back: "images/bestseller/bestseller-back.webp", title: "Anzo USA – 111630 FORD F-150", rating: 4.2, reviews: 15, price: 117.25, oldPrice: 171.89 },
      { id: 3, front: "images/bestseller/bestseller-demo.webp", back: "images/bestseller/bestseller-back.webp", title: "Premium Ceramic Brake Pads", rating: 4.9, reviews: 42, price: 89.99, oldPrice: 129.99 },
      { id: 4, front: "images/bestseller/bestseller-demo.webp", back: "images/bestseller/bestseller-back.webp", title: "High Performance Calipers", rating: 4.7, reviews: 28, price: 299.99, oldPrice: 399.99 },
      { id: 5, front: "images/bestseller/bestseller-demo.webp", back: "images/bestseller/bestseller-back.webp", title: "Drilled & Slotted Rotors", rating: 4.6, reviews: 35, price: 179.99, oldPrice: 249.99 },
    ];
    setProducts(demoData);
    setLoading(false);
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  const ProductCard = ({ product }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div className="flex-shrink-0 w-72 group">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          
          {/* FLIP + ZOOM ON BACK IMAGE */}
          <div 
            className="relative h-64 bg-gradient-to-b from-gray-50 to-gray-100"
            style={{ perspective: "1200px" }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            {/* Front Image */}
            <div className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
              <img
                src={product.front}
                alt={product.title}
                className="max-w-full max-h-full object-contain backface-hidden"
              />
            </div>

            {/* Back Image — FLIP KE BAAD ZOOM HOGA */}
            <div className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-700 preserve-3d ${isFlipped ? "zoom-in" : "rotate-y-180"}`}>
              <img
                src={product.back}
                alt="Gallery view"
                className="max-w-full max-h-full object-contain backface-hidden"
              />
            </div>

            {/* Wishlist */}
            <button className="absolute top-4 right-4 z-20 bg-white p-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 transition" />
            </button>
          </div>

          {/* Product Info — TUMHARA WAHI FONT & STYLE */}
          <div className="p-6 text-center">
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-3 leading-tight">
              {product.title}
            </h3>

            <div className="flex items-center justify-center gap-1 mb-3">
              <div className="flex text-yellow-500">
                {"★★★★★".substring(0, Math.floor(product.rating))}
                {product.rating % 1 >= 0.5 && "★"}
              </div>
              <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl font-bold text-red-600">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <button className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition-all hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header — Tabs HATA DIYE, View All with Arrow */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h2 className="text-4xl font-black text-gray-900">Best Seller</h2>
          
          <a 
            href="/shop" 
            className="flex items-center gap-2 text-red-600 font-bold text-lg hover:underline mt-4 md:mt-0"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <hr className="border-gray-300 mb-12" />

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
          </div>
        ) : (
          /* Carousel */
          <div className="relative group">
            <button 
              onClick={scrollLeft} 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8 text-gray-800" />
            </button>
            <button 
              onClick={scrollRight} 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
            >
              <ChevronRight className="w-8 h-8 text-gray-800" />
            </button>

            <div 
              ref={scrollRef} 
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth py-6"
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS — FLIP + ZOOM ON BACK */}
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .zoom-in {
          transform: rotateY(0deg) scale(1.15);
          animation: zoomIn 0.6s ease-out forwards;
        }
        @keyframes zoomIn {
          0% { transform: rotateY(180deg) scale(0.9); opacity: 0.8; }
          100% { transform: rotateY(0deg) scale(1.15); opacity: 1; }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
,}
      `}</style>
    </section>
  );
}