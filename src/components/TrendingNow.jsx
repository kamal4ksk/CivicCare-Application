import React from 'react';
import { HiOutlineArrowTrendingUp, HiOutlineHeart, HiOutlineChatBubbleLeft } from 'react-icons/hi2';

function TrendingIssueItem({ rank, title, likes, comments }) {
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
          <span className="flex items-center space-x-1"><HiOutlineHeart className="w-3.5 h-3.5 stroke-[2.2]" /> <span>{likes}</span></span>
          <span className="flex items-center space-x-1"><HiOutlineChatBubbleLeft className="w-3.5 h-3.5 stroke-[2.2]" /> <span>{comments}</span></span>
        </div>
      </div>
    </div>
  );
}

export default function TrendingNow() {
  const issues = [
    { id: 1, rank: 1, title: "Bribery demand at Municipal Office", likes: 89, comments: 24 },
    { id: 2, rank: 2, title: "Garbage not collected for 2 weeks", likes: 67, comments: 15 },
    { id: 3, rank: 3, title: "Streetlights not working for months", likes: 54, comments: 18 },
    { id: 4, rank: 4, title: "Large pothole on Main Street causing accidents", likes: 45, comments: 12 },
    { id: 5, rank: 5, title: "Water supply irregular in residential area", likes: 32, comments: 8 }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] text-left">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-xs">
          <HiOutlineArrowTrendingUp className="w-4 h-4" />
        </div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Trending Now</h3>
      </div>
      <div className="flex flex-col">
        {issues.map(item => <TrendingIssueItem key={item.id} {...item} />)}
      </div>
    </div>
  );
}