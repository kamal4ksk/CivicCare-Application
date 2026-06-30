import { Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { AdminRecentPosts } from './AdminRecentposts';
import { QuickActions } from './QuickActions';

/**
 * Component 90 - Admin Dashboard
 * Top-level page that composes 91 (DashboardCard), 92 (AdminRecentPosts),
 * 93 (RecentPostCard, used inside 92), 94 (QuickActions), and 95 (QuickActionButton, used inside 94).
 *
 * Props:
 *  - posts: array of { id, title, author, status, createdAt }
 *  - totalUsers?: number (default mock value)
 *  - onNavigate?: (page) => void  used by Quick Actions
 */
export function AdminDashboard({ posts = [], totalUsers = 156, onNavigate }) {
  const totalPosts = posts.length;
  const pendingPosts = posts.filter((p) => p.status === 'pending').length;
  const resolvedPosts = posts.filter((p) => p.status === 'resolved').length;

  const stats = [
    { label: 'Total Users', value: totalUsers, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Posts', value: totalPosts, icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Issues', value: pendingPosts, icon: AlertTriangle, color: 'from-orange-500 to-orange-600' },
    { label: 'Resolved Issues', value: resolvedPosts, icon: CheckCircle, color: 'from-green-500 to-green-600' },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of CivicCare platform statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <DashboardCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            delay={i * 0.1}
          />
        ))}
      </div>

      {/* Recent Posts */}
      <AdminRecentPosts posts={recentPosts} />

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
}

export default AdminDashboard;

// --- Example usage / mock data --------------------------------------------
export const examplePosts = [
  { id: '1', title: 'Pothole on Main Street', author: 'John Citizen', status: 'pending', createdAt: new Date('2026-06-01') },
  { id: '2', title: 'Streetlight not working', author: 'Maria Garcia', status: 'in_progress', createdAt: new Date('2026-06-02') },
  { id: '3', title: 'Garbage not collected', author: 'David Chen', status: 'resolved', createdAt: new Date('2026-06-03') },
  { id: '4', title: 'Water leakage near park', author: 'Sarah Johnson', status: 'pending', createdAt: new Date('2026-06-04') },
  { id: '5', title: 'Broken footpath tiles', author: 'Mike Wilson', status: 'resolved', createdAt: new Date('2026-06-05') },
];