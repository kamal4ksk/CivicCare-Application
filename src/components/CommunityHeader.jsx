import React from "react";
import { HiPlus } from "react-icons/hi2";

export default function CommunityHeader({ onCreateClick }) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans antialiased py-2">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Communities
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Join groups of citizens with shared concerns and goals
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/10 active:scale-98 transition-all duration-300 cursor-pointer w-full sm:w-auto shrink-0"
      >
        <HiPlus className="w-4 h-4 stroke-[3]" />
        <span>Create Community</span>
      </button>
    </div>
  );
}
