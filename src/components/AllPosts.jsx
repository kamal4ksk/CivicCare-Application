import React, { useState } from 'react';
import { 
  HiOutlineSquares2X2, 
  HiOutlineCurrencyDollar, 
  HiOutlineExclamationTriangle, 
  HiOutlineBolt, 
  HiOutlineTrash, 
  HiOutlineMagnifyingGlass 
} from 'react-icons/hi2';
import { FiDroplet } from 'react-icons/fi';
import LatestPost from './LatestPost';

export default function AllPosts({ posts: propPosts }) {
  // 1. Core data state loaded directly from your high-fidelity mockup lists
  const defaultPostMockData = [
    {
      id: 1,
      tag: "bribe",
      categoryColor: "bg-rose-50 text-rose-600 border-rose-100",
      title: "Bribery demand at Municipal Office",
      text: "Official demanded bribe for issuing building permit. This corruption needs to stop immediately.",
      author: "Anonymous User",
      date: "Jun 1",
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
      text: "Multiple streetlights on our road have been non-functional for over 3 months, creating safety issues.",
      author: "David Chen",
      date: "Jun 1",
      location: "Park Avenue",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop", 
      initialLikes: 54,
      commentCount: 0
    },
    {
      id: 3,
      tag: "garbage",
      categoryColor: "bg-green-50 text-green-600 border-green-100/60",
      title: "Garbage not collected for 2 weeks",
      text: "Municipal workers have not collected garbage from our street for over two weeks. Health hazard.",
      author: "Mike Wilson",
      date: "May 30",
      location: "Oak Street",
      image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=800&auto=format&fit=crop", 
      initialLikes: 67,
      commentCount: 1
    },
    {
      id: 4,
      tag: "water",
      categoryColor: "bg-blue-50 text-blue-500 border-blue-100/60",
      title: "Water supply irregular in residential area",
      text: "Water supply has been irregular for the past week. Residents are facing difficulties.",
      author: "Sarah Johnson",
      date: "May 29",
      location: "Green Valley Apartments",
      image: null,
      initialLikes: 32,
      commentCount: 0
    },
    {
      id: 5,
      tag: "pothole",
      categoryColor: "bg-orange-50 text-orange-500 border-orange-100/60",
      title: "Large pothole on Main Street causing accidents",
      text: "There is a dangerous pothole near the intersection that has caused multiple vehicle damages. Immediate attention needed.",
      author: "John Citizen",
      date: "May 28",
      location: "Main Street & 5th Avenue",
      image: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop", 
      initialLikes: 45,
      commentCount: 2
    }
  ];

  const posts = propPosts || defaultPostMockData;

  // 2. Control Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const categories = [
    { name: 'All', icon: HiOutlineSquares2X2 },
    { name: 'Corruption', icon: HiOutlineCurrencyDollar, tag: 'bribe' },
    { name: 'Infrastructure', icon: HiOutlineExclamationTriangle, tags: ['pothole', 'electricity'] },
    { name: 'Water', icon: FiDroplet, tag: 'water' },
    { name: 'Electricity', icon: HiOutlineBolt, tag: 'electricity' },
    { name: 'Sanitation', icon: HiOutlineTrash, tag: 'garbage' }
  ];

  // 3. Search & Category matching calculations
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'All') return matchesSearch;
    
    const catConfig = categories.find(c => c.name === activeCategory);
    if (!catConfig) return matchesSearch;

    if (catConfig.tags) {
      return matchesSearch && catConfig.tags.includes(post.tag);
    }
    return matchesSearch && post.tag === catConfig.tag;
  });

  // 4. Sorting arrangements
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'Popular') {
      return b.initialLikes - a.initialLikes;
    }
    return b.id - a.id;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-6 bg-transparent text-left font-sans antialiased">
      
      {/* Search Input Control */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <HiOutlineMagnifyingGlass className="h-5 w-5 text-slate-400 stroke-[2.2]" />
        </span>
        <input
          type="text"
          placeholder="Search keyword, street, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-[52px] pl-12 pr-4 bg-white border border-slate-200/80 focus:border-[#7D5DF2] focus:ring-4 focus:ring-purple-100/50 rounded-2xl outline-none text-slate-700 text-sm font-semibold transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
        />
      </div>

      {/* Horizontal Category Pill Rows */}
      <div className="w-full flex items-center space-x-2.5 overflow-x-auto pb-1 no-scrollbar select-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer shrink-0 border ${
                isSelected 
                  ? 'bg-[#7D5DF2] border-[#7D5DF2] text-white shadow-sm' 
                  : 'bg-white border-slate-200/60 text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4 stroke-[2.2]" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Section Subheader Control Block */}
      <div className="w-full flex items-center justify-between pt-2 select-none">
        <h2 className="text-lg font-black text-slate-900 tracking-tight">
          Latest Posts
        </h2>
        
        <div className="flex bg-slate-100/80 p-0.5 rounded-[10px] border border-slate-200/30">
          <button
            onClick={() => setSortBy('Latest')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-black tracking-wide transition-all cursor-pointer ${
              sortBy === 'Latest' ? 'bg-[#7D5DF2] text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortBy('Popular')}
            className={`px-3 py-1.5 rounded-[8px] text-[11px] font-black tracking-wide transition-all cursor-pointer ${
              sortBy === 'Popular' ? 'bg-[#7D5DF2] text-white shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Dynamic Render Stack */}
      <div className="space-y-4 w-full">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <LatestPost
              key={post.id}
              tag={post.tag}
              categoryColor={post.categoryColor}
              title={post.title}
              text={post.text}
              author={post.author}
              date={post.date}
              location={post.location}
              image={post.image}
              initialLikes={post.initialLikes}
              commentCount={post.commentCount}
            />
          ))
        ) : (
          <div className="w-full bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xs">
            <p className="text-sm font-bold text-slate-400">No posts match your active filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}