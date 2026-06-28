import { Routes, Route, Navigate } from "react-router-dom";
import FeedsPage from "./pages/FeedPage";
import MapPage from "./pages/MapPage";
import CommunityPage from "./pages/CommunityPage";
import MyPostsPage from "./pages/MyPostsPage";
import ResourcePage from "./pages/ResourcePage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/MapPage" replace />} />
      <Route path="/home" element={<Navigate to="/MapPage" replace />} />
      <Route path="/MapPage" element={<MapPage />} />
      <Route path="/feedPage" element={<FeedsPage />} />
      <Route path="/CommunityPage" element={<CommunityPage />} />
      <Route path="/MyPosts" element={<MyPostsPage />} />
      <Route path="/ResourcePage" element={<ResourcePage />} />
      <Route path="/NotificationsPage" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/MapPage" replace />} />
    </Routes>
  );
}

export default App;