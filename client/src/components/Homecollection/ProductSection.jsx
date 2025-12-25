import React from 'react';

// Importing images
import banner1 from '/ProductSection/banner-1.jpg';
import banner2 from '/ProductSection/banner-2.jpg';
import banner3 from '/ProductSection/banner-12.jpg';

const ProductSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Three Full Background Image Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden">
            <img
              src={banner1}
              alt="Car with Oil"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white max-w-xs">
              <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Driven by Quality</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Search by Make, Model & More
              </h3>
              <p className="text-xs sm:text-sm mt-2 opacity-90">Easy search, perfect match, smooth ride.</p>
              <button className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden">
            <img
              src={banner2}
              alt="Tire"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white max-w-xs">
              <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">From Garage to Road</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Driven by Quality. Built to Last.
              </h3>
              <p className="text-xs sm:text-sm mt-2 opacity-90">No mismatches, only exact parts.</p>
              <button className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden">
            <img
              src={banner3}
              alt="Engine Parts"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white max-w-xs">
              <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Power Your Drive</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 leading-tight">
                Affordable Parts. Premium Quality.
              </h3>
              <p className="text-xs sm:text-sm mt-2 opacity-90">Trust every mile with us.</p>
              <button className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-primary-700 text-white py-6 px-4 sm:px-6 md:px-8 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Text */}
          <div className="flex-1 text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
              Need Help Choosing the Right ATA Genuine Part?
            </h3>
            <p className="text-primary-100 text-sm mt-1 sm:mt-2">
            Our Product Experts Are Here to Assist You — Fast & Reliable Support.
            </p>
          </div>

          {/* Phone */}
          <div className="text-left md:text-right">
            <div className="flex justify-center">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-primary-500 font-medium rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap">
            +(800) 1234 5678 90
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
