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


export default function PostFeed({ posts: propPosts }) {
  const posts = propPosts ;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest'); // 'Latest' | 'Popular'

  const categories = [
    { name: 'All', icon: HiOutlineSquares2X2 },
    { name: 'Corruption', icon: HiOutlineCurrencyDollar, tag: 'bribe' },
    { name: 'Infrastructure', icon: HiOutlineExclamationTriangle, tags: ['pothole', 'electricity'] },
    { name: 'Water', icon: FiDroplet, tag: 'water' },
    { name: 'Electricity', icon: HiOutlineBolt, tag: 'electricity' },
    { name: 'Sanitation', icon: HiOutlineTrash, tag: 'garbage' }
  ];

  // Filtering Logic
  const filteredPosts = posts.filter(post => {
    // 1. Text Search matching
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category matching
    if (activeCategory === 'All') return matchesSearch;
    
    const catConfig = categories.find(c => c.name === activeCategory);
    if (!catConfig) return matchesSearch;

    if (catConfig.tags) {
      return matchesSearch && catConfig.tags.includes(post.tag);
    }
    return matchesSearch && post.tag === catConfig.tag;
  });

  // Sorting Logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'Popular') {
      return b.initialLikes - a.initialLikes; // sort by likes count
    }
    // Default: Sort by date / post ID descending
    return b.id - a.id;
  });

  return (
    <div className="w-full bg-transparent font-sans antialiased text-slate-800">
      <div className="w-full space-y-6 flex flex-col items-center">
        
        {/* 1. Keyword search bar block */}
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

        {/* 2. Categorization horizontal scroll buttons list row */}
        <div className="w-full flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-none select-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer shrink-0 border ${
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

        {/* 3. Section subheader lists control panel */}
        <div className="w-full flex items-center justify-between mt-2 select-none">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Latest Posts
          </h2>
          
          <div className="flex bg-slate-100/80 p-0.5 rounded-[10px] border border-slate-200/30">
            <button
              onClick={() => setSortBy('Latest')}
              className={`px-3 py-1.5 rounded-[8px] text-[11px] font-black tracking-wide transition-all cursor-pointer ${
                sortBy === 'Latest' 
                  ? 'bg-[#7D5DF2] text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('Popular')}
              className={`px-3 py-1.5 rounded-[8px] text-[11px] font-black tracking-wide transition-all cursor-pointer ${
                sortBy === 'Popular' 
                  ? 'bg-[#7D5DF2] text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Popular
            </button>
          </div>
        </div>

        {/* 4. Rendering of filtered and sorted post cards stack */}
        <div className="w-full space-y-4">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <LatestPost
                key={post.id}
                id={post.id}
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
                likes={post.likes}
              />
            ))
          ) : (
            <div className="w-full bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xs">
              <p className="text-sm font-bold text-slate-400">No posts matches your filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}