import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { ArticleManagementPage } from '../components/admin/ArticleManagement';

/**
 * Route: /admin/articles
 * Renders the Article Management page inside the shared AdminLayout (sidebar).
 */
export default function AdminArticlesPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="articles" onNavigate={handleNavigate}>
      <ArticleManagementPage />
    </AdminLayout>
  );
}