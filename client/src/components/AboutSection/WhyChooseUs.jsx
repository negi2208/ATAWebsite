import { Lightbulb, Settings, Globe, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Lightbulb,
      title: "Engineered for Perfect Fit",
      desc: "Every ATA part is designed to match OEM dimensions, ensuring precise fitment, zero vibration, and hassle-free installation — trusted by mechanics across workshops.",
    },
    {
      icon: Settings,
      title: "Built Strong for Indian Roads",
      desc: "ATA parts are manufactured to handle daily wear, rough terrain, and changing weather conditions, providing long-lasting durability and dependable performance.",
    },
    {
      icon: Globe,
      title: "Advanced Manufacturing Technology",
      desc: "Using modern injection-moulding processes, our products achieve superior finish, consistent thickness, and enhanced impact resistance — reducing cracks and replacements.",
    },
    {
      icon: ShieldCheck,
      title: "Quality You Can Trust",
      desc: "Each part undergoes strict quality checks and complies with safety standards, ensuring reliability for both riders and service professionals.",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/about/factory-hall.jpg')",
        }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-black to-primary-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-primary-900/40" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary-500/10 to-transparent" />

      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle */}
        <p className="text-primary-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 font-heading">
          WHY CHOOSE ATA GENUINE PARTS
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-12 sm:mb-16 font-heading drop-shadow-2xl">
          Delivering Custom Solutions with Expertise,
          <br className="hidden md:block" />
          Quality, and Global Reach
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 sm:pt-12">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group relative bg-black/30 backdrop-blur-xl border border-primary-500/30 rounded-3xl p-6 sm:p-8
                         hover:bg-primary-900/40 hover:border-primary-400 transition-all duration-500
                         hover:shadow-2xl hover:shadow-primary-500/20 flex flex-col items-center text-center"
            >
              {/* Icon with Glow */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500 blur-2xl scale-110 animate-pulse rounded-full" />
                  <div className="relative bg-primary-500 p-5 sm:p-6 rounded-full shadow-2xl ring-4 ring-white/20">
                    <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-16">
                <h3 className="text-lg sm:text-xl font-black text-white mb-3 font-heading">
                  {item.title}
                </h3>
                <p className="text-primary-100 text-sm sm:text-base leading-relaxed font-sans max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
