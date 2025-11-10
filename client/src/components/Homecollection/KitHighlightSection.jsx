import { ArrowRight } from "lucide-react";

export default function KitHighlightSection() {
  const kitSteps = [
    {
      num: "01",
      title: "Engine Tune-Up Kit",
      desc: "Complete oil change, spark plugs, air filter – everything your engine needs.",
    },
    {
      num: "02",
      title: "Brake Performance Kit",
      desc: "High-quality brake pads, rotors, and fluid for maximum stopping power.",
    },
    {
      num: "03",
      title: "Suspension Upgrade Kit",
      desc: "Shocks, struts, and bushings for smoother ride and better handling.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* LEFT: Text + CTA */}
          <div className="space-y-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              DUIS COMmodo at risus
            </p>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="block">Poskapet pred det vill site poly liga dekavin euras</span>
            </h1>

            <p className="text-gray-600 leading-relaxed text-sm">
              Vestibulum condimentum libero elit, at pretium purus molestie ornare. 
              Sed turpis justo, facilisis cursus elit in, lobortis molestie. 
              Morbi sed rhoncus erat. Aenean quis lacus tellus. Duis commodo at 
              risus sit amet maximus molestie.
            </p>

            <a
              href="/shop/kits"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition text-sm"
            >
              Read and Shop Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* CENTER: Car Image – No Shadow, No Border Radius */}
          <div className="flex justify-center">
            <img
              src="/images/kitfeature/kit.jpg"
              alt="Car Interior with Kit"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* RIGHT: Kit Steps */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-1">From Garage to Road</h3>
              <p className="text-sm text-gray-600">
                Vestibulum condimentum libero elit, at pretium purus molestie ornare.
              </p>
            </div>

            <div className="space-y-5">
              {kitSteps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base">{step.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}