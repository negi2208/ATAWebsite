import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySection() {
  const scrollRef = useRef(null);

  const [activeTab, setActiveTab] = useState("parts");

  // -------- PARTS --------
  const categories = [
    { id: 1, img: "/images/categories/Back-Plate.png", title: "Back Plate", link: "/shop?category=back-plate" },
    { id: 2, img: "/images/categories/Chain-Cover-PVCMetal.png", title: "Chain Cover PVC/Metal", link: "/shop?category=chain-cover-pvc" },
    { id: 3, img: "/images/categories/Blinker-Indicator.png", title: "Blinker/Indicator", link: "/shop?category=indicator" },
    { id: 4, img: "/images/categories/Head-Light-Visor-Glass.png", title: "Head Visor", link: "/shop?category=head-light-visor" },
    { id: 5, img: "/images/categories/Inner-Body.png", title: "Inner Body", link: "/shop?category=inner-body" },
    { id: 6, img: "/images/categories/Meter-Cowling.png", title: "Meter Cowling", link: "/shop?category=meter-cowling" },
    { id: 7, img: "/images/categories/Visor-Glass.png", title: "Visor Glass", link: "/shop?category=visor-glass" },
    { id: 8, img: "/images/categories/Rear-Mudguard.png", title: "Rear Mudguard", link: "/shop?category=rear-mudguard" },
    { id: 9, img: "/images/categories/Side-Box.png", title: "Side Box", link: "/shop?category=side-box" },
    { id: 10, img: "/images/categories/Tail-Panel.png", title: "Tail Panel", link: "/shop?category=tail-panel" },
    { id: 11, img: "/images/categories/Side-Panel.png", title: "Side Panel", link: "/shop?category=side-panel" },
    { id: 12, img: "/images/categories/High-Quality-Mudguard.png", title: "Mudguard/Front Fender", link: "/shop?category=mudguard" },
  ];

  // -------- KIT --------
  const kits = [
    { id: 1, img: "/images/kitfeature/Blackk.png", title: "Black Kit", link: "/shop?category=kit1" },
    { id: 2, img: "/images/kitfeature/Blue-Kit.png", title: "Blue Kit", link: "/shop?category=kit2" },
    { id: 3, img: "/images/kitfeature/Purple-kit.png", title: "Purple Kit", link: "/shop?category=kit3" },
    { id: 4, img: "/images/kitfeature/Red-kit.png", title: "Red Kit", link: "/shop?category=kit4" },
  ];

  // -------- AUTO SCROLL (PARTS ONLY) --------
  useEffect(() => {
    if (activeTab !== "parts") return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 50) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Shop by Category
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("parts")}
            className={`px-6 py-2 rounded-full border font-semibold ${
              activeTab === "parts"
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            Parts
          </button>

          <button
            onClick={() => setActiveTab("kit")}
            className={`px-6 py-2 rounded-full border font-semibold ${
              activeTab === "kit"
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            Kit
          </button>
        </div>

        {/* ================= PARTS (CAROUSEL) ================= */}
        {activeTab === "parts" && (
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3"
            >
              <ChevronLeft className="w-7 h-7 text-gray-700" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl rounded-full p-3"
            >
              <ChevronRight className="w-7 h-7 text-gray-700" />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth gap-6 snap-x snap-mandatory pb-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`div::-webkit-scrollbar{display:none}`}</style>

              {[...categories, ...categories].map((cat, index) => (
                <div
                  key={`${cat.id}-${index}`}
                  onClick={() => (window.location.href = cat.link)}
                  className="flex-shrink-0 w-64 snap-center cursor-pointer"
                >
                  <div className="group p-8 bg-[#F1F5F9] rounded-3xl shadow-md border transition duration-300 hover:bg-red-600">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="h-32 object-contain mb-5 mx-auto transition group-hover:scale-110"
                    />
                    <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-white">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= KIT (CENTER, NO CAROUSEL) ================= */}
        {activeTab === "kit" && (
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-6">
              {kits.map((kit) => (
                <div
                  key={kit.id}
                  onClick={() => (window.location.href = kit.link)}
                  className="w-64 cursor-pointer"
                >
                  <div className="group p-8 bg-[#F1F5F9] rounded-3xl shadow-md border transition duration-300 hover:bg-red-600">
                    <img
                      src={kit.img}
                      alt={kit.title}
                      className="h-32 object-contain mb-5 mx-auto transition group-hover:scale-110"
                    />
                    <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-white">
                      {kit.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
