// HomeBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    badge: "WEEK BEST SELLING PARTS",
    title: "HIGH QUALITY CAR BRAKE SYSTEM",
    description: "Installation of parts in the services of our partners limited time new customer, also get free shipping on orders.",
    image: "/images/Home/image3.png",
  },
  {
    id: 2,
    badge: "EXCLUSIVE OFFERS & COUPONS",
    title: "ORIGINAL ENGINE OIL FULLY SYNTHETIC",
    description: "Installation of parts in the services of our partners limited time new customer, also get free shipping on orders.",
    image: "/images/Home/image4.png",
  },
];

export default function HomeBanner() {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        speed={1400}
        className="h-[500px] md:h-[580px] lg:h-[520px]"
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
              className="absolute inset-0 bg-cover bg-center animate-bg"
              style={{ backgroundImage: "url('/images/Home/background.webp')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-900 to-black" />

            <div className="relative h-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32">
              
              {/* Left Content - PURANI ANIMATION */}
              <div className="max-w-2xl text-center lg:text-left z-10 animate-text animate-in pt-10 lg:pt-0">
                <div className="inline-block bg-yellow-400 text-black text-xs md:text-sm font-bold px-6 py-2 rounded-tr-lg rounded-bl-lg mb-6 shadow-lg transform -rotate-2">
                  {item.badge}
                </div>

                <h1 
                  className="text-2xl md:text-4xl lg:text-3xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4"
                  style={{ fontFamily: '"Montserrat", "Protest Strike", sans-serif', fontWeight: 800 }}
                >
                  {item.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {word} {i === 0 && <br className="hidden lg:block" />}
                    </span>
                  ))}
                </h1>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-6 max-w-xl leading-relaxed">
                  {item.description}
                </p>

                <button className="bg-secondary-800 text-black font-bold px-4 py-3 rounded-lg text-lg md:text-sm flex items-center gap-3 shadow-2xl hover:scale-105 transition-all duration-300">
                  Discover Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Image - PODIUM HATAYA, ANIMATION RAKHI */}
              <div className="relative flex justify-center lg:justify-end items-center h-full animate-image animate-in pb-10 lg:pb-0">
                <div className="relative max-w-md lg:max-w-2xl xl:max-w-4xl">
                  {/* PODIUM COMPLETELY REMOVED */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}