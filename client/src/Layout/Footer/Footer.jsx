import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/Footer/Footer-Image.jpg')`,
        }}
      />

      {/* Black Overlay (Darkens Image) */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content (Above Overlay) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-4 text-center">

          {/* Logo */}
          <div className="mb-8">
            <a href="/">
              <img
                src="/images/Logo/ATA-LOGO[1]1[1].png"
                alt="ATA Logo"
                className="h-[200px] w-auto mx-auto object-contain transition-transform hover:scale-105 cursor-pointer drop-shadow-2xl"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/shop" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-conditions" },
                { name: "Blogs", path: "/blogs" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Divider */}
          <hr className="border-gray-800" />
        </div>

        {/* Copyright */}
        <div className="py-6 text-center text-xs text-gray-400">
          <p>© 2025 ATA Genuine Parts. All rights reserved. Powered by Hashtag Media and Entertainment India.</p>
        </div>
      </div>
    </footer>
  );
}