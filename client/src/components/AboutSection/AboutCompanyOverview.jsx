import { Eye, Zap } from "lucide-react"; // Zap = perfect minimal fist icon

export default function AboutCompanyOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: ONE IMAGE + 23+ Years Badge */}
          <div className="relative">
            <div className="max-w-lg mx-auto">
              <img
                src="/images/About/about-image-01.jpg"
                alt="Sai Group Global - Excellence in Manufacturing"
                className="w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>

            {/* 23+ Years Badge */}
            <div className="absolute -top-8 -left-8 bg-gradient-to-r from-primary-700 to-pink-600 text-white px-8 py-5 rounded-xl shadow-2xl flex items-center gap-4">
              <span className="text-5xl font-black">23+</span>
              <div>
                <span className="block text-sm font-bold uppercase tracking-wider">Years</span>
                <span className="block text-xs opacity-90">Experience</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="space-y-8">

            <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">
              ABOUT SAI GROUP GLOBAL
            </p>

            <h2 className="text-4xl md:text-4xl font-black leading-tight">
              Redefining Excellence in
              <br />
              <span className="text-primary-700">Automotive Manufacturing</span>
            </h2>

            <p className="text-gray-600 leading-relaxed text-base">
              Sai Group Global is a trusted OEM manufacturer and development partner in the 
              automotive industry. With expertise in ABS Parts, Safety Helmets, and Die-Casting, 
              we deliver cutting-edge, high-quality solutions that prioritize safety, durability, 
              and performance. Our commitment to excellence and sustainability fuels progress 
              in every product we create.
            </p>

            {/* VISION & STRENGTH – EXACTLY LIKE SCREENSHOT */}
            <div className="flex gap-6 justify-start">
              {/* Our Vision */}
              <div className="flex items-center gap-4 border-2 border-primary-700 rounded-3xl px-8 py-5 min-w-[280px]">
                <Eye className="w-10 h-10 text-primary-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-black text-gray-900">Our Vision</h3>
                  <p className="text-gray-600 text-sm leading-tight">
                    Shaping the Future of Automotive Excellence
                  </p>
                </div>
              </div>

              {/* Our Strength */}
              <div className="flex items-center gap-4 border-2 border-primary-700 rounded-3xl px-8 py-5 min-w-[280px]">
                <Zap className="w-10 h-10 text-primary-700 flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-black text-gray-900">Our Strength</h3>
                  <p className="text-gray-600 text-sm leading-tight">
                    Built on Quality & Trust
                  </p>
                </div>
              </div>
            </div>

            {/* READ MORE BUTTON REMOVED */}
          </div>
        </div>
      </div>
    </section>
  );
}