import React from 'react';
import { HiOutlineArrowTrendingUp } from 'react-icons/hi2';
import TrendingTags from './TrendingTags';

export default function TrendingTopics() {
  const topics = [
    { id: 1, tag: "INFRASTRUCTURE", count: "234" },
    { id: 2, tag: "ENVIRONMENT", count: "189" },
    { id: 3, tag: "ROADSAFETY", count: "156" },
    { id: 4, tag: "CORRUPTION", count: "98" }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] text-left">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white shadow-xs">
          <HiOutlineArrowTrendingUp className="w-4 h-4" />
        </div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Trending Topics</h3>
      </div>
      <div className="flex flex-col">
        {topics.map(topic => <TrendingTags key={topic.id} {...topic} />)}
      </div>
    </div>
  );
}