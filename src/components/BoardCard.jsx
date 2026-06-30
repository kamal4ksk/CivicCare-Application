import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function BoardCard({ image, badgeText, badgeBg, title, description }) {
  return (
    <div 
      className="relative w-full h-[280px] sm:h-[320px] rounded-[28px] overflow-hidden group shadow-sm transition-transform duration-500 hover:scale-[1.01] cursor-pointer"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark gradient overlay matching image_16e549.jpg bottom text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      {/* Card Content Elements */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between items-start z-10 select-none">
        
        {/* Dynamic Tag/Badge Pill */}
        <span className={`px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full text-white ${badgeBg}`}>
          {badgeText}
        </span>

        {/* Text Details Container */}
        <div className="w-full space-y-2 text-left">
          <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-200 font-medium line-clamp-2 leading-relaxed opacity-90">
            {description}
          </p>
          
          {/* Learn More Trigger Action */}
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-white pt-2 group-hover:underline">
            <span>Learn More</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
}