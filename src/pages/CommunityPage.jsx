import React, { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader";
import CommunityHeader from "../components/CommunityHeader";
import CommunitySummary from "../components/CommunitySummary";
import Communities from "../components/Communities";
import { HiXMark, HiOutlinePlus, HiCheck, HiOutlineUsers } from "react-icons/hi2";
import { getCommunities, createCommunity, joinLeaveCommunity } from "../services/communityService";

const getMemberDetail = (initial, community) => {
  const details = {
    "S": { name: "Sarah Jenkins", role: "Admin", date: "Jan 10, 2026", color: "bg-amber-500" },
    "J": { name: "John Doe", role: "Member", date: "Jan 12, 2026", color: "bg-indigo-500" },
    "M": { name: "Mike Wilson", role: "Admin", date: "Feb 10, 2026", color: "bg-orange-500" },
    "A": { name: "Anonymous User", role: "Member", date: "Feb 14, 2026", color: "bg-blue-500" },
    "D": { name: "Demo User", role: "Member", date: "Jun 26, 2026", color: "bg-violet-500" },
  };

  let role = "Member";
  if (community.name === "Green Valley Residents" && initial === "S") role = "Admin";
  if (community.name === "Clean City Initiative" && initial === "M") role = "Admin";
  if (community.name === "Road Safety Watch" && initial === "J") role = "Admin";
  if (community.name === "Anti-Corruption Forum" && initial === "A") role = "Admin";

  const base = details[initial] || { name: `User ${initial}`, role: "Member", date: "Jun 26, 2026", color: "bg-slate-500" };
  return {
    ...base,
    role: role || base.role
  };
};

const INITIAL_COMMUNITIES = [
  {
    id: 1,
    name: "Green Valley Residents",
    category: "General",
    description: "A community for Green Valley residents to discuss local issues, share updates, and improve our neighborhood together.",
    location: "Green Valley, NY",
    dateCreated: "Jan 2026",
    type: "Public",
    members: ["S", "J", "M", "D"],
    joined: false,
    icon: "🏡",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 2,
    name: "Clean City Initiative",
    category: "Environment",
    description: "Dedicated to keeping our city clean and reporting garbage/sanitation issues. Together we make a difference.",
    location: "Downtown, NY",
    dateCreated: "Feb 2026",
    type: "Public",
    members: ["M", "A"],
    joined: false,
    icon: "🌱",
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Road Safety Watch",
    category: "Infrastructure",
    description: "Reporting potholes, broken streetlights, and road hazards to keep our streets safe for everyone.",
    location: "City-wide",
    dateCreated: "Mar 2026",
    type: "Public",
    members: ["D", "J", "M"],
    joined: false,
    icon: "🛣️",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    name: "Anti-Corruption Forum",
    category: "Safety",
    description: "A safe space to report bribery and corruption incidents. Private and confidential group.",
    location: "City Municipal Area",
    dateCreated: "Apr 2026",
    type: "Private",
    members: ["A", "S"],
    joined: false,
    icon: "🚓",
    color: "from-pink-500 to-rose-600",
  }
];

const PRESET_THEMES = [
  { label: "Purple / Indigo", value: "from-purple-500 to-indigo-600" },
  { label: "Teal / Emerald", value: "from-emerald-500 to-teal-500" },
  { label: "Orange / Red", value: "from-orange-500 to-red-500" },
  { label: "Pink / Rose", value: "from-pink-500 to-rose-500" },
  { label: "Blue / Sky", value: "from-blue-500 to-sky-500" },
  { label: "Amber / Orange", value: "from-amber-500 to-orange-500" },
  { label: "Teal / Cyan", value: "from-teal-500 to-cyan-500" },
  { label: "Fuchsia / Pink", value: "from-fuchsia-500 to-pink-500" }
];

const PRESET_ICONS = ["🏡", "🌱", "🛣️", "🚓", "🏥", "📚", "🚌", "🌐"];

export default function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new Community
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [newType, setNewType] = useState("Public");
  const [newIcon, setNewIcon] = useState("🏡");
  const [newTheme, setNewTheme] = useState("from-purple-500 to-indigo-600");
  const [formError, setFormError] = useState("");

  const loadCommunities = async () => {
    try {
      const response = await getCommunities();
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      
      const mapped = response.data.map(comm => {
        const isJoined = (comm.members || []).some(m => m && (m._id === currentUser._id || m === currentUser._id));
        const membersMapped = (comm.members || []).map(m => (m && m.name) ? m.name.charAt(0).toUpperCase() : "U");

        return {
          id: comm._id,
          name: comm.name,
          category: comm.category,
          description: comm.description,
          location: comm.location,
          dateCreated: comm.createdAt ? new Date(comm.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Jan 2026",
          type: comm.isOfficial ? "Official" : "Public",
          members: membersMapped,
          joined: isJoined,
          icon: comm.icon || "🏡",
          color: comm.color || "from-purple-500 to-indigo-600",
          _id: comm._id
        };
      });

      const allComms = [
        ...mapped,
        ...INITIAL_COMMUNITIES.filter(c => !mapped.some(m => m.name === c.name))
      ];
      setCommunities(allComms);
    } catch (error) {
      console.error("Failed to load communities", error);
    }
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  const handleJoinToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to join communities.");
        return;
      }

      if (typeof id === 'number') {
        setCommunities(prev =>
          prev.map(comm => {
            if (comm.id === id) {
              const alreadyJoined = comm.joined;
              let updatedMembers = [...comm.members];
              if (alreadyJoined) {
                updatedMembers = updatedMembers.filter(m => m !== 'D');
              } else {
                if (!updatedMembers.includes('D')) updatedMembers.push('D');
              }
              return { ...comm, joined: !alreadyJoined, members: updatedMembers };
            }
            return comm;
          })
        );
        return;
      }

      await joinLeaveCommunity(id, token);
      loadCommunities();
    } catch (error) {
      console.error("Failed to toggle join", error);
    }
  };

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim() || !newLocation.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to create communities.");
        return;
      }

      const communityData = {
        name: newName,
        description: newDescription,
        category: newCategory,
        location: newLocation,
        icon: newIcon,
        color: newTheme,
        isOfficial: newType === "Official"
      };

      await createCommunity(communityData, token);
      alert("Community created successfully!");
      setIsModalOpen(false);
      
      // Reset Form
      setNewName("");
      setNewDescription("");
      setNewLocation("");
      setNewCategory("General");
      setNewType("Public");
      setNewIcon("🏡");
      setNewTheme("from-purple-500 to-indigo-600");
      setFormError("");

      loadCommunities();
    } catch (error) {
      console.error(error);
      setFormError(error.response?.data?.message || "Failed to create community");
    }
  };

  const [activeMembersCommunity, setActiveMembersCommunity] = useState(null);

  return (
    <div className="min-h-screen bg-[#f7f5fb] pb-12">
      <UserHeader />

      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full max-w-[1180px] flex flex-col gap-6">
        
        {/* 17.User-header */}
        <CommunityHeader onCreateClick={() => setIsModalOpen(true)} />

        {/* 62.Community-summary */}
        <CommunitySummary communities={communities} />

        {/* 64.communities */}
        <Communities
          communities={communities}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onJoinToggle={handleJoinToggle}
          onMembersClick={(comm) => setActiveMembersCommunity(comm)}
        />

      </main>

      {/* Mockup-aligned Modal overlay for Creating Community */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Dynamic Full-Bleed Header Banner */}
            <div className={`bg-gradient-to-r ${newTheme} p-6 text-white relative flex flex-col gap-1 min-h-[140px] justify-end`}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer flex items-center justify-center"
              >
                <HiXMark className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <span className="text-4xl filter drop-shadow-sm select-none mb-1 text-left">
                {newIcon || "🏡"}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight text-left truncate">
                {newName.trim() || "Community Name"}
              </h2>
              <span className="text-white/95 text-xs font-semibold tracking-wide text-left flex items-center gap-1.5">
                {newCategory} · {newType === "Public" ? "🌐 Public" : "🔒 Private"}
              </span>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleCreateCommunity} className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(90vh-140px)]">
              {formError && (
                <div className="bg-rose-50 text-rose-600 text-xs font-semibold p-3 rounded-lg border border-rose-100">
                  {formError}
                </div>
              )}

              {/* Icon Selector */}
              <div className="text-left">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Community Icon
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {PRESET_ICONS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewIcon(emoji)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-200 cursor-pointer active:scale-95
                        ${newIcon === emoji 
                          ? "bg-blue-50 border-2 border-blue-500 scale-105 shadow-xs" 
                          : "bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700"
                        }
                      `}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Theme Selector */}
              <div className="text-left">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Cover Color
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {PRESET_THEMES.map(theme => (
                    <button
                      key={theme.value}
                      type="button"
                      onClick={() => setNewTheme(theme.value)}
                      className={`w-8.5 h-8.5 rounded-full bg-gradient-to-br ${theme.value} transition-all duration-200 cursor-pointer border border-black/5 hover:scale-105 active:scale-95
                        ${newTheme === theme.value ? "ring-2 ring-blue-500 ring-offset-2 scale-105" : ""}
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* Community Name */}
              <div className="text-left">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Community Name *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Green Valley Residents"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 py-3 px-4 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              {/* Description */}
              <div className="text-left">
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Description *
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What is this community about?"
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 py-3 px-4 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Category & Location Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 py-3 px-4 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white cursor-pointer"
                  >
                    <option value="General">General</option>
                    <option value="Environment">Environment</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="City, Area..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 py-3 px-4 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Private Toggle Switch Card */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between gap-4 mt-1">
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-800">Private Community</span>
                  <span className="text-xs text-slate-400 font-medium">Only invited members can join</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNewType(prev => prev === "Public" ? "Private" : "Public")}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-hidden relative shrink-0 cursor-pointer ${
                    newType === "Private" ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-xs transition-transform duration-200 ${
                      newType === "Private" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-95 shadow-md shadow-indigo-600/10 active:scale-98 transition-all duration-200 cursor-pointer mt-4"
              >
                + Create Community
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Modal overlay for showing Members List */}
      {activeMembersCommunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => setActiveMembersCommunity(null)} 
          />
          
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl border border-slate-100 flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header Banner */}
            <div className={`bg-gradient-to-r ${activeMembersCommunity.color} p-6 text-white relative flex flex-col gap-1`}>
              <button
                onClick={() => setActiveMembersCommunity(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer flex items-center justify-center"
              >
                <HiXMark className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <span className="text-3xl filter drop-shadow-sm select-none mb-1">
                {activeMembersCommunity.icon || "👥"}
              </span>
              <h2 className="text-xl font-extrabold tracking-tight leading-tight">
                {activeMembersCommunity.name}
              </h2>
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                {activeMembersCommunity.members.length} {activeMembersCommunity.members.length === 1 ? "member" : "members"}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <HiOutlineUsers className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                <span>Members</span>
              </div>

              {/* Member Cards List */}
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
                {activeMembersCommunity.members.map((initial) => {
                  const memberInfo = getMemberDetail(initial, activeMembersCommunity);
                  return (
                    <div 
                      key={initial} 
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100/50 rounded-xl hover:shadow-xs transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        {/* Circular Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold uppercase shadow-2xs ${memberInfo.color}`}>
                          {initial}
                        </div>
                        
                        {/* Name and Date */}
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-800">
                              {memberInfo.name}
                            </span>
                            {memberInfo.role === "Admin" && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black border border-amber-200">
                                👑 Admin
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-medium">
                            Joined {memberInfo.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
