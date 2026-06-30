import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";  
import FeedPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import CommunityPage from "./pages/CommunityPage";
import MyPosts from "./pages/MyPosts";
import ResourcePage from "./pages/ResourcePage";
import NotificationsPage from "./pages/NotificationsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

// Admin imports
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardpage";
import AdminUsersPage from "./pages/AdminUsermanagepage";
import AdminCommunitiesPage from "./pages/AdminCommunitypage";
import AdminCategoriesPage from "./pages/AdminCategoriespage";
import AdminArticlesPage from "./pages/AdminArticlepage";
import AdminWhatsAppPage from "./pages/AdminWhatsapppage";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const adminSession = sessionStorage.getItem("civiccare_admin");
  if (!adminSession) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function AdminIndexRoute() {
  const adminSession = sessionStorage.getItem("civiccare_admin");
  if (adminSession) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <Routes>
      {/* Root/Landing and Auth Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Main App Routes */}
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
      <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
      <Route path="/communities" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
      <Route path="/my-posts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcePage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminIndexRoute />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
      <Route path="/admin/communities" element={<AdminRoute><AdminCommunitiesPage /></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><AdminCategoriesPage /></AdminRoute>} />
      <Route path="/admin/articles" element={<AdminRoute><AdminArticlesPage /></AdminRoute>} />
      <Route path="/admin/whatsapp" element={<AdminRoute><AdminWhatsAppPage /></AdminRoute>} />

      {/* Legacy Capitalized Routes Compatibility Redirects */}
      <Route path="/LandingPage" element={<Navigate to="/" replace />} />
      <Route path="/HomePage" element={<Navigate to="/home" replace />} />
      <Route path="/MapPage" element={<Navigate to="/map" replace />} />
      <Route path="/FeedPage" element={<Navigate to="/feed" replace />} />
      <Route path="/FeedsPage" element={<Navigate to="/feed" replace />} />
      <Route path="/CommunityPage" element={<Navigate to="/communities" replace />} />
      <Route path="/MyPosts" element={<Navigate to="/my-posts" replace />} />
      <Route path="/ResourcePage" element={<Navigate to="/resources" replace />} />
      <Route path="/NotificationsPage" element={<Navigate to="/notifications" replace />} />

      {/* Default Catch-All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;