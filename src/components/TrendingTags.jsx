import React from 'react';

export default function TrendingTags({ tag, count }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 text-left cursor-pointer group">
      <div>
        <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-wide uppercase group-hover:text-purple-600 transition-colors">
          #{tag}
        </h4>
        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{count} posts</p>
      </div>
      <svg className="w-4 h-4 text-slate-400 group-hover:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307L21.75 4.5M21.75 4.5H16.5M21.75 4.5v5.25" />
      </svg>
    </div>
  );
}