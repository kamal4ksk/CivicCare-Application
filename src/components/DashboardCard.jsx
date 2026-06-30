import React from 'react';

export default function DashboardCard({ count, label, icon: Icon, bgGradient }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${bgGradient} shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md group cursor-pointer`}>
      
      {/* Structural Glass Icon Top Left Cover Container */}
      <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-xs flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-4 h-4 text-white" />
      </div>

      {/* Numerical Data Counter Metrics */}
      <div className="text-3xl font-black tracking-tight mb-1 select-none">
        {count}
      </div>

      {/* Metric Title Label descriptive subtitle info */}
      <div className="text-xs font-semibold text-white/80 tracking-wide">
        {label}
      </div>

      {/* Massive subtle watermark asset backdrop icon absolute right corner position */}
      <Icon className="absolute -right-3 -top-3 w-24 h-24 text-white/[0.08] transform rotate-12 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
      
    </div>
  );
}