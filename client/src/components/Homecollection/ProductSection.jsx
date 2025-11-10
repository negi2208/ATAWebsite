import React from 'react';

// Importing images
import banner1 from '/ProductSection/banner-1.jpg';
import banner2 from '/ProductSection/banner-2.jpg';
import banner3 from '/ProductSection/banner-12.jpg';

const ProductSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Three Full Background Image Cards with Rounded Corners */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative h-100 rounded-2xl overflow-hidden">
            <img
              src={banner1}
              alt="Car with Oil"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 text-white max-w-xs">
              <p className="text-xs uppercase tracking-wider opacity-80">Driven by Quality</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Search by Make, Model & More
              </h3>
              <p className="text-sm mt-2 opacity-90">Easy search, perfect match, smooth ride.</p>
              <button className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-100 rounded-2xl overflow-hidden">
            <img
              src={banner2}
              alt="Tire"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 text-white max-w-xs">
              <p className="text-xs uppercase tracking-wider opacity-80">From Garage to Road</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Driven by Quality. Built to Last.
              </h3>
              <p className="text-sm mt-2 opacity-90">No mismatches, only exact parts.</p>
              <button className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-100 rounded-2xl overflow-hidden">
            <img
              src={banner3}
              alt="Engine Parts"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 text-white max-w-xs">
              <p className="text-xs uppercase tracking-wider opacity-80">Power Your Drive</p>
              <h3 className="text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Affordable Parts. Premium Quality.
              </h3>
              <p className="text-sm mt-2 opacity-90">Trust every mile with us.</p>
              <button className="mt-4 px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section - Horizontal Layout */}
        <div className="mt-12 bg-primary-700 text-white py-6 px-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Text */}
          <div className="flex-1 text-left md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              Need Help Finding the Right Product?
            </h3>
            <p className="text-primary-100 text-sm mt-1">
              Our Parts Experts Can Help. Call for immediate assistance.
            </p>
          </div>

          {/* Middle: Button */}
          <div className="flex justify-center">
            <button className="px-8 py-3 bg-white text-primary-500 font-medium rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap">
              Request a Call
            </button>
          </div>

          {/* Right: Phone */}
          <div className="text-right md:text-right">
            <p className="text-xl md:text-2xl font-semibold">+(800) 1234 5678 90</p>
            <p className="text-primary-100 text-sm">You can contact us 24/7.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;