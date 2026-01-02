import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are ATA Genuine Parts as reliable as OEM parts?",
      answer:
        "ATA Genuine Parts are engineered to match OEM specifications in fit, durability, and performance. Each part is tested for strength, heat resistance, and long-term use — so mechanics and riders can trust it on daily Indian roads.",
    },
    {
      question: "Will ATA plastic body parts fit my bike without modification?",
      answer: "In most cases — yes, they are direct-fit. ATA parts are designed with accurate mounting points and dimensions, so mechanics don’t need cutting, drilling, or adjustments. If a model requires any special fitment note, it is clearly mentioned on the product.",
    },
    {
      question: 'What makes ATA plastic body parts more durable?',
      answer: "ATA uses advanced injection-molding technology that ensures consistent thickness, strong structural integrity, and superior impact resistance. This process also delivers a refined surface finish with better color retention, helping prevent cracking, fading, and warping over time.",
    },
    {
      question: "Do ATA parts come with any quality assurance?",
      answer: "Yes — every ATA product goes through multiple quality checks before packing. If a part is found defective due to manufacturing issues, it is eligible for replacement as per our policy (damage from accidents or mishandling is not covered).",
    },
    {
      question: "Where can I buy ATA Genuine Parts and ensure I’m getting original products?",
      answer: "ATA Genuine Parts are available through certified distributors, authorized workshops and dealers, and select verified retail stores. To ensure authenticity, always check the ATA branding, the packaging seal, and the invoice. If you’re unsure, you can also ask the seller to confirm the product source.",
    },
  ];

  return (
    <section className="pb-10 bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: Image + Info */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px] sm:min-h-[500px] md:min-h-[520px]">
            <img
              src="/images/faqs/faq-image.png"
              alt="Mechanic background"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-full sm:max-w-md">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Questions you may <br />
                be curious about.
              </h2>

              <div className="mt-3 mb-8 sm:mt-4 space-y-2 text-gray-700 text-sm sm:text-base md:text-base">
        
                <p>Do you need more information?</p>
              </div>

            <Link
  to="/contact" className="mt-6 sm:mt-8 bg-primary-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-primary-600 transition-colors shadow-md">
                More Information
              </Link>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-2 sm:space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center text-left py-3 sm:py-4 group"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-4 sm:w-5 h-4 sm:h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p className="text-gray-600 pb-4 sm:pb-6 pr-2 sm:pr-10 leading-relaxed text-xs sm:text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
