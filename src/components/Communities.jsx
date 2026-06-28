import React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import CommunityCard from "./CommunityCard";

export default function Communities({ 
  communities = [], 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  onJoinToggle,
  onMembersClick
}) {
  
  const categories = ["All", "General", "Environment", "Infrastructure", "Safety"];

  // Filter logic
  const filteredCommunities = communities.filter((c) => {
    const matchesCategory = selectedCategory === "All" || c.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm font-sans antialiased">
      
      {/* Search and Filters Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <HiOutlineMagnifyingGlass className="w-5 h-5 stroke-[2]" />
          </span>
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10.5 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mb-1.5 scrollbar-none max-w-full">
          {categories.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-95 border
                  ${isActive 
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

      </div>

      {/* Community Cards Grid */}
      {filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onJoinToggle={() => onJoinToggle(community.id)}
              onMembersClick={() => onMembersClick(community)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl">
          <p className="text-slate-400 text-sm font-semibold">No communities found matching your search.</p>
          <button 
            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
            className="mt-2.5 text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  );
}
