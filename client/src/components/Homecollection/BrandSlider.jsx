import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const brands = [
  { id: 1, img: "/images/brands/logo-honda.png" },
  { id: 2, img: "/images/brands/logo-honda.png" },
  { id: 3, img: "/images/brands/logo-honda.png" },
  { id: 4, img: "/images/brands/logo-honda.png" },
  { id: 5, img: "/images/brands/logo-honda.png" },
  { id: 6, img: "/images/brands/logo-honda.png" },
  { id: 7, img: "/images/brands/logo-honda.png" },
  { id: 8, img: "/images/brands/logo-honda.png" },
];

export default function BrandSlider() {
  return (
    <div className="relative w-full bg-white py-6 overflow-hidden">
      {/* Full-width Top Divider – width kam ki (thinner line) */}
     <hr className="border-gray-200 w-[1400px] m-auto pt-4" />

      {/* Slider Container with Fade Effect */}
      <div className="relative">
        {/* Left Fade Mask – thoda aur fade (w-48 = wider gradient ~12rem) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-white to-transparent"></div>
        
        {/* Right Fade Mask – thoda aur fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l from-white to-transparent"></div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={20}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseHover: true,
          }}
          speed={3000}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="!overflow-visible"
        >
          {/* {brands.map((brand) => (
            <SwiperSlide key={brand.id} className="flex justify-center">
              <img
                src={brand.img}
                alt="Brand logo"
                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>

      {/* Full-width Bottom Divider – width kam ki */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-200" />
    </div>
  );
}