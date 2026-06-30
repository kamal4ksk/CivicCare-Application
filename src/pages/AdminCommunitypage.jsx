import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { AdminAllCommunitiesPage } from '../components/admin/AdminAllcommunities';

/**
 * Route: /admin/communities
 * Renders the Community Management page inside the shared AdminLayout (sidebar).
 */
export default function AdminCommunitiesPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="communities" onNavigate={handleNavigate}>
      <AdminAllCommunitiesPage />
    </AdminLayout>
  );
}