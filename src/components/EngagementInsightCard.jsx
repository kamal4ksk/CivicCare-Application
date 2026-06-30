import React from 'react';
import { LuMessageCircle, LuShare2, LuTrendingUp } from 'react-icons/lu';

export default function EngagementInsightCard({ type, value }) {
  // Config mapping for variant styles and configuration
  const configs = {
    comments: {
      title: 'Total Comments',
      bg: 'bg-[#f7f0fa]',
      border: 'border-[#eedbf7]',
      color: 'text-[#8b2cf5]',
      icon: LuMessageCircle,
    },
    shares: {
      title: 'Total Shares',
      bg: 'bg-[#edfcf2]',
      border: 'border-[#daf7e3]',
      color: 'text-[#00a651]',
      icon: LuShare2,
    },
    engagement: {
      title: 'Avg Engagement',
      bg: 'bg-[#fff6ed]',
      border: 'border-[#ffebd4]',
      color: 'text-[#f95700]',
      icon: LuTrendingUp,
    },
  };

  const current = configs[type] || configs.comments;
  const Icon = current.icon;

  return (
    <div className={`p-4 rounded-[18px] border ${current.bg} ${current.border} w-full h-[108px] flex flex-col justify-between`}>
      {/* Top Row */}
      <div className="flex items-center gap-2">
        <Icon className={`${current.color} text-[18px] shrink-0`} />
        <span className="text-[#555555] font-medium text-[13px] tracking-tight">
          {current.title}
        </span>
      </div>

      {/* Bottom Row */}
      <div className={`text-[30px] font-bold leading-none tracking-tight pl-[2px] mb-1 ${current.color}`}>
        {value}
      </div>
    </div>
  );
}