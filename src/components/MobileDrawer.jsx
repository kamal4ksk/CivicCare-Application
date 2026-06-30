import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineMapPin,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { FiX } from 'react-icons/fi';

export default function MobileDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabClick,
}) {
  const navigate = useNavigate();
  const currentUser = React.useMemo(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  }, []);

  if (!isOpen) return null;

  const menuItems = [
    { name: 'Home', icon: HiOutlineHome, index: 0 },
    { name: 'Feed', icon: HiOutlineDocumentText, index: 1 },
    { name: 'Map', icon: HiOutlineMapPin, index: 3 },
    { name: 'Communities', icon: HiOutlineUsers, index: 4 },
    { name: 'Resources', icon: HiOutlineBookOpen, index: 5 },
  ];

  const handleNavigation = (index) => {
    if (onTabClick) {
      onTabClick(index);
      onClose();
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

      case 5:
        navigate('/resources');
        break;

      default:
        break;
    }

    onClose();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      'Are you sure you want to logout?'
    );

    if (confirmLogout) {
      onClose();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate('/signin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-start select-none">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="relative w-[290px] h-full bg-white flex flex-col justify-between shadow-2xl overflow-y-auto z-10">

        <div>

          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#155DFC] to-[#9810FA] flex items-center justify-center text-white text-xs font-black">
                CC
              </div>

              <span className="bg-gradient-to-r from-[#155DFC] to-[#9810FA] bg-clip-text text-transparent text-lg font-bold">
                CivicCare
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* User */}
          <div className="bg-slate-50 px-6 py-5 flex gap-3 border-b border-slate-100">
            <div className="w-11 h-11 rounded-full bg-[#7D5DF2] flex items-center justify-center text-white">
              <HiOutlineUser className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">{currentUser ? currentUser.name : "Fathima"}</h3>
              <p className="text-xs text-slate-400">
                {currentUser ? currentUser.email : "fathima@civiccare.local"}
              </p>

              <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-[#F2EFFF] text-[#7D5DF2] text-[10px] font-bold uppercase">
                {currentUser ? currentUser.role : "Citizen"}
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.index;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-[#155DFC] to-[#9810FA] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />

                  {item.name}
                </button>
              );
            })}

          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 space-y-1">

          {/* My Posts */}
          <button
            onClick={() => {
              onClose();
              navigate('/my-posts');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            <HiOutlineDocumentText className="w-5 h-5 text-slate-400" />
            My Posts
          </button>

          {/* Admin */}
          <button
            onClick={() => {
              onClose();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100"
          >
            <HiOutlineShieldCheck className="w-5 h-5 text-slate-400" />
            Admin Panel
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50"
          >
            <FiX className="w-5 h-5" />
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}