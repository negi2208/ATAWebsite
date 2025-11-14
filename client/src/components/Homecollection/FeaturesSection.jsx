export default function FeaturesSection() {
  const features = [
    {
      icon: "/images/feature-icons/iconbox.svg",
      title: "Original Products",
      desc: "Vestibulum ante ipsum primis in faucibus.",
    },
    {
      icon: "/images/feature-icons/iconbox2.svg",
      title: "Affordable Rates",
      desc: "Vestibulum ante ipsum primis in faucibus.",
    },
    {
      icon: "/images/feature-icons/iconbox3.svg",
      title: "Wide Variety",
      desc: "Vestibulum ante ipsum primis in faucibus.",
    },
  ];

  return (
    <section className="w-full py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 flex-1">
              
              {/* Icon + Text - MOBILE PE BADA */}
              <div className="flex items-center gap-4 flex-1">
                {/* Icon - Mobile: 16 (64px), Desktop: 12 (48px) */}
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 xl:w-12 xl:h-12 
                               object-contain 
                               mobile-only-bigger:w-16 mobile-only-bigger:h-16"
                    // Custom class sirf mobile pe apply hogi (niche define ki hai)
                  />
                </div>

                {/* Text - Mobile: bada font, Desktop: wahi chhota */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 
                                 mobile-only-bigger:text-2xl mobile-only-bigger:font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 
                                mobile-only-bigger:text-base mobile-only-bigger:leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* Divider - Sirf Desktop pe */}
              {index < features.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}