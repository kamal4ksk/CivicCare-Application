import React from 'react';
import { HiOutlineExclamationTriangle, HiOutlineMap, HiOutlineChartBar } from 'react-icons/hi2';
import { FiTrendingUp, FiUsers, FiMessageSquare } from 'react-icons/fi';
import FeatureCard from './FeatureCard';

export default function PlatformFeatures() {
  const featuresData = [
    {
      id: 1,
      title: "Report Issues",
      description: "Share concerns with photos and location",
      icon: HiOutlineExclamationTriangle,
      iconColor: "text-orange-600",
      bgGrad: "from-orange-50 to-orange-100/70"
    },
    {
      id: 2,
      title: "Interactive Map",
      description: "View all issues on a live community map",
      icon: HiOutlineMap,
      iconColor: "text-blue-600",
      bgGrad: "from-blue-50 to-blue-100/70"
    },
    {
      id: 3,
      title: "Track Progress",
      description: "Monitor status from pending to resolved",
      icon: FiTrendingUp,
      iconColor: "text-emerald-600",
      bgGrad: "from-emerald-50 to-emerald-100/70"
    },
    {
      id: 4,
      title: "Community Engagement",
      description: "Like, comment, and amplify voices",
      icon: FiUsers,
      iconColor: "text-fuchsia-600",
      bgGrad: "from-fuchsia-50 to-fuchsia-100/70"
    },
    {
      id: 5,
      title: "WhatsApp Integration",
      description: "Report via WhatsApp Business API",
      icon: FiMessageSquare,
      iconColor: "text-green-600",
      bgGrad: "from-green-50 to-green-100/70"
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      description: "View insights and impact metrics",
      icon: HiOutlineChartBar,
      iconColor: "text-violet-600",
      bgGrad: "from-violet-50 to-violet-100/70"
    }
  ];

  return (
    // Added id="features" here to cleanly bind smooth navigation transitions from header clicks
    <section id="features" className="w-full bg-slate-50/40 py-20 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Core Typography Heading Grid Stack */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Platform Features
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
            Everything you need to make your voice heard and track real change
          </p>
        </div>

        {/* 3-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconColor={feature.iconColor}
              bgGrad={feature.bgGrad}
            />
          ))}
        </div>

      </div>
    </section>
  );
}