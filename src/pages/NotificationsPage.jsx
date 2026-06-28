import React, { useState, useEffect } from "react";
import { HiOutlineChatBubbleLeft, HiOutlineHeart } from "react-icons/hi2";
import UserHeader from "../components/UserHeader";
import { getNotifications, saveNotifications } from "../utils/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleUpdate = () => {
      setNotifications(getNotifications());
    };
    window.addEventListener("notifications_updated", handleUpdate);
    return () => {
      window.removeEventListener("notifications_updated", handleUpdate);
    };
  }, []);

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, unread: false }));
    setNotifications(updated);
    saveNotifications(updated);
  };

  const markSingleRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    );
    setNotifications(updated);
    saveNotifications(updated);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => n.unread);

  return (
    <div className="min-h-screen bg-[#f7f5fb] pb-12 font-sans antialiased">
      <UserHeader />
      
      <main className="mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full max-w-[1180px]">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Notifications</h1>
            <p className="text-slate-500 text-xs mt-1.5 font-medium">
              You have <span className="text-[#9810FA] font-bold">{unreadCount}</span> unread notifications
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#9810FA] transition-colors duration-200 cursor-pointer self-start sm:self-auto focus:outline-none"
            >
              <svg className="w-4 h-4 stroke-slate-700 hover:stroke-[#9810FA]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 7 17l-5-5"/>
                <path d="m22 10-7.5 7.5-3.5-3.5"/>
              </svg>
              Mark all as read
            </button>
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex gap-6 border-b border-slate-200/60 pb-0 mt-8 mb-6 relative">
          <button 
            onClick={() => setActiveTab("all")}
            className={`pb-2.5 text-xs font-bold transition-all relative cursor-pointer focus:outline-none ${
              activeTab === "all" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            All ({notifications.length})
            {activeTab === "all" && (
              <div className="absolute bottom-[-1.5px] left-0 right-0 h-[2.5px] bg-[#9810FA] rounded-full animate-in fade-in zoom-in-95 duration-150" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab("unread")}
            className={`pb-2.5 text-xs font-bold transition-all relative cursor-pointer focus:outline-none ${
              activeTab === "unread" ? "text-slate-800" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Unread ({unreadCount})
            {activeTab === "unread" && (
              <div className="absolute bottom-[-1.5px] left-0 right-0 h-[2.5px] bg-[#9810FA] rounded-full animate-in fade-in zoom-in-95 duration-150" />
            )}
          </button>
        </div>

        {/* List of Notification Cards */}
        <div className="flex flex-col gap-4">
          {filteredNotifications.map(notification => {
            const Icon = notification.type === "comment" ? HiOutlineChatBubbleLeft : HiOutlineHeart;
            const iconBg = notification.type === "comment" ? "bg-[#E5F0FF] text-[#155DFC]" : "bg-[#FFE8EC] text-[#EA4335]";
            
            return (
              <div 
                key={notification.id}
                onClick={() => markSingleRead(notification.id)}
                className="flex items-center justify-between p-5 bg-[#EEECF5]/35 hover:bg-[#EEECF5]/55 border border-slate-200/50 rounded-[20px] transition-all duration-300 cursor-pointer group shadow-xs"
              >
                <div className="flex gap-4 items-center">
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-bold text-slate-800 group-hover:text-[#9810FA] transition-colors duration-200">
                      {notification.title}
                    </span>
                    <span className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {notification.description}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1.5">
                      {notification.time}
                    </span>
                  </div>
                </div>

                {/* Right Side: Unread Dot Indicator */}
                {notification.unread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2 shrink-0 shadow-xs" />
                )}
              </div>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-[24px] shadow-sm flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              <span className="text-sm font-bold text-slate-700">All caught up!</span>
              <span className="text-xs text-slate-400 font-medium">You have no new notifications.</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
