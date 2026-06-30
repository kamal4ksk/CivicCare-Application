import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Users, Ban } from 'lucide-react';
import { UsersList } from './UsersList';
import { UserDetails } from './UserDetails';

const mockPhones = [
  '+1 (555) 201-4567', '+1 (555) 312-8890', '+1 (555) 487-2231',
  '+1 (555) 609-1120', '+1 (555) 734-9987', '+1 (555) 852-3345',
];
const mockLocations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL',
  'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA',
];

/**
 * Component 96 - Manage User Page
 * Composes UsersList (97) and UserDetails (99).
 *
 * Props:
 *  - posts: array of posts from all users
 */
export function ManageUserPage({ posts = [] }) {
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [suspendedUsers, setSuspendedUsers] = useState(new Set());

  // Build unique users from posts
  const authors = Array.from(new Set(posts.map((p) => p.author)));

  const users = authors.map((author, index) => {
    const userPosts   = posts.filter((p) => p.author === author);
    const totalSpam   = userPosts.reduce((sum, p) => sum + (p.spamReports ?? 0), 0);
    const id          = `user-${index}`;
    return {
      id,
      name:             author,
      email:            `${author.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone:            mockPhones[index % mockPhones.length],
      joinDate:         new Date(2026, 0, 10 + index * 12),
      postsCount:       userPosts.length,
      totalSpamReports: totalSpam,
      role:             'user',
      isSuspended:      suspendedUsers.has(id),
      location:         mockLocations[index % mockLocations.length],
      posts:            userPosts,
    };
  });

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? null;

  // Auto-select first user if none selected and list has users
  const displayUser = selectedUser ?? (users.length > 0 ? users[0] : null);

  const handleSuspendToggle = (user) => {
    setSuspendedUsers((prev) => {
      const next = new Set(prev);
      next.has(user.id) ? next.delete(user.id) : next.add(user.id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1 text-sm">View, monitor, and manage all registered citizens</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">{users.length} Users</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl">
            <Ban className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-red-500">{suspendedUsers.size} Suspended</span>
          </div>
        </div>
      </div>

      {/* ── Content grid ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Users List — col 2 */}
        <div className="lg:col-span-2">
          <UsersList
            users={filteredUsers}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedUserId={selectedUserId ?? displayUser?.id ?? null}
            onSelectUser={(user) => setSelectedUserId(user.id)}
          />
        </div>

        {/* User Details — col 3 */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-5">User Details</h2>
          <AnimatePresence mode="wait">
            <UserDetails
              key={displayUser?.id || 'empty'}
              user={displayUser ? { ...displayUser, isSuspended: suspendedUsers.has(displayUser.id) } : null}
              onSuspendToggle={handleSuspendToggle}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ManageUserPage;

// ── Richer mock data — multiple posts per user ──────────────────────────────
export const examplePosts = [
  {
    id: 'p1', title: 'Large pothole on Main Street causing accidents',
    author: 'John Citizen', status: 'pending', priority: 'high',
    description: 'There is a dangerous pothole near the intersection that has caused multiple vehicle damages.',
    location: 'Main Street & 5th Avenue',
    likes: 45, comments: 12, category: 'pothole', spamReports: 2,
    createdAt: new Date('2026-05-28'),
  },
  {
    id: 'p2', title: 'Streetlight not working on Elm Ave',
    author: 'John Citizen', status: 'in_progress', priority: 'medium',
    description: 'The streetlight at the corner of Elm Ave has been off for two weeks.',
    location: 'Elm Avenue & 3rd Street',
    likes: 18, comments: 4, category: 'electricity', spamReports: 0,
    createdAt: new Date('2026-06-01'),
  },
  {
    id: 'p3', title: 'Garbage not collected for 2 weeks',
    author: 'Maria Garcia', status: 'pending', priority: 'medium',
    description: 'Garbage bins overflowing for several days on our street.',
    location: 'Park Lane',
    likes: 9, comments: 2, category: 'garbage', spamReports: 0,
    createdAt: new Date('2026-06-03'),
  },
  {
    id: 'p4', title: 'Water supply disruption',
    author: 'David Chen', status: 'resolved', priority: 'high',
    description: 'No water supply for 3 days in the residential block.',
    location: 'Sector 4, Westside',
    likes: 32, comments: 8, category: 'water', spamReports: 0,
    createdAt: new Date('2026-06-05'),
  },
  {
    id: 'p5', title: 'Corruption at permit office',
    author: 'Sarah Johnson', status: 'pending', priority: 'high',
    description: 'Officials demanding bribe for building permits.',
    location: 'City Municipal Office',
    likes: 89, comments: 24, category: 'bribe', spamReports: 1,
    createdAt: new Date('2026-06-08'),
  },
  {
    id: 'p6', title: 'Broken footpath near school',
    author: 'Sarah Johnson', status: 'in_progress', priority: 'low',
    description: 'Broken tiles on footpath creating safety hazard for children.',
    location: 'School Road, Block C',
    likes: 14, comments: 3, category: 'pothole', spamReports: 0,
    createdAt: new Date('2026-06-10'),
  },
  {
    id: 'p7', title: 'Pothole near bus stop',
    author: 'Mike Wilson', status: 'pending', priority: 'medium',
    description: 'Deep pothole near the main bus stop causing accidents.',
    location: 'Bus Stop 12, Main Road',
    likes: 22, comments: 5, category: 'pothole', spamReports: 1,
    createdAt: new Date('2026-06-12'),
  },
];