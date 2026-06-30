import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HiOutlineHome, 
  HiOutlineChatBubbleLeft, 
  HiOutlineMapPin, 
  HiOutlineUsers, 
  HiOutlineBookOpen,
  HiPlus,
  HiBars3,
  HiXMark,
  HiOutlinePhoto,
  HiOutlinePaperAirplane
} from 'react-icons/hi2';
import { getNotifications, saveNotifications } from '../utils/notifications';
import { Bell } from "lucide-react";
import ReportConcernModal from "./ReportConcernModal";

// Global module-scope tracking variable to retain tab state across unmounts/mounts
let lastTabIndex = null;

export default function UserHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);
  const [locationInput, setLocationInput] = React.useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
 
 const [notifications, setNotifications] = React.useState(() => getNotifications());

  const unreadCount = notifications.filter(n => n.unread).length;


  const notificationsRef = React.useRef(null);
  const accountRef = React.useRef(null);

  React.useEffect(() => {
    const handleUpdate = () => {
      setNotifications(getNotifications());
    };
    window.addEventListener("notifications_updated", handleUpdate);
    return () => {
      window.removeEventListener("notifications_updated", handleUpdate);
    };
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllRead = () => {
    const updated = notifications.map((notification) => ({ ...notification, unread: false }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markSingleRead = (id) => {
    const updated = notifications.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const navItems = [
    { name: "Home", icon: HiOutlineHome, path: "/home" },
    { name: "Feed", icon: HiOutlineChatBubbleLeft, path: "/feed" },
    { name: "Map", icon: HiOutlineMapPin, path: "/map" },
    { name: "Communities", icon: HiOutlineUsers, path: "/communities" },
    { name: "Resources", icon: HiOutlineBookOpen, path: "/resources" },
  ];

  const targetTab = navItems.findIndex(item => location.pathname === item.path) === -1 
    ? 0 
    : navItems.findIndex(item => location.pathname === item.path);

  // Initialize pillTab state to the last visited tab position to trigger slide on mount
  const [pillTab, setPillTab] = React.useState(() => {
    return lastTabIndex !== null ? lastTabIndex : targetTab;
  });

  React.useEffect(() => {
    lastTabIndex = targetTab;
    
    // Animate to target position with transition
    if (pillTab !== targetTab) {
      const timer = setTimeout(() => {
        setPillTab(targetTab);
      }, 50); // Delay slightly for paint
      return () => clearTimeout(timer);
    }
  }, [targetTab, pillTab]);

  const handleNavClick = (path, index) => {
    lastTabIndex = targetTab; // Store the current tab position right before we switch
    setIsMobileMenuOpen(false); // Close mobile menu if open
    navigate(path);
  };


  return (
    <header className="w-full bg-white border-b border-slate-100 font-sans antialiased sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1216px] mx-auto h-[64px] flex items-center justify-between">        
        
        {/* Left Side: Brand Logo Layout */}
        <div 
          onClick={() => navigate('/home')} 
          className="flex items-center space-x-2.5 shrink-0 select-none cursor-pointer"
        >
          {/* Hamburger Menu on Mobile viewports */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
              onMenuClick && onMenuClick();
            }}
            className="min-[1025px]:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-100/80 rounded-lg cursor-pointer transition-colors duration-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <HiXMark className="w-5.5 h-5.5 stroke-[2]" />
            ) : (
              <HiBars3 className="w-5.5 h-5.5 stroke-[2]" />
            )}
          </button>

          <div className="w-[40px] h-[40px] rounded-[14px] bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center shadow-xs">
            <span className="text-white font-bold text-[17px] tracking-tight select-none">CC</span>
          </div>
          {/* exact implementation of your gradient styling rules applied directly via text clip formatting */}
          <span className="w-[90.7969px] h-[28px] border-0 border-solid border-[rgba(0,0,0,0.1)] block box-border bg-gradient-to-r from-[rgb(21,93,252)] to-[rgb(152,16,250)] bg-clip-text text-[20px] font-bold leading-[1.4] text-[rgba(0,0,0,0)] tracking-tight">
            CivicCare
          </span>
        </div>

        {/* Middle Side: Navigation Links with slow down duration transition states */}
        <nav className="hidden min-[1025px]:flex items-center relative bg-slate-50 rounded-[18px] p-1">

          {/* Sliding Active Background */}
          <div
            className="absolute top-1 left-1 h-[42px] rounded-[14px]
                       bg-gradient-to-r from-[#155DFC] to-[#9810FA]
                       transition-all duration-[400ms] ease-in-out"
            style={{
              width:
                pillTab === 0
                  ? "110px"
                  : pillTab === 1
                  ? "110px"
                  : pillTab === 2
                  ? "110px"
                  : pillTab === 3
                  ? "150px"
                  : "140px",

              transform:
                pillTab === 0
                  ? "translateX(0px)"
                  : pillTab === 1
                  ? "translateX(110px)"
                  : pillTab === 2
                  ? "translateX(220px)"
                  : pillTab === 3
                  ? "translateX(330px)"
                  : "translateX(480px)",
            }}
          />

          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path, index)}
                className={`relative z-10 flex items-center justify-center gap-2
                  h-[42px]
                  font-semibold
                  focus:outline-none
                  transition-all duration-300
                  ${
                    index === 0
                      ? "w-[110px]"
                      : index === 1
                      ? "w-[110px]"
                      : index === 2
                      ? "w-[110px]"
                      : index === 3
                      ? "w-[150px]"
                      : "w-[140px]"
                  }
                  ${
                    pillTab === index
                      ? "text-white"
                      : "text-slate-600 hover:text-[#155DFC]"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Action Controls & User Account Profile */}
        <div className="flex items-center space-x-4 shrink-0">
          
          {/* Post Button */}
          <button onClick={() => setIsReportModalOpen(true)} className="hidden sm:inline-flex items-center space-x-1.5 px-5 py-2.5 bg-gradient-to-r from-[#155DFC] to-[#9810FA] hover:opacity-95 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/10 transform active:scale-98 transition-all duration-300 cursor-pointer">
            <HiPlus className="w-4 h-4 stroke-[3]" />
            <span>Post</span>
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
         <button
  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
  className="
    relative
    w-[42px]
    h-[42px]
    flex
    items-center
    justify-center
    rounded-full
    bg-white
    border
    border-[#E5E7EB]
    shadow-[0_1px_4px_rgba(0,0,0,0.08)]
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
    transition-all
    duration-200
  "
>
  <Bell
    size={20}
    strokeWidth={2}
    className="text-[#64748B]"
  />

  {unreadCount > 0 && (
    <span
      className="
        absolute
        -top-[3px]
        -right-[3px]
        w-[18px]
        h-[18px]
        rounded-full
        bg-[#EF4444]
        border-[2px]
        border-white
        text-[10px]
        text-white
        font-bold
        flex
        items-center
        justify-center
      "
    >
      {unreadCount}
    </span>
  )}
</button>

            {isNotificationsOpen && (
              <div 
className="absolute right-0 top-full mt-3
w-[380px]
bg-white
rounded-3xl
border border-slate-200
shadow-2xl
overflow-hidden
z-[100]"              >
                {/* Header */}
<div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">                  <span className="text-sm font-bold text-slate-800">Notifications</span>
                  <button 
                    onClick={markAllRead}
                    className="text-[#9810FA] hover:opacity-90 font-bold text-xs flex items-center gap-1 cursor-pointer transition-opacity duration-200"
                  >
                    <svg className="w-3.5 h-3.5 stroke-[#9810FA]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 7 17l-5-5"/>
                      <path d="m22 10-7.5 7.5-3.5-3.5"/>
                    </svg>
                    Mark all read
                  </button>
                </div>

                {/* List */}
<div className="max-h-[320px] overflow-y-auto">
                    {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      onClick={() => markSingleRead(notification.id)}
className={`
flex
gap-3
p-4
cursor-pointer
border-b
border-slate-100
hover:bg-slate-50

${notification.unread ? "bg-violet-50" : "bg-white"}
`}                    >
                      {notification.unread ? (
<div
className={`
w-2
h-2
rounded-full
mt-2

${notification.unread
? "bg-violet-500"
: "bg-transparent"}
`}
/>                      ) : (
                        <div className="w-2 h-2 shrink-0" /> // Spacer to preserve alignment
                      )}
                      <div className="flex flex-col text-left">
                        <h3 className="text-lg font-semibold text-slate-800">
    Notifications
</h3>
                        <span className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
                          {notification.description}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold mt-1">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-xs font-semibold">
                      No notifications
                    </div>
                  )}
                </div>

                {/* Footer */}
<div className="border-t border-slate-100 py-4 text-center">
                    <button 
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/notifications");
                    }}
                    className="text-[#9810FA] hover:opacity-90 font-bold text-xs inline-flex items-center gap-1 transition-opacity duration-200 cursor-pointer"
                  >
                    See all notifications &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Account Panel Profile Block */}
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => setIsAccountOpen((open) => !open)}
              className="flex items-center space-x-2.5 cursor-pointer group select-none focus:outline-none"
            >
              <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center text-white text-xs font-black tracking-tight shadow-2xs transition-transform duration-500 group-hover:scale-105">
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : "DU"}
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 hidden sm:inline max-w-[140px] truncate transition-colors duration-500">
                {currentUser ? currentUser.name : "Demo User"}
              </span>
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-[220px] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-50">
                <div className="px-4 py-4 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-900">{currentUser ? currentUser.name : "Demo User"}</p>
                  <p className="text-[11px] text-slate-500">{currentUser ? currentUser.email : "demo@gmail.com"}</p>
                </div>
                <div className="flex flex-col py-2">
                  <button
                    type="button"
                    className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate('/my-posts');
                    }}
                  >
                    My Posts
                  </button>
                  <button
                    type="button"
                    className="text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      setIsAccountOpen(false);
                      navigate('/admin/login');
                    }}
                  >
                    Admin Panel
                  </button>
                </div>
                <div className="px-4 py-3 border-t border-slate-100">
                  <button
                    type="button"
                    className="w-full text-left text-sm font-bold text-red-600 hover:bg-slate-50 px-3 py-2 rounded-xl transition-colors"
                    onClick={() => {
                      setIsAccountOpen(false);
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      navigate('/signin');
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Collapsible Mobile Menu */}
      <div className={`min-[1025px]:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[380px] border-t border-slate-100 py-3' : 'max-h-0'}`}>
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = targetTab === index;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path, index)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all focus:outline-none ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-50/70 to-indigo-50/70 text-indigo-600 border-l-4 border-indigo-600 pl-3' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600 border-l-4 border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
          {/* Mobile Action Controls */}
          <div className="pt-3 px-4 border-t border-slate-100 flex flex-col gap-3">
            <button onClick={() => setIsReportModalOpen(true)} className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/10 focus:outline-none">
              <HiPlus className="w-4 h-4 stroke-[3]" />
              <span>Create Post</span>
            </button>
          </div>
        </div>
      </div>
      {/* Report a Concern Modal */}
      {isReportModalOpen && (
        <ReportConcernModal
          onClose={() => setIsReportModalOpen(false)}
          refreshPosts={async () => {
            // Reload page dynamically to refresh post queries on feed page, homepage, or my-posts page
            window.location.reload();
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900/95 text-white text-xs font-semibold py-3.5 px-5 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xs border border-slate-800">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </header>
  );
}