import { ArrowRight } from "lucide-react";

export default function GlobalFootprint() {
  return (
    <section className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: Text + Button */}
          <div className="space-y-2">
            <p className="text-primary-500 text-xs font-bold uppercase tracking-widest">
              OUR FOOTPRINTS
            </p>

            <h2 className="text-4xl md:text-3xl font-black leading-tight text-gray-900 font-bold">
              Reaching Every Corner of
              <br />
              <span className="text-primary-600">the Automotive World</span>
            </h2>

            <p className="text-gray-600 text-base leading-relaxed max-w-lg py-4">
              Sai Group Global's influence spans a vast network, serving customers and 
              partners across continents. Our solutions are trusted by automotive leaders 
              worldwide, as we continue to expand our global footprint with every project.
            </p>

            {/* READ MORE Button – Your RED Theme */}
            <a
              href="/about-us"
              className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              READ MORE
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* RIGHT: World Map SVG */}
          <div className="flex justify-center">
            <img
              src="/images/About/footprint.png"
              alt="Sai Group Global Reach"
              className="w-full max-w-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}