import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../components/admin/AdminLogin';

/**
 * AdminLoginPage — Route: /admin/login
 * Wraps component 88 (AdminLogin) and handles navigation on success.
 */
export default function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <AdminLogin
      onLoginSuccess={(adminUser) => {
        sessionStorage.setItem('civiccare_admin', JSON.stringify(adminUser));
        navigate('/admin');
      }}
      onBack={() => navigate('/')}
    />
  );
}
