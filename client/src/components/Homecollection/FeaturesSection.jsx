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
    <section className="w-full py-12 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-4 flex-1">
                {/* Icon - same size sabpe */}
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Text - Mobile: small, Desktop: larger */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* Divider only on desktop */}
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