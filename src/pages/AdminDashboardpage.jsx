import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { AdminDashboard, examplePosts } from '../components/admin/AdminDashboard';

/**
 * Route: /admin/dashboard
 * Renders the Admin Dashboard inside the shared AdminLayout (sidebar).
 */
export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="dashboard" onNavigate={handleNavigate}>
      <AdminDashboard posts={examplePosts} onNavigate={handleNavigate} />
    </AdminLayout>
  );
}