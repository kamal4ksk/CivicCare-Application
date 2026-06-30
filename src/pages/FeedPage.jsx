import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import CommunityBoard from '../components/CommunityBoard';
import PostFeed from '../components/PostFeed';
import TrendingNow from '../components/TrendingNow';
import TrendingTopics from '../components/TrendingTopics';
import NearbyUpdates from '../components/NearbyUpdates';
import MobileNavigation from '../components/MobileNavigation';
import MobileDrawer from '../components/MobileDrawer';
import ReportConcernModal from '../components/ReportConcernModal';

const initialPostsData = [
  {
    id: 1,
    tag: "bribe",
    categoryColor: "bg-rose-50 text-rose-600 border-rose-100",
    title: "Bribery demand at Municipal Office",
    text: "Official demanded bribe for issuing building permit. This corruption needs to stop immediately.",
    author: "Anonymous User",
    date: "01/06/2026",
    location: "City Municipal Office",
    image: null,
    initialLikes: 89,
    commentCount: 0
  },
  {
    id: 2,
    tag: "electricity",
    categoryColor: "bg-yellow-50 text-[#B7791F] border-yellow-100/60",
    title: "Streetlights not working for months",
    text: "Multiple streetlights on our road have been non-functional for over 3 months, creating major safety issues at night.",
    author: "David Chen",
    date: "01/06/2026",
    location: "Park Avenue",
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
    initialLikes: 54,
    commentCount: 0
  },
  {
    id: 3,
    tag: "garbage",
    categoryColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    title: "Garbage not collected for 2 weeks",
    text: "Municipal workers have not collected garbage from our street for over two weeks. This is turning into a serious health hazard.",
    author: "Mike Wilson",
    date: "30/05/2026",
    location: "Oak Street",
    image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=800&auto=format&fit=crop",
    initialLikes: 67,
    commentCount: 1
  },
  {
    id: 4,
    tag: "water",
    categoryColor: "bg-blue-50 text-blue-600 border-blue-100",
    title: "Water supply irregular in residential area",
    text: "Water supply has been highly irregular for the past week. Residents are facing severe difficulties managing daily chores.",
    author: "Sarah Johnson",
    date: "29/05/2026",
    location: "Green Valley Apartments",
    image: null,
    initialLikes: 32,
    commentCount: 0
  },
  {
    id: 5,
    tag: "pothole",
    categoryColor: "bg-orange-50 text-orange-600 border-orange-100",
    title: "Large pothole on Main Street causing accidents",
    text: "There is a dangerous deep pothole near the main crossroads intersection that has already caused multiple vehicle damages. Immediate attention needed.",
    author: "John Citizen",
    date: "28/05/2026",
    location: "Main Street & 5th Avenue",
    image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop",
    initialLikes: 45,
    commentCount: 2
  }
];

export default function FeedPage() {
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [userConcerns, setUserConcerns] = useState(() => {
    const saved = localStorage.getItem('civic_care_user_concerns');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const posts = [
    ...userConcerns.map(concern => {
      let categoryColor = "bg-slate-50 text-slate-600 border-slate-100";
      let tag = concern.category.toLowerCase();

      if (tag === 'bribery') {
        categoryColor = "bg-rose-50 text-rose-600 border-rose-100";
        tag = "bribe";
      } else if (tag === 'potholes') {
        categoryColor = "bg-orange-50 text-orange-600 border-orange-100";
        tag = "pothole";
      } else if (tag === 'water') {
        categoryColor = "bg-blue-50 text-blue-600 border-blue-100";
        tag = "water";
      } else if (tag === 'electricity') {
        categoryColor = "bg-yellow-50 text-[#B7791F] border-yellow-100/60";
        tag = "electricity";
      } else if (tag === 'waste') {
        categoryColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
        tag = "garbage";
      }

      return {
        id: concern.id,
        tag: tag,
        categoryColor: categoryColor,
        title: concern.title,
        text: concern.description,
        author: "Fathima",
        date: concern.date,
        location: concern.location,
        image: concern.photo || null,
        initialLikes: 1,
        commentCount: 0
      };
    }),
    ...initialPostsData
  ];

  const handleSubmitConcern = (newConcern) => {
    const concernWithMeta = {
      id: Date.now(),
      category: newConcern.category,
      title: newConcern.title,
      description: newConcern.description,
      location: newConcern.location,
      photo: newConcern.photo,
      date: new Date().toLocaleDateString('en-GB')
    };

    const updatedConcerns = [concernWithMeta, ...userConcerns];
    setUserConcerns(updatedConcerns);
    localStorage.setItem('civic_care_user_concerns', JSON.stringify(updatedConcerns));
    setIsReportModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(to_right_bottom_in_oklab,rgb(239,246,255)_0%,rgb(250,245,255)_50%,rgb(253,242,248)_100%)] flex flex-col items-center justify-start box-border relative text-[16px] font-sans font-normal leading-normal text-[rgb(0,0,0)] antialiased">

      {/* 1. Fluid Header Block */}
      <div className="w-full pt-0 mt-0 px-0">
        <UserHeader onMenuClick={() => setIsDrawerOpen(true)} onPostClick={() => setIsReportModalOpen(true)} />
      </div>

      {/* 2. Core Interior Layout Container */}
      <div className="w-full max-w-[1324px] px-[16px] pb-[48px] flex-1 flex flex-col overflow-y-auto custom-scrollbar mt-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full pt-0 pb-4">

          {/* Left Column (Main Feed Header + Live Search Engine) */}
          <div className="lg:col-span-8 space-y-6 flex flex-col text-left">
            <CommunityBoard />
            <PostFeed posts={posts} />
          </div>

          {/* Right Column (Side Widgets Panels) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <TrendingNow />
            <TrendingTopics />
            <NearbyUpdates />
          </div>

        </div>
      </div>
      {/* 3. Mobile Navigation Overlays */}
      <MobileNavigation
        activeTab={1}
        onTabClick={(index) => {
          if (index === 0) navigate('/home');
          else if (index === 1) navigate('/feed');
          else if (index === 3) navigate('/map');
          else if (index === 4) navigate('/communities');
        }}
        onPostConcernClick={() => setIsReportModalOpen(true)}
      />

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={1}
        onTabClick={(index) => {
          if (index === 0) navigate('/home');
          else if (index === 1) navigate('/feed');
          else if (index === 3) navigate('/map');
          else if (index === 4) navigate('/communities');
          else if (index === 5) navigate('/resources');
        }}
      />

      {/* Report a Concern Modal Dialog Box */}
      {isReportModalOpen && (
        <ReportConcernModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleSubmitConcern}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 99px; }
      `}</style>
    </div>
  );
}