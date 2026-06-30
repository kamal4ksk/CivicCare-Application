import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { CategoryManagementPage } from '../components/admin/CategoryManagement';

/**
 * Route: /admin/categories
 * Renders the Category Management page inside the shared AdminLayout (sidebar).
 */
export default function AdminCategoriesPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="categories" onNavigate={handleNavigate}>
      <CategoryManagementPage />
    </AdminLayout>
  );
}