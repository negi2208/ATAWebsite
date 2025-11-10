import { Lightbulb, Settings, Globe, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Lightbulb,
      title: "Innovative Solution",
      desc: "Our customized services align with your unique business needs—whether for small batches or large-scale production, we deliver with precision and efficiency.",
    },
    {
      icon: Settings,
      title: "End-to-End Services",
      desc: "From initial design to mass production, we provide comprehensive support at every stage of product development, ensuring a seamless process.",
    },
    {
      icon: Globe,
      title: "Global Reach, Local Expertise",
      desc: "With a strong presence in multiple regions, we offer flexible solutions tailored to meet your global supply chain needs efficiently.",
    },
    {
      icon: ShieldCheck,
      title: "Commitment To Excellence",
      desc: "We uphold the highest quality standards and adhere to global compliance and safety regulations, ensuring your products meet industry benchmarks.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/about/factory-hall.jpg')",
        }}
      />

      {/* KILLER GRADIENT – Deep Red to Black with Red Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-black to-primary-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-primary-900/40" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* WHY CHOOSE US */}
        <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-3 font-heading">
          WHY CHOOSE US?
        </p>

        {/* Perfect Heading */}
        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-16 font-heading drop-shadow-2xl">
          Delivering Custom Solutions with Expertise,
          <br className="hidden md:block" />
          Quality, and Global Reach
        </h2>

        {/* 4 Premium Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group relative bg-black/30 backdrop-blur-xl border border-primary-500/30 rounded-3xl p-8 
                         hover:bg-primary-900/40 hover:border-primary-400 transition-all duration-500 
                         hover:shadow-2xl hover:shadow-primary-500/20"
            >
              {/* RED Hexagon Icon with Glow */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500 blur-2xl scale-110 animate-pulse" />
                  <div className="relative bg-primary-500 p-6 rounded-full shadow-2xl ring-4 ring-white/20">
                    <item.icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-16 text-center">
                <h3 className="text-xl font-black text-white mb-4 font-heading">
                  {item.title}
                </h3>
                <p className="text-primary-100 text-sm leading-relaxed font-sans">
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