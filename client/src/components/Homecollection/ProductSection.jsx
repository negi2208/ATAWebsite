import React from 'react';

// Importing images from the assets folder
import banner1 from '/ProductSection/banner-1.jpg';
import banner2 from '/ProductSection/banner-2.jpg';
import banner3 from '/ProductSection/banner-12.jpg';

const ProductSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Three Columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* First Column */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img 
              src={banner1} 
              alt="Car" 
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="absolute top-0 left-0 p-6 text-left text-white">
              <h3 className="text-3xl font-semibold">Search by Make, Model & More</h3>
              <p className="mt-2">Easy search, perfect match, smooth ride.</p>
              <button className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
          
          {/* Second Column */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img 
              src={banner2} 
              alt="Engine" 
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="absolute top-0 left-0 p-6 text-left text-white">
              <h3 className="text-3xl font-semibold">Driven by Quality. Built to Last.</h3>
              <p className="mt-2">No mismatches, only exact parts.</p>
              <button className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Third Column */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img 
              src={banner3} 
              alt="Pistons" 
              className="w-full h-56 object-cover rounded-t-xl"
            />
            <div className="absolute top-0 left-0 p-6 text-left text-white">
              <h3 className="text-3xl font-semibold">Affordable Parts. Premium Quality.</h3>
              <p className="mt-2">Trust every mile with us.</p>
              <button className="mt-6 px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 text-white py-8 px-4 rounded-xl shadow-xl">
          <p className="text-2xl font-semibold">Need Help Finding the Right Product?</p>
          <p className="text-gray-200 mt-2">Our Parts Experts Can Help. Call for immediate assistance.</p>
          <div className="mt-6">
            <button className="px-10 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors">
              Request a Call
            </button>
          </div>
          <div className="mt-4 text-sm">
            <p>+(800) 1234 5678 90</p>
            <p>You can contact us 24/7</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
