import { Eye, Zap } from "lucide-react"; // Zap = perfect minimal fist icon

export default function AboutCompanyOverview() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="relative w-full">
            <div className="max-w-lg mx-auto">
              <img
                src="/images/About/about-image-01.jpg"
                alt="Sai Group Global - Excellence in Manufacturing"
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>

            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 bg-gradient-to-r from-primary-700 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-5 rounded-xl shadow-2xl flex items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-5xl font-black">2+</span>
              <div className="text-sm sm:text-base">
                <span className="block font-bold uppercase tracking-wider">Years</span>
                <span className="block opacity-90">Experience</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="space-y-6 sm:space-y-8 w-full max-w-full">
            <p className="text-xs sm:text-sm text-neutral-500 font-bold uppercase tracking-widest">
              ABOUT ATA Genuine Parts
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-snug sm:leading-tight md:leading-tight max-w-full">
              Redefining Excellence in
              <br />
              <span className="text-primary-700">Automotive Manufacturing</span>
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base max-w-full">
              At ATA Genuine Parts, every component is engineered to deliver strength, perfect fitment, and long-lasting performance. Our plastic body parts are designed to match OEM specifications, ensuring reliability on Indian roads and confidence for mechanics and riders alike. Built using advanced injection moulding technology, ATA products offer superior finish, durability, and impact resistance — making them the preferred choice across workshops and dealerships.
            </p>

           {/* VISION & STRENGTH */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-6">

  {/* Our Vision */}
  <div className="flex items-center gap-4 border-2 border-primary-700 rounded-3xl px-6 sm:px-8 py-5 h-full">
    <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700 flex-shrink-0" strokeWidth={1.5} />

    <div className="flex-1">
      <h3 className="text-lg sm:text-xl font-black text-gray-900">Our Vision</h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-tight">
        Shaping the Future of Automotive Excellence
      </p>
    </div>
  </div>

  {/* Our Strength */}
  <div className="flex items-center gap-4 border-2 border-primary-700 rounded-3xl px-6 sm:px-8 py-5 h-full">
    <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700 flex-shrink-0" strokeWidth={1.5} />

    <div className="flex-1">
      <h3 className="text-lg sm:text-xl font-black text-gray-900">Our Strength</h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-tight">
        Built on Quality & Trust
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}


