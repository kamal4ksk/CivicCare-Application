import React from 'react';
import { HiOutlineHeart, HiOutlineChatBubbleLeft } from 'react-icons/hi2';

export default function TrendingPost({ rank, title, likes, comments }) {
  return (
    <div className="flex items-start space-x-3 py-3 border-b border-slate-50 last:border-0 text-left">
      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug hover:text-indigo-600 cursor-pointer">
          {title}
        </h4>
        <div className="flex items-center space-x-4 mt-1.5 text-[11px] font-bold text-slate-400">
          <span className="flex items-center space-x-1">
            <HiOutlineHeart className="w-3.5 h-3.5 stroke-[2.2]" /> 
            <span>{likes}</span>
          </span>
          <span className="flex items-center space-x-1">
            <HiOutlineChatBubbleLeft className="w-3.5 h-3.5 stroke-[2.2]" /> 
            <span>{comments}</span>
          </span>
        </div>
      </div>
    </div>
  );
}