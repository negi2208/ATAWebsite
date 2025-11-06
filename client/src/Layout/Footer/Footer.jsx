// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Us Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <ul className="space-y-2">
            <li>Phone Number: +800 1234 5678 90</li>
            <li>Email: info@example.com</li>
            <li>Address: 2972 Westheimer Rd. Santa Ana, Illinois 85486</li>
            <li>Help Guide: Seek expert help for inquiries and concerns</li>
          </ul>
        </div>

        {/* Let Us Help You Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Let Us Help You</h3>
          <ul className="space-y-2">
            <li>Accessibility Statement</li>
            <li>Your Orders</li>
            <li>Returns & Replacements</li>
            <li>Shipping Rates & Policies</li>
            <li>Refund and Returns Policy</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Cookie Settings</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="space-y-2">
            <li>Sell on Ignavo</li>
            <li>Sell Your Services on Ignavo</li>
            <li>Sell on Ignavo Business</li>
            <li>Sell Your Apps on Ignavo</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Sell-Publish with Us</li>
            <li>Become an Ignavo Vendor</li>
          </ul>
        </div>

        {/* Get to Know Us Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Get to Know Us</h3>
          <ul className="space-y-2">
            <li>Careers for Ignavo</li>
            <li>About Ignavo</li>
            <li>Investor Relations</li>
            <li>Ignavo Devices</li>
            <li>Customer Reviews</li>
            <li>Social Responsibility</li>
            <li>Store Locations</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
          {/* Social Media Links */}
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-gray-400">Facebook</a>
            <a href="#" className="text-white hover:text-gray-400">Twitter</a>
            <a href="#" className="text-white hover:text-gray-400">Instagram</a>
            <a href="#" className="text-white hover:text-gray-400">YouTube</a>
          </div>
          {/* App Links */}
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-gray-400">Download on the App Store</a>
            <a href="#" className="text-white hover:text-gray-400">Get it on Google Play</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
