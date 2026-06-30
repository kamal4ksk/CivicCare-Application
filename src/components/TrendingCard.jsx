import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuUsers } from 'react-icons/lu';

export default function TrendingCard({ title, location, percentage, views }) {
  return (
    <div className="w-full border border-[#fee2e2] bg-gradient-to-br from-[#fff7f7] via-[#fffbfb] to-white p-5 rounded-2xl flex flex-col justify-between h-[135px] shadow-2xs transform transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#fca5a5]">
      
      {/* Top Section: Title & Trending Pulse Percentage Badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-bold text-slate-900 leading-snug tracking-tight line-clamp-2 max-w-[80%]">
          {title}
        </h3>
        <span className="px-2 py-0.5 text-[11px] font-extrabold text-[#ef4444] bg-[#fef2f2] border border-[#fee2e2] rounded-full shrink-0">
          {percentage}
        </span>
      </div>

      {/* Bottom Section: Location & View Analytics Counter */}
      <div className="flex items-center justify-between text-slate-400 text-xs mt-auto">
        {/* Left Side: Pin Icon and Region text */}
        <div className="flex items-center gap-1">
          <HiOutlineLocationMarker className="w-3.5 h-3.5" />
          <span className="font-medium">{location}</span>
        </div>

        {/* Right Side: Reach Metric Display */}
        <div className="flex items-center gap-1 text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-md">
          <LuUsers className="w-3.5 h-3.5 text-slate-400" />
          <span>{views}</span>
        </div>
      </div>

    </div>
  );
}