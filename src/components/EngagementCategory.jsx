import React from 'react';
import { FiUsers } from 'react-icons/fi';
import EngagementCategoryCard from './EngagementCategoryCard';

const mockCategories = [
  { category: 'Pothole', avgLikes: 45.0, avgComments: 12.0, postsCount: 1, isActive: true },
  { category: 'Water', avgLikes: 32.0, avgComments: 8.0, postsCount: 1, isActive: false },
  { category: 'Garbage', avgLikes: 67.0, avgComments: 15.0, postsCount: 1, isActive: false },
  { category: 'Bribe', avgLikes: 89.0, avgComments: 24.0, postsCount: 1, isActive: false },
  { category: 'Electricity', avgLikes: 54.0, avgComments: 18.0, postsCount: 1, isActive: false }
];

export default function EngagementCategory() {
  return (
    <div className="w-full">
      
      {/* Header Row - Direct on modal page without card boundary or bottom divider */}
      <div className="flex items-center space-x-2 text-slate-900 pb-3 mb-1 select-none">
        <FiUsers className="w-5 h-5 text-purple-600 stroke-[2.5]" />
        <h3 className="text-base font-bold tracking-tight">
          Engagement by Category
        </h3>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCategories.map((item, index) => (
          <EngagementCategoryCard
            key={index}
            category={item.category}
            avgLikes={item.avgLikes}
            avgComments={item.avgComments}
            postsCount={item.postsCount}
            isActive={item.isActive}
          />
        ))}
      </div>

    </div>
  );
}
