import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { ManageUserPage, examplePosts } from '../components/admin/ManageUserpage';

/**
 * Route: /admin/users
 * Renders the User Management page inside the shared AdminLayout (sidebar).
 */
export default function AdminUsersPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="users" onNavigate={handleNavigate}>
      <ManageUserPage posts={examplePosts} />
    </AdminLayout>
  );
}