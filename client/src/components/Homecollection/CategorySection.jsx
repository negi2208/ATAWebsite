export default function CategorySection() {
  const categories = [
    { id: 1, img: "/images/categories/category-air-condition.png", title: "Head light visor", slug: "Head light visor" },
    { id: 2, img: "/images/categories/category-wiper.png", title: "Front mudguard", slug: "Front mudguard" },
    { id: 3, img: "/images/categories/category-brakes.png", title: "Pannels", slug: "Tail pannels" },
    { id: 4, img: "/images/categories/category-care.png", title: "Side pannel", slug: "Side pannel " },
    { id: 5, img: "/images/categories/category-engine.png", title: "Scooty Front nose", slug: "Scooty Front nose" },
    { id: 6, img: "/images/categories/category-damping.png", title: "Front wings", slug: "Front wings" },
  ];

  return (
    <section className="w-full py-12">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group block"
            >
              <div className="flex flex-col items-center justify-center p-6 bg-[#F1F5F9] rounded-2xl shadow-sm hover:bg-[#F8FAFC] transition-all duration-200 cursor-pointer h-full">
                <div className="mb-4 h-28 w-28 flex items-center justify-center">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {cat.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
