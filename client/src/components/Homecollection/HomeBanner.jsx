import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

// Banner data
const banners = [
  {
    id: 1,
    title: "Add Your Car. Find Perfect Parts.",
    subtitle:
      "Upgrade your ride with premium auto parts built for reliability. Quality-tested components that deliver peace of mind on any road.",
    img: "/images/banner-1.jpg", 
  },
  {
    id: 2,
    title: "Keep Your Engine Running Smoothly.",
    subtitle:
      "High-performance oils and fluids for petrol, diesel, and hybrid engines.",
    img: "/images/banner-1.jpg",
  },
];

export default function HomeBanner() {
  return (
    <div className="relative w-full bg-white mt-0 pt-0 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[480px]"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-20 bg-gray-50 m-0">
              {/* Left Content */}
              <div className="max-w-xl text-center md:text-left py-4 md:py-0">
                <p
                  className="uppercase text-sm text-gray-500 mb-2 tracking-wide"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Refreshing Spring Deals
                </p>
                <h1
                  className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {item.title}
                </h1>
                <p
                  className="text-gray-600 mb-6"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {item.subtitle}
                </p>
                <button
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto md:mx-0 hover:bg-blue-700 transition"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  View All Products <ArrowRight className="w-5 h-5" />
                </button>
                <p
                  className="text-xs text-gray-500 mt-4"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Time remaining until the end of the campaign:{" "}
                  <span className="font-semibold text-gray-700">
                    36 Days 12 Hours 59 Min 01 Sec
                  </span>
                </p>
              </div>

              {/* Right Image */}
              <div className="flex justify-center md:justify-end items-center w-full md:w-1/2">
                <img
                  src={item.img}
                  alt="banner"
                  className="w-[80%] md:w-[70%] object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
