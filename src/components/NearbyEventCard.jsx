import React from 'react';
import { HiOutlineMapPin, HiOutlineCalendar } from 'react-icons/hi2';

export default function NearbyEventCard({ title, description, location, date, type, typeColor }) {
  return (
    <div className="w-full bg-slate-50/40 border border-slate-100/70 rounded-2xl p-4 text-left flex flex-col items-start space-y-2.5">
      <div>
        <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h4>
        <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">{description}</p>
      </div>
      
      <div className="space-y-1 text-[11px] font-bold text-slate-400">
        <div className="flex items-center space-x-1.5">
          <HiOutlineMapPin className="w-3.5 h-3.5 text-slate-300" /> 
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <HiOutlineCalendar className="w-3.5 h-3.5 text-slate-300" /> 
          <span>{date}</span>
        </div>
      </div>

      <span className={`px-2.5 py-0.5 text-[10px] font-black tracking-wide rounded-full text-white uppercase ${typeColor}`}>
        {type}
      </span>
    </div>
  );
}