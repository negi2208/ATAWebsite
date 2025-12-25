// SimpleImageCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/Home/banner2.jpeg",
  "/images/Home/banner1.jpeg",
  "/images/Home/banner3.jpeg",
  
];

export default function SimpleImageCarousel() {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={true}
        speed={1000}
        className="h-[200px] xs:h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[450px] 2xl:h-[700px]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Optional dark overlay for better visibility of dots/arrows */}
              {/* <div className="absolute inset-0 bg-black opacity-20 pointer-events-none" /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows - Visible on Desktop & Tablet */}
      <div className="custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 backdrop-blur-sm hover:bg-white/70 text-white rounded-full p-3 cursor-pointer transition-all shadow-lg">
        <ChevronLeft className="w-8 h-8" />
      </div>
      <div className="custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/40 backdrop-blur-sm hover:bg-white/70 text-white rounded-full p-3 cursor-pointer transition-all shadow-lg">
        <ChevronRight className="w-8 h-8" />
      </div>

      {/* Custom Pagination Dots - Mobile & Desktop */}
      <div className="custom-pagination absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2" />

      {/* Custom Styling */}
      <style jsx>{`
        :global(.custom-pagination .swiper-pagination-bullet) {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.6;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        :global(.custom-pagination .swiper-pagination-bullet-active) {
          opacity: 1;
          background: #fbbf24;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}