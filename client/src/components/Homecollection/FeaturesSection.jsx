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
      {/* ↑ border-y → sirf border-b (top border gayab) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 flex-1">
              {/* Feature Item */}
              <div className="flex items-center gap-4 flex-1">
                {/* Icon Image */}
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              </div>

              {/* Divider - except last item */}
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