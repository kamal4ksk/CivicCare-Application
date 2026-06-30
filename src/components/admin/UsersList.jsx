import { Search } from 'lucide-react';
import { UsersInfoCard } from './UsersInfocard';

/**
 * Component 97 - Users List
 * Left-hand "All Users" list with search, used in the Manage User page (96).
 *
 * Props:
 *  - users: array of user objects (see 98_UsersInfoCard for shape)
 *  - searchQuery: string
 *  - onSearchChange: (value) => void
 *  - selectedUserId: string | null
 *  - onSelectUser: (user) => void
 */
export function UsersList({ users = [], searchQuery, onSearchChange, selectedUserId, onSelectUser }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">All Users ({users.length})</h2>
      <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
        {users.map((user, i) => (
          <UsersInfoCard
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onClick={() => onSelectUser?.(user)}
            delay={i * 0.04}
          />
        ))}
        {users.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No users found</p>
        )}
      </div>
    </div>
  );
}

export default UsersList;