import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, MessageCircle, BookOpen,
  Menu, X, Tag, Globe2, ArrowLeft, LogOut
} from 'lucide-react';
import { useState } from 'react';

/**
 * Component 89 - Admin Sidemenu (Sidebar Navigation)
 *
 * Props:
 *  - currentPage: 'dashboard' | 'users' | 'whatsapp' | 'articles' | 'categories' | 'communities'
 *  - onNavigate: (page) => void
 *  - currentUser: { name, email, avatar? } | null
 *  - whatsappBadgeCount?: number
 *  - onBackToPortal?: () => void
 *  - onLogout?: () => void
 */
export function AdminSidemenu({
  currentPage,
  onNavigate,
  currentUser,
  whatsappBadgeCount = 0,
  onBackToPortal,
  onLogout,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard',   label: 'Dashboard',           icon: LayoutDashboard },
    { id: 'users',       label: 'User Management',     icon: Users },
    { id: 'whatsapp',    label: 'WhatsApp Center',     icon: MessageCircle, badge: whatsappBadgeCount },
    { id: 'articles',    label: 'Articles',            icon: BookOpen },
    { id: 'categories',  label: 'Categories',          icon: Tag },
    { id: 'communities', label: 'Communities',         icon: Globe2 },
  ];

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-200 z-50 flex flex-col
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform lg:transition-none`}
      >

        {/* ── TOP: Logo + Admin user card ─────────────────── */}
        <div className="p-5 border-b border-gray-100">
          {/* Logo row */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-extrabold text-white">CC</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Admin Panel</p>
            </div>
          </div>

          {/* Admin user card */}
          {currentUser && (
            <div className="bg-indigo-50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name}
                      className="w-full h-full rounded-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-600 border border-blue-100">
                Administrator
              </span>
            </div>
          )}
        </div>

        {/* ── MIDDLE: Nav items ────────────────────────────── */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const hasBadge = item.badge && item.badge > 0;

            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md shadow-violet-200'
                    : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700'
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <Icon className="w-5 h-5" />
                  {hasBadge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm flex-1">{item.label}</span>
                {hasBadge && (
                  <span className="px-2 py-0.5 bg-red-500 rounded-full text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* ── BOTTOM: Back to portal + Logout ─────────────── */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <button
            onClick={onBackToPortal}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-blue-600 hover:bg-blue-50 transition-all text-left"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold text-sm">Back to User Portal</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all text-left"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>

      </aside>
    </>
  );
}

export default AdminSidemenu;