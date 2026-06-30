import React from 'react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

export default function TopPostsCard({ rank, title, category, likes, comments }) {
  const engagementScore = likes + comments;

  return (
    <div className="w-full flex items-center justify-between bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 transition-all duration-300 ease-out hover:bg-white hover:border-[#cbd5e1] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.04)] select-none">
      
      {/* Left side: Rank & Title */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {/* Rank Badge - Rounded rectangle with exact gradient and white text */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-xs bg-gradient-to-r from-[#1b64f2] via-[#7e3ff2] to-[#d136f2] text-white shadow-xs">
          #{rank}
        </div>

        {/* Title & Subtitle */}
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="text-sm font-bold text-slate-800 truncate leading-snug">
            {title}
          </h4>
          <span className="text-xs font-semibold text-slate-500">
            {category}
          </span>
        </div>
      </div>

      {/* Right side: Likes, Comments, Engagement Pill */}
      <div className="flex items-center space-x-4 md:space-x-5 shrink-0">
        
        {/* Likes Count */}
        <div className="flex items-center space-x-1.5">
          <FiThumbsUp className="w-4 h-4 text-[#3b82f6] stroke-[2.2]" />
          <span className="text-sm font-bold text-[#3b82f6]">{likes}</span>
        </div>

        {/* Comments Count */}
        <div className="flex items-center space-x-1.5">
          <FiMessageSquare className="w-4 h-4 text-[#d946ef] stroke-[2.2]" />
          <span className="text-sm font-bold text-[#d946ef]">{comments}</span>
        </div>

        {/* Engagement Pill - Matches horizontal blue-purple-magenta gradient */}
        <div className="px-3 py-1 rounded-xl font-extrabold text-xs text-white min-w-[40px] text-center bg-gradient-to-r from-[#1b64f2] via-[#7e3ff2] to-[#d136f2] shadow-xs">
          {engagementScore}
        </div>

      </div>

    </div>
  );
}

