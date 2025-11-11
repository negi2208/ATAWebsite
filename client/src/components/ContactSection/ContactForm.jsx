import React from 'react';
import { Mail, Phone, MapPin, Globe, DollarSign, Package } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
        </div>

        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Original Products</h3>
              <p className="text-sm text-gray-600 mt-1">Vestibulum ante ipsum primis in faucibus.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Affordable Rates</h3>
              <p className="text-sm text-gray-600 mt-1">Vestibulum ante ipsum primis in faucibus.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Globe className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Wide Variety</h3>
              <p className="text-sm text-gray-600 mt-1">Vestibulum ante ipsum primis in faucibus.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Our Stores */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Stores</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              On dekande mydurtad mora även om skurkstat. Semirade timaneten rena. 
              Radiogen pasam inte löba även om prerade i garanterad traditionell specialitet till 
              bebel. Ev is sönde. Tun gps-väst att epiligt. Diliga tresk dira. Ens biov diljevis.
            </p>

            <div className="space-y-8">
              {/* United States */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-black-600" />
                  United States
                </h3>
                <p className="text-gray-700 mt-2">205 Middle Road, 2nd Floor, New York</p>
                <p className="text-gray-600">2485</p>
                <div className="flex items-center gap-2 mt-3 text-gray-700">
                  <Phone className="w-4 h-4 text-black-600" />
                  <span>+02 1234 567 88</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-700">
                  <Mail className="w-4 h-4 text-black-600" />
                  <a href="mailto:info@example.com" className="hover:text-black-600 transition">
                    info@example.com
                  </a>
                </div>
              </div>

              {/* Netherlands */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-black-600" />
                  Netherlands
                </h3>
                <p className="text-gray-700 mt-2">205 Middle Road, 2nd Floor, New York</p>
                <p className="text-gray-600">2485</p>
                <div className="flex items-center gap-2 mt-3 text-gray-700">
                  <Phone className="w-4 h-4" />
                  <span>+02 1234 567 88</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@example.com" className="hover:text-black-600 transition">
                    info@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Write us...</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              On dekande mydurtad mora även om skurkstat. Semirade timaneten rena. 
              Radiogen pasam inte löba även om prerade i garanterad traditionell specialitet till 
              bebel.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-medium py-4 rounded-lg hover:bg-primary-700 transition duration-200 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}