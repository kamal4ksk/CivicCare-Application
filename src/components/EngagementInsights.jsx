import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiX } from 'react-icons/fi';
import TotalLikesCard from './TotalLikesCard';
import EngagementInsightCard from './EngagementInsightCard';
import TopPosts from './TopPosts';
import EngagementCategory from './EngagementCategory';

export default function EngagementInsights({ onClose }) {
  const navigate = useNavigate();

  // Mock numbers matching the exact values in the reference image
  const stats = {
    likes: 287,
    comments: 77,
    shares: 0,
    avgEngagement: 72.8
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/dashboard');
    }
  };

  const widgetContent = (
    <div className="w-full max-w-5xl bg-white border border-slate-100/90 shadow-2xl rounded-[28px] overflow-hidden flex flex-col transition-all duration-300">
      
      {/* Header Title Bar - Exact Gradient Match from image_43df1f.png */}
      <div className="w-full bg-gradient-to-r from-[#215eff] via-[#6f3bfa] to-[#aa1ef1] px-6 py-[22px] flex items-center justify-between text-white select-none rounded-t-[26px]">
        <div className="flex items-center gap-4">
          {/* Rounded square icon badge */}
          <div className="bg-white/15 w-[46px] h-[46px] rounded-[14px] flex items-center justify-center backdrop-blur-xs">
            <FiTrendingUp className="w-[22px] h-[22px] text-white stroke-[2.5]" />
          </div>
          {/* Title text */}
          <h2 className="text-[21px] font-bold tracking-wide">
            Engagement Insights
          </h2>
        </div>
        
        {/* Close button navigating to dashboard or closing modal */}
        <button 
          onClick={handleClose}
          className="p-2 hover:bg-white/10 rounded-full text-white/90 hover:text-white transition-all cursor-pointer mr-1"
          title="Close insights"
        >
          <FiX className="w-[24px] h-[24px] stroke-[2]" />
        </button>
      </div>

      {/* Dashboard Content Area */}
      <div className="p-6 flex flex-col space-y-6">
        
        {/* Metrics Grid Row wrapper matching your structural specification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Likes Card */}
          <TotalLikesCard likes={stats.likes} />

          {/* Comments Card */}
          <EngagementInsightCard type="comments" value={stats.comments} />

          {/* Shares Card */}
          <EngagementInsightCard type="shares" value={stats.shares} />

          {/* Avg Engagement Card */}
          <EngagementInsightCard type="engagement" value={stats.avgEngagement} />
        </div>

        {/* Top Performing Posts section */}
        <div className="w-full">
          <TopPosts />
        </div>

        {/* Engagement by Category section */}
        <div className="w-full">
          <EngagementCategory />
        </div>

      </div>

    </div>
  );

  if (onClose) {
    return widgetContent;
  }

  return (
    <section className="w-full min-h-screen py-12 px-4 md:px-8 bg-[#fafbfc] flex justify-center items-center font-sans antialiased">
      {widgetContent}
    </section>
  );
}

// Omit original return because it is now defined in the block above