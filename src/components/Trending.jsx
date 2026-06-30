import React from 'react';
import { HiArrowTrendingUp } from 'react-icons/hi2'; 
import TrendingCard from './TrendingCard';

export default function Trending() {
  const trendingData = [
    {
      id: 1,
      title: "Corruption in building permit office",
      location: "Ernakulam",
      percentage: "+145%",
      views: "2.3K"
    },
    {
      id: 2,
      title: "Broken bridge endangering lives",
      location: "Kollam",
      percentage: "+98%",
      views: "1.8K"
    },
    {
      id: 3,
      title: "Public park needs maintenance",
      location: "Thrissur",
      percentage: "+76%",
      views: "1.2K"
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Title Segment perfectly heights matched to Recent Issues title */}
      <div className="flex items-center gap-2 mb-6 h-[33px]">
        <HiArrowTrendingUp className="w-[22px] h-[22px] text-[#ef4444]" />
        <h2 className="text-[22px] font-bold text-[#0f172a] tracking-tight">
          Trending
        </h2>
      </div>

      {/* Render Stack Loop */}
      <div className="flex flex-col space-y-4">
        {trendingData.map((card) => (
          <TrendingCard
            key={card.id}
            title={card.title}
            location={card.location}
            percentage={card.percentage}
            views={card.views}
          />
        ))}
      </div>
    </div>
  );
}