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

function App() {
  return (
    <Routes>
      {/* Root/Landing and Auth Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Main App Routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/communities" element={<CommunityPage />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/resources" element={<ResourcePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
      <Route path="/admin/communities" element={<AdminCommunitiesPage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />
      <Route path="/admin/articles" element={<AdminArticlesPage />} />
      <Route path="/admin/whatsapp" element={<AdminWhatsAppPage />} />

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