import { useNavigate } from 'react-router-dom';
import { AdminSidemenu } from '../components/admin/AdminSidemenu';

/**
 * AdminLayout — shared shell for all admin pages.
 * Wraps content with the sidebar (component 89).
 *
 * Props:
 *  - currentPage : string  — active nav item id passed to sidebar
 *  - onNavigate  : (page) => void  — called by sidebar nav clicks
 *  - children    : ReactNode
 */
export default function AdminLayout({ currentPage, onNavigate, children }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem('civiccare_admin') || '{"name":"Admin User","email":"admin@civiccare.com"}');

  const handleLogout = () => {
    sessionStorage.removeItem('civiccare_admin');
    navigate('/');
  };

  const handleBackToPortal = () => {
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidemenu
        currentPage={currentPage}
        onNavigate={onNavigate}
        currentUser={currentUser}
        whatsappBadgeCount={2}
        onBackToPortal={handleBackToPortal}
        onLogout={handleLogout}
      />
      <main className="flex-1 lg:ml-[280px] p-6 pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}