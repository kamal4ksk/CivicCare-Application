import React from "react";
import { 
  HiOutlineMapPin, 
  HiOutlineCalendar, 
  HiOutlineUserPlus, 
  HiOutlineUsers,
  HiCheck
} from "react-icons/hi2";

export default function CommunityCard({ community, onJoinToggle, onMembersClick }) {
  const {
    name,
    category,
    description,
    location,
    dateCreated,
    type,
    members = [],
    joined,
    icon,
    color = "from-indigo-500 to-purple-600",
  } = community;

  // Render maximum 4 avatars, show initials in small circles
  const displayAvatars = members.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      
      {/* Top Banner (Theme Gradient Header) */}
      <div className={`bg-gradient-to-r ${color} p-5 text-white relative min-h-[140px] flex flex-col justify-between`}>
        <div className="flex items-center justify-between">
          <span className="text-3xl filter drop-shadow-sm select-none" role="img" aria-label="community-icon">
            {icon || "👥"}
          </span>
          <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase border border-white/10">
            {type}
          </span>
        </div>
        
        <div className="mt-4">
          <h3 className="font-extrabold text-lg tracking-tight leading-tight line-clamp-1 group-hover:underline cursor-pointer">
            {name}
          </h3>
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-1 block">
            # {category}
          </span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        {/* Description & Metadata */}
        <div>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-medium mb-4">
            <div className="flex items-center gap-1">
              <HiOutlineMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineCalendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{dateCreated}</span>
            </div>
          </div>
        </div>

        {/* Members & Action Footer */}
        <div>
          {/* Members List */}
          <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-50">
            <div className="flex -space-x-1.5 overflow-hidden">
              {displayAvatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center justify-center w-6.5 h-6.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black border-2 border-white ring-1 ring-slate-100 uppercase"
                >
                  {avatar}
                </div>
              ))}
              {members.length > 4 && (
                <div className="inline-flex items-center justify-center w-6.5 h-6.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border-2 border-white ring-1 ring-slate-100">
                  +{members.length - 4}
                </div>
              )}
            </div>
            <button 
              onClick={onMembersClick}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-200 cursor-pointer flex items-center gap-0.5"
            >
              <span>{members.length} {members.length === 1 ? "member" : "members"}</span>
              <span className="text-[10px]">&gt;</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <button
              onClick={onJoinToggle}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 cursor-pointer select-none active:scale-98
                ${joined 
                  ? "bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 border border-transparent hover:border-red-200" 
                  : "bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white hover:opacity-95"
                }
              `}
            >
              {joined ? (
                <>
                  <HiCheck className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <HiOutlineUserPlus className="w-4 h-4 stroke-[2.5]" />
                  <span>Join</span>
                </>
              )}
            </button>

            <button 
              onClick={onMembersClick}
              className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-none active:scale-98 select-none"
            >
              <HiOutlineUsers className="w-4 h-4 text-slate-500 stroke-[2.5]" />
              <span>Members</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
