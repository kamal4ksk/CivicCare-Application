import React from 'react';
import { LuThumbsUp } from 'react-icons/lu';

export default function TotalLikesCard({ likes }) {
  return (
    <div className="p-4 rounded-[18px] border bg-[#edf4fe] border-[#d4e6fd] w-full h-[108px] flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex items-center gap-2">
        <LuThumbsUp className="text-[#1a56f0] text-[18px] shrink-0" />
        <span className="text-[#555555] font-medium text-[13px] tracking-tight">
          Total Likes
        </span>
      </div>

      {/* Bottom Row */}
      <div className="text-[30px] font-bold leading-none tracking-tight pl-[2px] mb-1 text-[#1a56f0]">
        {likes}
      </div>
    </div>
  );
}