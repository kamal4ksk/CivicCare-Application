import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiHome, 
  HiOutlineHome, 
  HiOutlineDocumentText, 
  HiMegaphone, 
  HiOutlineMapPin, 
  HiOutlineUsers 
} from 'react-icons/hi2';

export default function MobileNavigation({ activeTab, onTabClick, onPostConcernClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { name: 'Home', iconOutline: HiOutlineHome, iconSolid: HiHome, index: 0 },
    { name: 'Feed', iconOutline: HiOutlineDocumentText, iconSolid: HiOutlineDocumentText, index: 1 },
    { name: 'Post Concern', iconOutline: HiMegaphone, iconSolid: HiMegaphone, index: 2, isFab: true },
    { name: 'Map', iconOutline: HiOutlineMapPin, iconSolid: HiOutlineMapPin, index: 3 },
    { name: 'Communities', iconOutline: HiOutlineUsers, iconSolid: HiOutlineUsers, index: 4 }
  ];

  const handleNavigation = (index) => {
    if (onTabClick) {
      onTabClick(index);
      return;
    }
    switch (index) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/feed');
        break;
      case 3:
        navigate('/map');
        break;
      case 4:
        navigate('/communities');
        break;
      default:
        break;
    }
  };

  // Determine active tab dynamically if activeTab prop is not provided or to ensure sync
  const currentActiveTab = activeTab !== undefined ? activeTab : (
    location.pathname.includes('/home') ? 0 :
    location.pathname.includes('/feed') ? 1 :
    location.pathname.includes('/map') ? 3 :
    location.pathname.includes('/communities') ? 4 : 0
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[430px] h-[68px] z-45 md:hidden flex items-end select-none">
      {/* 
         Unified Background Canvas with SVG curved middle hump.
         Aesthetic solid white backdrop to match the premium mockup image perfectly.
      */}
      <div className="absolute inset-0 flex items-end pointer-events-none z-0 filter drop-shadow-[0_12px_28px_rgba(108,93,211,0.15)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
        {/* Left wing background pill section */}
        <div className="h-[56px] flex-1 bg-white rounded-l-[32px] border-y border-l border-slate-100/50" />
        
        {/* Center hump container with matching solid white background path */}
        <div className="w-[84px] h-[68px] relative -mb-[1px] -mx-[0.5px]">
          <svg viewBox="0 0 84 68" className="w-full h-full">
            <defs>
              <clipPath id="hump-clip">
                <path d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12 L 84 68 L 0 68 Z" />
              </clipPath>
            </defs>
            {/* Hump background solid white fill to match the wings seamlessly */}
            <path 
              d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12 L 84 68 L 0 68 Z" 
              fill="#FFFFFF"
            />
            {/* Top edge refract highlight outline connecting seamlessly with the wing borders */}
            <path 
              d="M 0 12 L 16 12 C 26 12, 28 0, 42 0 C 56 0, 58 12, 68 12 L 84 12" 
              fill="none" 
              stroke="#F1F5F9" 
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* Right wing background pill section */}
        <div className="h-[56px] flex-1 bg-white rounded-r-[32px] border-y border-r border-slate-100/50" />
      </div>

      {/* Button slots layered directly above the shadow outline background */}
      <div className="relative z-10 w-full h-[68px] flex items-end pb-[4px]">
        {items.map((item) => {
          const IconOutline = item.iconOutline;
          const IconSolid = item.iconSolid;
          const isActive = currentActiveTab === item.index;

          if (item.isFab) {
            return (
              <div key={item.name} className="w-[84px] h-[68px] flex flex-col items-center justify-start z-10 relative">
               

                {/* Translucent Halo Glow + Circular Action Button */}
                <div className="relative w-[58px] h-[58px] flex items-center justify-center -mt-[25px]">
                  {/* Glowing/translucent Halo Ring */}
                  <div className="absolute inset-0 rounded-full bg-white/20 border border-white/40 backdrop-blur-xs shadow-[0_8px_24px_rgba(108,93,211,0.15)] pointer-events-none" />
                  
                  {/* Actual Action Button */}
                  <button
                    onClick={onPostConcernClick}
                    className="w-[46px] h-[46px] rounded-full bg-gradient-to-tr from-[#155DFC] to-[#9810FA] flex items-center justify-center shadow-lg hover:opacity-95 active:scale-95 transition-all duration-300 cursor-pointer z-10"
                    aria-label="Post Concern"
                  >
                    <HiMegaphone className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                {/* Center Horizontal Gradient Pill Indicator */}
                <div className="w-[18px] h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5" />

                {/* FAB label text */}
                <span className="text-[9.5px] font-extrabold mt-1 text-[#155DFC] tracking-tight whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            );
          }

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.index)}
              className="flex-1 flex flex-col items-center justify-start pt-1.5 h-[56px] z-10 cursor-pointer"
            >
              {/* Capsule Highlight background for active state items */}
              <div 
                className={`w-[52px] h-[36px] rounded-[16px] flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#EAF0FE] text-[#155DFC]' 
                    : 'bg-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {isActive ? <IconSolid className="w-5 h-5" /> : <IconOutline className="w-5 h-5" />}
              </div>
              
              {/* Icon label text */}
              <span 
                className={`text-[9px] font-extrabold mt-1 text-center tracking-tight leading-none max-w-[70px] truncate ${
                  isActive ? 'text-[#155DFC]' : 'text-slate-500'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}