import React from 'react';

export default function LikeCard({
  icon: Icon,
  count,
  label,
  iconColor,
}) {
  return (
    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 ${iconColor}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-slate-800 truncate">
          {count}
        </p>

        <p className="text-xs text-slate-500 truncate">
          {label}
        </p>
      </div>
    </div>
  );
}