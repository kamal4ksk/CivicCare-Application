import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { AdminCommunitySummary } from './AdminCommunitysummary';
import { AdminCommunityList } from './AdminCommunitylist';
import { AdminCommunityMembersModal } from './AdminCommunitymembers';
import { AdminCreateCommunityModal } from './AdminCreatecommunity';
import { AdminEditCommunityModal } from './AdminEditCommunity';

const CATEGORY_OPTIONS = [
  'All Categories', 'General', 'Roads', 'Water',
  'Electricity', 'Environment', 'Safety', 'Infrastructure',
];

/**
 * Component 122 - Admin All Communities (page)
 * Matches image 2: table layout, pill status filter, category dropdown.
 */
export function AdminAllCommunitiesPage({ initialCommunities = exampleCommunities }) {
  const [communities, setCommunities] = useState(initialCommunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All');   // 'All' | 'Active' | 'Inactive'
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [membersCommunity, setMembersCommunity] = useState(null);

  const filtered = communities.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.creator || '').toLowerCase().includes(q);
    const matchesCategory =
      categoryFilter === 'All Categories' || c.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && c.isActive) ||
      (statusFilter === 'Inactive' && !c.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreate = (community) => {
    setCommunities((prev) => [
      {
        ...community,
        id: `comm-${Date.now()}`,
        creator: 'Admin User',
        isActive: true,
        createdAt: new Date(),
        membersCount: 1,
        members: [{
          id: `m-${Date.now()}`,
          name: 'Admin User',
          email: 'admin@civiccare.com',
          isAdmin: true,
          joinedAt: new Date(),
        }],
      },
      ...prev,
    ]);
  };

  const handleUpdate = (id, updates) => {
    setCommunities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleDelete = (id) => {
    setCommunities((prev) => prev.filter((c) => c.id !== id));
  };

  const handleRemoveMember = (communityId, memberId) => {
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId
          ? {
              ...c,
              members: c.members.filter((m) => m.id !== memberId),
              membersCount: c.membersCount - 1,
            }
          : c
      )
    );
    setMembersCommunity((prev) =>
      prev?.id === communityId
        ? { ...prev, members: prev.members.filter((m) => m.id !== memberId) }
        : prev
    );
  };

  const STATUS_PILLS = ['All', 'Active', 'Inactive'];

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Communities</h1>
          <p className="text-gray-500 mt-1 text-sm">Create, edit, and moderate citizen communities</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600
            text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Community
        </button>
      </div>

      {/* ── Summary cards (120/121) ────────────────────────── */}
      <AdminCommunitySummary communities={communities} />

      {/* ── Search + Filters ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, description, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Category dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700
            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-w-[160px]"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Status pill toggle */}
        <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
          {STATUS_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => setStatusFilter(pill)}
              className={`px-4 py-2.5 text-sm font-semibold transition-all ${
                statusFilter === pill
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* ── Community table (123, uses 124) ────────────────── */}
      <AdminCommunityList
        communities={filtered}
        onEdit={setEditingCommunity}
        onDelete={handleDelete}
        onViewMembers={setMembersCommunity}
      />

      {/* ── Modals ─────────────────────────────────────────── */}
      <AdminCreateCommunityModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <AdminEditCommunityModal
        isOpen={!!editingCommunity}
        community={editingCommunity}
        onClose={() => setEditingCommunity(null)}
        onSubmit={handleUpdate}
      />
      <AdminCommunityMembersModal
        isOpen={!!membersCommunity}
        community={membersCommunity}
        onClose={() => setMembersCommunity(null)}
        onRemoveMember={handleRemoveMember}
      />
    </div>
  );
}

export default AdminAllCommunitiesPage;

// ── Richer mock data (matches image 2 style) ──────────────────────────────
export const exampleCommunities = [
  {
    id: 'comm-1',
    name: 'Green Valley Residents',
    emoji: '🏘️',
    cover: 'from-violet-500 to-indigo-600',
    description: 'A community for residents of Green Valley to discuss local civic issues and improvements.',
    creator: 'Sarah Johnson',
    category: 'General',
    location: 'Green Valley, NY',
    createdAt: new Date('2026-01-10'),
    isActive: true,
    isPrivate: false,
    membersCount: 4,
    members: [
      { id: 'm1', name: 'Sarah Johnson', email: 'sarah@email.com', isAdmin: true,  joinedAt: new Date('2026-01-10') },
      { id: 'm2', name: 'James Park',    email: 'james@email.com', isAdmin: false, joinedAt: new Date('2026-01-15') },
      { id: 'm3', name: 'Maria Garcia',  email: 'maria@email.com', isAdmin: false, joinedAt: new Date('2026-02-01') },
      { id: 'm4', name: 'Tom Hill',      email: 'tom@email.com',   isAdmin: false, joinedAt: new Date('2026-02-10') },
    ],
  },
  {
    id: 'comm-2',
    name: 'Clean City Initiative',
    emoji: '🌿',
    cover: 'from-green-500 to-emerald-600',
    description: 'Focused on environmental cleanliness and waste management across downtown.',
    creator: 'Michael Lee',
    category: 'Environment',
    location: 'Downtown, NY',
    createdAt: new Date('2026-02-05'),
    isActive: true,
    isPrivate: false,
    membersCount: 2,
    members: [
      { id: 'm5', name: 'Michael Lee', email: 'michael@email.com', isAdmin: true,  joinedAt: new Date('2026-02-05') },
      { id: 'm6', name: 'Ana Lopez',   email: 'ana@email.com',     isAdmin: false, joinedAt: new Date('2026-02-20') },
    ],
  },
  {
    id: 'comm-3',
    name: 'Road Safety Watch',
    emoji: '🚧',
    cover: 'from-orange-500 to-red-500',
    description: 'Tracking road maintenance issues and advocating for safer streets city-wide.',
    creator: 'David Chen',
    category: 'Infrastructure',
    location: 'City-wide',
    createdAt: new Date('2026-03-12'),
    isActive: true,
    isPrivate: false,
    membersCount: 3,
    members: [
      { id: 'm7', name: 'David Chen',  email: 'david@email.com',  isAdmin: true,  joinedAt: new Date('2026-03-12') },
      { id: 'm8', name: 'Jane Smith',  email: 'jane@email.com',   isAdmin: false, joinedAt: new Date('2026-03-15') },
      { id: 'm9', name: 'Mark Taylor', email: 'mark@email.com',   isAdmin: false, joinedAt: new Date('2026-03-20') },
    ],
  },
  {
    id: 'comm-4',
    name: 'Anti-Corruption Forum',
    emoji: '🛡️',
    cover: 'from-pink-500 to-rose-600',
    description: 'Citizens united against bribery and corruption at city municipal offices.',
    creator: 'Aisha Patel',
    category: 'Safety',
    location: 'City Municipal Area',
    createdAt: new Date('2026-04-01'),
    isActive: true,
    isPrivate: true,
    membersCount: 2,
    members: [
      { id: 'm10', name: 'Aisha Patel', email: 'aisha@email.com', isAdmin: true,  joinedAt: new Date('2026-04-01') },
      { id: 'm11', name: 'Sam Rivera',  email: 'sam@email.com',   isAdmin: false, joinedAt: new Date('2026-04-10') },
    ],
  },
];