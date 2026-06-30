import React from 'react';

export default function ReportCard({ count, title }) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_-8px_rgba(0,0,0,0.06)] hover:border-slate-200 cursor-pointer group">
      
      {/* Category Number Counter Metric */}
      <span className="text-2xl font-black text-slate-800 tracking-tight transition-colors group-hover:text-blue-600 select-none">
        {count}
      </span>

      {/* Category Name Label Title */}
      <span className="text-xs font-bold text-slate-400 mt-1 tracking-wide uppercase transition-colors group-hover:text-slate-500">
        {title}
      </span>

    </div>
  );
}