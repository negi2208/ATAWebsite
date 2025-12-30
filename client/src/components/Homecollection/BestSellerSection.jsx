import { useRef } from "react";
import { Heart } from "lucide-react";

export default function BestSeller() {
  const scrollRef = useRef(null);

  const products = [
    { id: 1, image: "images/bestseller/bestseller-demo.webp", title: "Air Jordan 7 Retro", subtitle: "Pure Money", price: 1499 },
    { id: 2, image: "images/bestseller/bestseller-demo.webp", title: "Air Jordan 1 Retro High OG FK", subtitle: "\"Banned\"", price: 1249 },
    { id: 3, image: "images/bestseller/bestseller-demo.webp", title: "Jordan Spiz'ike", subtitle: "Poison", price: 1249 },
    { id: 4, image: "images/bestseller/bestseller-demo.webp", title: "Air Jordan 4 Retro", subtitle: "\"Black Cat\"", price: 1899 },
    { id: 5, image: "images/bestseller/bestseller-demo.webp", title: "Air Jordan 11 Retro", subtitle: "\"Space Jam\"", price: 2199 },
    { id: 6, image: "images/bestseller/bestseller-demo.webp", title: "Air Jordan 1 Low", subtitle: "\"Travis Scott\"", price: 3499 },
  ];

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">

          {/* Updated heading (same as KitHighlightSection) */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Bestseller Products
          </h2>

          <div className="flex items-center justify-center mt-4 md:mt-6">
            <div className="flex-1 h-px bg-gray-300 hidden md:block"></div>

            <a 
              href="/shop" 
              className="mx-6 md:mx-10 text-primary-700 font-medium hover:underline text-lg"
            >
              See all products
            </a>

            <div className="flex-1 h-px bg-gray-300 hidden md:block"></div>
          </div>
        </div>

        <div className="relative">

          {/* Arrows - hidden on mobile */}
          <button
            onClick={scrollLeft}
            className="hidden md:block absolute -left-5 lg:-left-10 top-1/2 -translate-y-1/2 z-10 
                       text-primary-600 text-3xl lg:text-4xl font-thin hover:text-primary-700 transition-all"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:block absolute -right-5 lg:-right-10 top-1/2 -translate-y-1/2 z-10 
                       text-primary-700 text-3xl lg:text-4xl font-thin hover:text-primary-800 transition-all"
          >
            →
          </button>

          {/* Bottom Line Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-px bg-gray-300 flex items-center justify-center">
            <div className="w-10 md:w-12 h-1 bg-primary-700 rounded-full"></div>
          </div>

          {/* Slider */}
          <div
            ref={scrollRef}
           className="overflow-x-auto scroll-smooth 
             scrollbar-hide 
             [-ms-overflow-style:none] 
             [scrollbar-width:none] 
             [&::-webkit-scrollbar]:hidden"
>
          <div className="flex gap-6 md:gap-12 justify-start md:justify-center py-8 md:py-12 min-w-max">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>

        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="
      group 
      w-64 sm:w-72 md:w-80 
      bg-white shadow-md hover:shadow-xl 
      transition-all duration-500 
      p-4 sm:p-5 md:p-6 
      relative overflow-hidden
    ">

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <Heart className="w-6 h-6 md:w-7 md:h-7 text-gray-600 hover:text-red-600 hover:fill-red-600 transition" />
      </button>

      {/* PRODUCT IMAGE */}
      <div className="flex justify-center items-center 
          h-40 sm:h-48 md:h-52 
          transition-all duration-500 
          group-hover:h-32 sm:group-hover:h-40 md:group-hover:h-40"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain transition-all duration-500 group-hover:scale-90"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-base sm:text-lg font-medium text-gray-800 mt-3 text-center">
        {product.title}
      </h3>

      {/* SUBTITLE */}
      <p className="text-gray-500 text-center text-xs sm:text-sm mt-1">
        {product.subtitle}
      </p>

      {/* PRICE */}
      <p className="text-2xl sm:text-3xl font-bold text-primary-700 text-center mt-3">
        {product.price.toLocaleString()} kr.
      </p>

      {/* BUTTONS (hover only) */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6 
                      opacity-0 group-hover:opacity-100 transition-all duration-500">

        {/* <button className="bg-primary-700 text-white px-5 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm 
                           hover:bg-primary-800 transition shadow">
          Add to Cart
        </button> */}

        <button className="text-primary-700 font-semibold text-xs sm:text-sm ">
          QUICK VIEW
        </button>

      </div>

    </div>
  );
}
