import React from "react";

export default function SummaryCard({ value, label, valueColor = "text-slate-800" }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <span className={`text-3xl font-extrabold ${valueColor} tracking-tight`}>
        {value}
      </span>
      <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1.5">
        {label}
      </span>
    </div>
  );
}
