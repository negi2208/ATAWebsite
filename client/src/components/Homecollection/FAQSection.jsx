import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How Do I Know If a Part Fits My Vehicle?",
      answer:
        "This is the third item’s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
    },
    {
      question: "Can I Save Multiple Vehicles in My Garage?",
      answer: "Yes, you can save multiple vehicles in your garage for quick part lookup.",
    },
    {
      question: 'What Does "Ignavo" Mean in Auto Parts?',
      answer: "Ignavo is a premium brand known for high-quality aftermarket parts.",
    },
    {
      question: "Are Aftermarket Parts Reliable?",
      answer: "Yes, most aftermarket parts meet or exceed OEM standards when from trusted brands.",
    },
    {
      question: "Can I Return a Part If It Doesn't Fit?",
      answer: "Yes, we offer a 30-day return policy for unused parts in original packaging.",
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

              <div className="mt-3 sm:mt-4 space-y-2 text-gray-700 text-sm sm:text-base md:text-base">
                <p>
                  <strong>Item currently in stock.</strong> Items with this status
                  are shipped within <strong>4–5 days</strong> of payment.
                </p>
                <p>Do you need more information?</p>
              </div>

              <button className="mt-4 sm:mt-5 bg-primary-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-primary-600 transition-colors shadow-md">
                More Information
              </button>
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
