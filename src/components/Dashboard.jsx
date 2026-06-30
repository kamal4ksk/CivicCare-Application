import React from 'react';
import { HiOutlineDocumentText, HiOutlineArrowTrendingUp, HiOutlineCheckCircle, HiOutlineChartBar, HiOutlineSparkles } from 'react-icons/hi2';
import DashboardCard from './DashboardCard';

export default function Dashboard({ onOpenInsights }) {
  const analyticsData = [
    {
      id: 1,
      count: "2",
      label: "Open Reports",
      icon: HiOutlineDocumentText,
      bgGradient: "from-blue-600 to-blue-500"
    },
    {
      id: 2,
      count: "5",
      label: "Total Posts",
      icon: HiOutlineArrowTrendingUp,
      bgGradient: "from-rose-600 to-pink-500"
    },
    {
      id: 3,
      count: "3",
      label: "Posts Resolved",
      icon: HiOutlineCheckCircle,
      bgGradient: "from-emerald-600 to-green-500"
    },
    {
      id: 4,
      count: "364",
      label: "Active Engagement",
      icon: HiOutlineChartBar,
      bgGradient: "from-purple-600 to-indigo-500"
    }
  ];

  return (
    /* ==========================================================================
       DASHBOARD WRAPPER CANVAS
       Updated the wrapper to seamlessly layer inside your primary oklab linear-gradient canvas,
       retaining local layout margins without hard-coding conflicting white block sections.
       ========================================================================== */
    <section className="w-full bg-transparent pt-1 pb-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[rgb(0,0,0)]">
      <div className="max-w-7xl mx-auto">

        {/* Header Dashboard Control Stack Block */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
  <div className="w-full">
    <h2
      className="
        w-full
        max-w-[375px]
        text-[20px]
        sm:text-[24px]
        font-medium
        text-[#0A0A0A]
        mb-2
        leading-normal
        font-sans
      "
    >
      Dashboard Overview
    </h2>

    <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
      Monitor citizen complaints and engagement metrics
    </p>
  </div>

  {/* Premium Total Insights Floating Badge */}
  <button
    onClick={onOpenInsights}
    className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-4 py-2.5 shadow-sm hover:opacity-95 active:scale-98 transition-all duration-200 self-stretch sm:self-auto justify-center cursor-pointer"
  >
    <HiOutlineSparkles className="w-5 h-5 animate-pulse text-blue-200" />

    <div className="text-left">
      <span className="block text-[10px] text-blue-100 uppercase tracking-wider font-bold">
        Total Insights
      </span>

      <span className="text-base font-black tracking-tight leading-none block mt-0.5">
        1,883
      </span>
    </div>
  </button>
</div>
        {/* 4-Column Fluid Grid Wrapper targeting element 18 explicitly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {analyticsData.map((card) => (
            <DashboardCard
              key={card.id}
              count={card.count}
              label={card.label}
              icon={card.icon}
              bgGradient={card.bgGradient}
            />
          ))}
        </div>

      </div>
    </section>
  );
}