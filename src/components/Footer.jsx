import React from 'react';
import { HiMegaphone } from 'react-icons/hi2';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/60 pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding and Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          
          {/* Brand Info Column (Takes 4 cols on large screens) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-3">
  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center bg-gradient-to-br from-[#2B7FFF] to-[#9810FA]">
    <HiMegaphone className="w-4 h-4 text-white" />
  </div>

  <span className="text-xl font-bold text-slate-800 tracking-tight">
    CivicCare
  </span>
</div>
            </div>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              Empowering citizens to create real change in their communities.
            </p>
          </div>

          {/* Links Columns Layout Grid (Takes 8 cols on large screens) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Product */}
            <div className="flex flex-col space-y-3.5">
              <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#map" className="hover:text-blue-600 transition-colors">Community Map</a></li>
                <li><a href="#download" className="hover:text-blue-600 transition-colors">Mobile App</a></li>
                <li><a href="#api" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col space-y-3.5">
              <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#careers" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#press" className="hover:text-blue-600 transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col space-y-3.5 col-span-2 sm:col-span-1">
              <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                <li><a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright and Social Handles */}
        <div className="pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            © 2026 CivicCare. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-5 text-slate-400">
            <a href="#twitter" aria-label="Twitter Profile" className="hover:text-slate-600 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#github" aria-label="GitHub Repository" className="hover:text-slate-600 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="#linkedin" aria-label="LinkedIn Page" className="hover:text-slate-600 transition-colors">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}