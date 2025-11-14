// HomeBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    badge: "WEEK BEST SELLING PARTS",
    title: "HIGH QUALITY CAR BRAKE SYSTEM",
    description: "Installation of parts in the services of our partners limited time new customer, also get free shipping on orders.",
    image: "/images/Home/image4.png",
  },
  {
    id: 2,
    badge: "EXCLUSIVE OFFERS & COUPONS",
    title: "ORIGINAL ENGINE OIL FULLY SYNTHETIC",
    description: "Installation of parts in the services of our partners limited time new customer, also get free shipping on orders.",
    image: "/images/Home/image3.png",
  },
];

export default function HomeBanner() {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop
        speed={1400}
        className="h-[620px] sm:h-[680px] md:h-[640px] lg:h-[520px] xl:h-[540px] 2xl:h-[560px]"
        onSlideChange={() => {
          document.querySelectorAll('.swiper-slide-active .animate-in').forEach(el => {
            el.classList.remove('animate-in');
            void el.offsetWidth;
            el.classList.add('animate-in');
          });
        }}
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Home/background.webp')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-900 to-black opacity-90" />

            <div className="relative h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 gap-6">
              
              {/* Left Content */}
              <div className="max-w-4xl text-center lg:text-left z-10 animate-text animate-in pt-12 sm:pt-16 lg:pt-0 pb-8 lg:pb-0">
                <div className="inline-block bg-yellow-400 text-black text-[10px] xs:text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 rounded-tr-lg rounded-bl-lg mb-4 sm:mb-6 shadow-lg transform -rotate-1 sm:-rotate-2">
                  {item.badge}
                </div>

                <h1 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black text-white leading-tight tracking-tighter mb-3 sm:mb-4"
                  style={{ fontFamily: '"Montserrat", "Protest Strike", sans-serif', fontWeight: 900 }}
                >
                  {item.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {word}{" "}
                      {i === 0 && <br className="hidden sm:block lg:hidden xl:block" />}
                    </span>
                  ))}
                </h1>

                <p className="text-gray-200 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-90">
                  {item.description}
                </p>

                <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-3 sm:px-6 sm:py-4 rounded-lg text-sm sm:text-base flex items-center gap-3 shadow-2xl hover:scale-105 transition-all duration-300 mx-auto lg:mx-0">
                  Discover Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Image */}
              <div className="absolute lg:relative inset-0 flex items-end justify-center lg:justify-end pointer-events-none lg:pointer-events-auto pb-4 lg:pb-0">
                <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl px-4 lg:px-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain object-bottom drop-shadow-2xl 
                      scale-95 sm:scale-100 lg:scale-100 
                      translate-y-2 sm:translate-y-0 
                      animate-image animate-in"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Arrows */}
        <div className="custom-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 backdrop-blur-md hover:bg-white/50 text-white rounded-full p-2 sm:p-3 cursor-pointer transition-all duration-300">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="custom-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 backdrop-blur-md hover:bg-white/50 text-white rounded-full p-2 sm:p-3 cursor-pointer transition-all duration-300">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </Swiper>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-in { opacity: 0; }
        .animate-in.animate-text { animation: fadeInUp 0.8s ease-out forwards; animation-delay: 0.3s; }
        .animate-in.animate-image { animation: fadeInRight 0.9s ease-out forwards; animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}