import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import TopPostsCard from './TopPostsCard';

const mockPosts = [
  { rank: 1, title: 'Bribery demand at Municipal Office', category: 'Bribe', likes: 89, comments: 24 },
  { rank: 2, title: 'Garbage not collected for 2 weeks', category: 'Garbage', likes: 67, comments: 15 },
  { rank: 3, title: 'Streetlights not working for months', category: 'Electricity', likes: 54, comments: 18 },
  { rank: 4, title: 'Large pothole on Main Street causing accidents', category: 'Pothole', likes: 45, comments: 12 },
  { rank: 5, title: 'Water supply irregular in residential area', category: 'Water', likes: 32, comments: 8 }
];

export default function TopPosts() {
  return (
    <div className="w-full">
      
      {/* Header Row - Direct on modal page without card boundary or bottom divider */}
      <div className="flex items-center space-x-2 text-slate-900 pb-3 mb-1 select-none">
        <FiTrendingUp className="w-5 h-5 text-[#2563eb] stroke-[2.5]" />
        <h3 className="text-base font-bold tracking-tight">
          Top Performing Posts
        </h3>
      </div>

      {/* Stack List */}
      <div className="flex flex-col space-y-3">
        {mockPosts.map((post) => (
          <TopPostsCard
            key={post.rank}
            rank={post.rank}
            title={post.title}
            category={post.category}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>

    </div>
  );
}
