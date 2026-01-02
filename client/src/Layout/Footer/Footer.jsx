// src/Layout/Footer/Footer.jsx  (Ya jahan bhi hai)
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/Footer/Footer-Image.jpg";
    img.onload = () => setImageLoaded(true);
    // Agar image already cached hai toh turant true
    if (img.complete) setImageLoaded(true);
  }, []);

  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      {/* Preload Background with Smooth Fade */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('/images/Footer/Footer-Image.jpg')`,
        }}
      />

      {/* Fallback Solid Color (Jab tak image load na ho) */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      )}

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Skeleton Loader (Sirf jab tak image load na ho) */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center">
          {/* Logo */}
          <div className="mb-8">
            <a href="/">
              <img
                src="/images/Logo/ATA-LOGO[1]1[1].png"
                alt="ATA Logo"
                className="h-[180px] w-auto mx-auto object-contain transition-transform hover:scale-105 drop-shadow-2xl"
              
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/shop" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-conditions" },
                
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="hover:text-red-500 transition-colors duration-300 font-semibold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex justify-center gap-5 mb-8">
            {[
              { Icon: Facebook, href: " https://www.facebook.com/RIfiberparts/reels/" },
              { Icon: Instagram, href: "https://www.instagram.com/atagenuineparts" },
              { Icon: Youtube, href: "https://www.youtube.com/@AtaGenuineParts" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <hr className="border-gray-700 mb-6" />
        </div>

        {/* Copyright */}
        <div className="py-6 text-center text-xs text-gray-500 font-medium">
          <p>© 2026 ATA Genuine Parts. All rights reserved.</p>
          <p className="mt-1">Powered by <span className="text-red-500 font-bold">Hashtag Media and Entertainment India</span></p>
        </div>
      </div>
    </footer>
  );
}