import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Users, Ban } from 'lucide-react';
import { UsersList } from './UsersList';
import { UserDetails } from './UserDetails';
import { getAllUsers, toggleSuspendUser } from '../../services/adminService';
import { getAllPosts } from '../../services/postService';

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
const MOCK_CITIZENS = [
  {
    id: 'mock-1',
    _id: 'mock-1',
    name: 'John Citizen',
    email: 'john.citizen@email.com',
    phone: '+1 (555) 201-4567',
    joinDate: new Date('2026-01-10'),
    postsCount: 2,
    totalSpamReports: 0,
    role: 'user',
    isSuspended: false,
    location: 'New York, NY',
    posts: [
      { id: 'p1', title: 'Large pothole on Main Street causing accidents', status: 'pending', priority: 'high', location: 'Main Street & 5th Avenue', createdAt: new Date('2026-05-28'), likes: 45, comments: 12 },
      { id: 'p2', title: 'Streetlight not working on Elm Ave', status: 'in_progress', priority: 'medium', location: 'Elm Avenue & 3rd Street', createdAt: new Date('2026-06-01'), likes: 18, comments: 4 }
    ]
  },
  {
    id: 'mock-2',
    _id: 'mock-2',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 312-8890',
    joinDate: new Date('2026-02-12'),
    postsCount: 1,
    totalSpamReports: 0,
    role: 'user',
    isSuspended: false,
    location: 'Los Angeles, CA',
    posts: [
      { id: 'p3', title: 'Garbage not collected for 2 weeks', status: 'pending', priority: 'medium', location: 'Park Lane', createdAt: new Date('2026-06-03'), likes: 9, comments: 2 }
    ]
  },
  {
    id: 'mock-3',
    _id: 'mock-3',
    name: 'David Chen',
    email: 'david.chen@gmail.com',
    phone: '+1 (555) 487-2231',
    joinDate: new Date('2026-03-24'),
    postsCount: 1,
    totalSpamReports: 0,
    role: 'user',
    isSuspended: false,
    location: 'Chicago, IL',
    posts: [
      { id: 'p4', title: 'Water supply disruption', status: 'resolved', priority: 'high', location: 'Sector 4, Westside', createdAt: new Date('2026-06-05'), likes: 32, comments: 8 }
    ]
  },
  {
    id: 'mock-4',
    _id: 'mock-4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    phone: '+1 (555) 609-1120',
    joinDate: new Date('2026-04-18'),
    postsCount: 2,
    totalSpamReports: 1,
    role: 'user',
    isSuspended: false,
    location: 'Houston, TX',
    posts: [
      { id: 'p5', title: 'Corruption at permit office', status: 'pending', priority: 'high', location: 'City Municipal Office', createdAt: new Date('2026-06-08'), likes: 89, comments: 24 },
      { id: 'p6', title: 'Broken footpath near school', status: 'in_progress', priority: 'low', location: 'School Road, Block C', createdAt: new Date('2026-06-10'), likes: 14, comments: 3 }
    ]
  }
];

export function ManageUserPage({ posts: propPosts = [] }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const loadUsersAndPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const usersRes = await getAllUsers(token);
      const dbUsers = usersRes.data;
      
      const postsRes = await getAllPosts();
      const dbPosts = postsRes.data;

      const mappedUsers = dbUsers.map((user, index) => {
        const userPosts = dbPosts.filter(
          (p) => p.userId?._id === user._id || p.userId === user._id
        );
        const totalSpam = userPosts.reduce((sum, p) => sum + (p.spamReports ?? 0), 0);
        
        return {
          id: user._id,
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || mockPhones[index % mockPhones.length],
          joinDate: new Date(user.createdAt),
          postsCount: userPosts.length,
          totalSpamReports: totalSpam,
          role: user.role,
          isSuspended: user.isSuspended,
          location: user.location || mockLocations[index % mockLocations.length],
          posts: userPosts.map(p => ({
            id: p._id,
            title: p.title,
            status: p.status === 'Ongoing' ? 'in_progress' : p.status.toLowerCase(),
            priority: p.priority.toLowerCase(),
            location: p.location,
            createdAt: new Date(p.createdAt),
            likes: p.likes ? p.likes.length : 0,
            comments: p.commentsCount || 0
          }))
        };
      });

      const allUsers = [
        ...mappedUsers,
        ...MOCK_CITIZENS.filter(mock => !mappedUsers.some(db => db.name.toLowerCase() === mock.name.toLowerCase()))
      ];

      const currentUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("civiccare_admin") || "{}");
      if (currentUser.name && !allUsers.some(u => u.name.toLowerCase() === currentUser.name.toLowerCase() || u.email.toLowerCase() === currentUser.email.toLowerCase())) {
        allUsers.unshift({
          id: currentUser._id || 'current-user-id',
          _id: currentUser._id || 'current-user-id',
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone || '+1 (555) 777-9999',
          joinDate: currentUser.createdAt ? new Date(currentUser.createdAt) : new Date(),
          postsCount: dbPosts.filter(p => p.userId?._id === currentUser._id || p.userId === currentUser._id).length,
          totalSpamReports: 0,
          role: currentUser.role || 'admin',
          isSuspended: false,
          location: currentUser.location || 'City-wide',
          posts: dbPosts.filter(p => p.userId?._id === currentUser._id || p.userId === currentUser._id).map(p => ({
            id: p._id,
            title: p.title,
            status: p.status === 'Ongoing' ? 'in_progress' : p.status.toLowerCase(),
            priority: p.priority.toLowerCase(),
            location: p.location,
            createdAt: new Date(p.createdAt),
            likes: p.likes ? p.likes.length : 0,
            comments: p.commentsCount || 0
          }))
        });
      }

      setUsers(allUsers);
    } catch (error) {
      console.error("Failed to load users in admin dashboard", error);
      setUsers(MOCK_CITIZENS);
    }
  };

  useEffect(() => {
    loadUsersAndPosts();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId) ?? null;
  const displayUser = selectedUser ?? (users.length > 0 ? users[0] : null);

  const handleSuspendToggle = async (user) => {
    try {
      const token = localStorage.getItem("token");
      await toggleSuspendUser(user.id, token);
      loadUsersAndPosts();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to toggle suspension");
    }
  };

  const suspendedCount = users.filter(u => u.isSuspended).length;

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
            <span className="text-sm font-semibold text-red-500">{suspendedCount} Suspended</span>
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
              user={displayUser ? { ...displayUser, isSuspended: displayUser.isSuspended } : null}
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