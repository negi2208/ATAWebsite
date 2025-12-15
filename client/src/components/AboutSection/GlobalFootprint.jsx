import { ArrowRight } from "lucide-react";

export default function GlobalFootprint() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT: Text + Button */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-primary-500 text-xs sm:text-sm font-bold uppercase tracking-widest">
              OUR FOOTPRINTS
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-snug text-gray-900">
              Reaching Every Corner of
              <br />
              <span className="text-primary-600">the Automotive World</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-full md:max-w-lg py-2 sm:py-4">
              Sai Group Global's influence spans a vast network, serving customers and 
              partners across continents. Our solutions are trusted by automotive leaders 
              worldwide, as we continue to expand our global footprint with every project.
            </p>

            {/* READ MORE Button */}
            <a
              href="/about-us"
              className="inline-flex items-center gap-2 sm:gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              READ MORE
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>

          {/* RIGHT: World Map Image */}
          <div className="flex justify-center mt-6 lg:mt-0">
            <img
              src="/images/About/footprint.png"
              alt="Sai Group Global Reach"
              className="w-full max-w-md sm:max-w-lg md:max-w-2xl drop-shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
