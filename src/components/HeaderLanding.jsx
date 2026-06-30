import React, { useState } from 'react';
// Import the megaphone icon from the Lucide pack inside react-icons
import { HiMegaphone } from 'react-icons/hi2';
import { Link } from "react-router-dom";

export default function HeaderLanding() {
  const [isOpen, setIsOpen] = useState(false);

  // Smooth scroll handler helper function
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open
    
    const element = document.getElementById(targetId);
    if (element) {
      // Calculates offset for the sticky header (h-20 = 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* Max-width container matching typical modern web standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Logo Section */}
          <a 
            href="#hero" 
            onClick={(e) => handleScroll(e, 'hero')}
            className="flex items-center space-x-3 cursor-pointer"
          >
        <div className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#2B7FFF] to-[#9810FA]">
  <HiMegaphone className="w-5 h-5 text-white" />
</div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              CivicCare
            </span>
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#hero" 
              onClick={(e) => handleScroll(e, 'hero')}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </a>
            <a 
              href="#features" 
              onClick={(e) => handleScroll(e, 'features')}
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#map-section" 
              onClick={(e) => handleScroll(e, 'map-section')}
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-200"
            >
              Map
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleScroll(e, 'about')}
              className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-200"
            >
              About
            </a>
          </div>

          {/* Right: CTA Button */}
          <div className="hidden md:flex items-center">
  <Link
    to="/signin"
    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm rounded-full shadow-md shadow-purple-200 hover:opacity-95 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
  >
    Get Started Now
  </Link>
</div>

          {/* Mobile menu button toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <a 
            href="#hero" 
            onClick={(e) => handleScroll(e, 'hero')}
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md"
          >
            Home
          </a>
          <a 
            href="#features" 
            onClick={(e) => handleScroll(e, 'features')}
            className="block px-3 py-2 text-base font-medium text-slate-500 hover:bg-slate-50 rounded-md"
          >
            Features
          </a>
          <a 
            href="#map-section" 
            onClick={(e) => handleScroll(e, 'map-section')}
            className="block px-3 py-2 text-base font-medium text-slate-500 hover:bg-slate-50 rounded-md"
          >
            Map
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, 'about')}
            className="block px-3 py-2 text-base font-medium text-slate-500 hover:bg-slate-50 rounded-md"
          >
            About
          </a>
          <div className="pt-2">
  <Link
    to="/signin"
    className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm rounded-full"
  >
    Get Started Now
  </Link>
</div>
        </div>
      )}
    </nav>
  );
}