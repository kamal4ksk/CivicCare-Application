import React from 'react';

export default function FeatureCard({ icon: Icon, title, description, iconColor, bgGrad }) {
  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_8px_-3px_rgba(0,0,0,0,05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] hover:border-slate-200">
      
      {/* Decorative subtle background gradient blur that shows up on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.02] rounded-2xl bg-gradient-to-br ${bgGrad} transition-opacity duration-300 pointer-events-none`} />

      {/* Premium Icon Container with subtle radial ring */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGrad} flex items-center justify-center mb-5 shadow-sm transform transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`w-5 h-5 ${iconColor} stroke-[2.5]`} />
      </div>

      {/* Text Content Block */}
      <div className="relative z-10">
        <h3 className="text-base font-bold text-slate-800 tracking-tight mb-1.5 transition-colors duration-200 group-hover:text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-400 font-medium leading-relaxed transition-colors duration-200 group-hover:text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}