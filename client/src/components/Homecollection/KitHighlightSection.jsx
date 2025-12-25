import { ArrowRight } from "lucide-react";

export default function KitHighlightSection() {
  const kitSteps = [
    {
      num: "01",
      title: "Front Body Kit",
      desc: "Includes Headlight Visor, Scooty Front Nose & Front Wings. Premium front-body components designed for style, protection, and aerodynamic performance.",
    },
    {
      num: "02",
      title: "Side & Rear Body Kit",
      desc: "Includes Side Panels & Tail Panels\nStrong, lightweight, and precision-moulded parts that restore the original look of the two-wheeler.",
    },
    {
      num: "03",
      title: "Protection & Utility Kit",
      desc: "Includes Front Mudguards & Supporting Panels Engineered to handle rough roads while protecting critical parts from mud, water, and debris.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* LEFT: Text + CTA */}
          <div className="space-y-5">
            {/* <p className="text-xs text-gray-500 uppercase tracking-widest">
              DUIS COMmodo at risus
            </p> */}

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="block">ATA Genuine Parts – Built for Mechanics, Trusted by Riders.</span>
            </h1>

            <p className="text-gray-600 leading-relaxed text-sm">
              At ATA Genuine Parts, every component is engineered to deliver strength, perfect fitment, and long-lasting performance. Our plastic body parts are designed to match OEM specifications, ensuring reliability on Indian roads and confidence for mechanics and riders alike.

Built using advanced injection moulding technology, ATA products offer superior finish, durability, and impact resistance — making them the preferred choice across workshops and dealerships.
            </p>

            <a
              href="/shop/kits"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition text-sm"
            >
              Shop Now
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
            {/* <div>
              <h3 className="font-bold text-lg mb-1">From Garage to Road</h3>
              <p className="text-sm text-gray-600">
                Vestibulum condimentum libero elit, at pretium purus molestie ornare.
              </p>
            </div> */}

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