export default function AboutHero() {
  return (
    <section className="
      relative 
      h-[280px] sm:h-[350px] md:h-[420px] 
      flex items-center
    ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/About/about-hero.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center h-full">
          
          {/* Text Box */}
          <div className="w-full md:w-1/2 text-white">

            <h1 className="
              text-3xl sm:text-4xl md:text-5xl 
              font-bold mb-3 md:mb-4 
              drop-shadow-lg
            ">
              About Us
            </h1>

            <p className="
              text-sm sm:text-base md:text-lg 
              leading-relaxed drop-shadow-md 
              max-w-md sm:max-w-lg
            ">
              To build a framework that makes auto repairs predictable. 
              To make aftermarket auto parts an afterthought.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
