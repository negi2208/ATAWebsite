export default function AboutHero() {
  return (
    <section className="relative h-[350px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/About/about-hero.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content - Centered */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-full">
          <div className="w-1/2 text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              About Us
            </h1>
            <p className="text-lg leading-relaxed drop-shadow-md max-w-lg">
              To build a framework that makes auto repairs predictable. 
              To make aftermarket auto parts an after thought.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}