import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { WhatsAppCenter } from '../components/admin/WhatsappCenter';

/**
 * Route: /admin/whatsapp
 * Renders the WhatsApp Center inside the shared AdminLayout (sidebar).
 */
export default function AdminWhatsAppPage() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === 'home') { navigate('/home'); return; }
    navigate(`/admin/${page}`);
  };

  return (
    <AdminLayout currentPage="whatsapp" onNavigate={handleNavigate}>
      <WhatsAppCenter />
    </AdminLayout>
  );
}