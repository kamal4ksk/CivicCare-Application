import React from 'react';
import { FiThumbsUp, FiMessageSquare, FiFileText } from 'react-icons/fi';

export default function EngagementCategoryCard({ category, avgLikes, avgComments, postsCount, isActive }) {
  return (
    <div className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 select-none transition-all duration-300 ease-out flex flex-col justify-between hover:bg-white hover:border-[#cbd5e1] hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.04)] hover:scale-[1.02]">
      {/* Category Name */}
      <h4 className="text-sm font-extrabold text-slate-800 mb-3">
        {category}
      </h4>

      {/* Metrics Row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 font-semibold text-xs">
        {/* Avg Likes */}
        <div className="flex items-center space-x-1 shrink-0">
          <FiThumbsUp className="w-3.5 h-3.5 text-blue-500 stroke-[2.2]" />
          <span>{avgLikes.toFixed(1)} avg</span>
        </div>

        {/* Avg Comments */}
        <div className="flex items-center space-x-1 shrink-0">
          <FiMessageSquare className="w-3.5 h-3.5 text-purple-500 stroke-[2.2]" />
          <span>{avgComments.toFixed(1)} avg</span>
        </div>

        {/* Posts Count */}
        <div className="flex items-center space-x-1 shrink-0 text-slate-400 font-bold">
          <FiFileText className="w-3.5 h-3.5" />
          <span>{postsCount} {postsCount === 1 ? 'posts' : 'posts'}</span>
        </div>
      </div>

    </div>
  );
}
