import React from 'react';

export default function DistrictHotspotCard({ rank, name, category, count, color, maxCount = 120, isActive, onClick }) {
  // Use heatmap intensity color gradient for the progress bar
  const barColorClass = "bg-gradient-to-r from-sky-400 via-green-400 to-red-500";
  
  // Dynamically map status dot to match the heatmap intensity levels: Low (<40), Medium (40-79), High (>=80)
  const dotColorClass = count >= 80 ? 'bg-red-500' : count >= 40 ? 'bg-green-400' : 'bg-sky-400';

  return (
    <div 
      onClick={onClick}
      className={`w-full flex flex-col sm:flex-row sm:items-center bg-white border rounded-2xl p-3 sm:px-5 sm:py-4 transition-all duration-300 ease-out cursor-pointer select-none gap-2 sm:gap-0
        ${isActive 
          ? 'border-slate-800 shadow-md ring-2 ring-slate-800/5 -translate-y-0.5 scale-[1.01]' 
          : 'border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
        }`}
    >
      {/* Line 1 on Mobile: Rank, Dot, Name, and Count */}
      <div className="flex items-center w-full sm:w-auto sm:flex-1 min-w-0">
        <span className="w-6 sm:w-8 text-xs font-semibold text-slate-400/80 text-left">
          {rank}
        </span>

        {/* Dynamic Intensity Dot Indicator */}
        <div className={`w-2.5 h-2.5 rounded-full ${dotColorClass} mr-2.5 sm:mx-3 shrink-0 shadow-xs`} />

        {/* District Name */}
        <span className="flex-1 text-xs sm:text-sm font-bold text-slate-800 truncate pr-2">
          {name}
        </span>

        {/* Count displayed on line 1 for mobile viewports */}
        <span className="text-xs font-extrabold text-slate-800 sm:hidden">
          {count}
        </span>
      </div>

      {/* Line 2 on Mobile: Category and Progress Bar */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
        {/* Category Type Indicator */}
        <span className="text-xs font-medium text-slate-400 w-24 hidden sm:block text-right pr-4 truncate">
          {category}
        </span>

        {/* Progress Bar */}
        <div className="flex-1 sm:w-28 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
          <div 
            className={`h-full ${barColorClass} rounded-full transition-all duration-500 ease-out`} 
            style={{ width: `${Math.min(100, Math.max(5, (count / maxCount) * 100))}%` }}
          />
        </div>

        {/* Count displayed on line 2 for desktop/tablet viewports */}
        <span className="w-8 text-xs font-extrabold text-slate-800 text-right hidden sm:block">
          {count}
        </span>
      </div>
    </div>
  );
}