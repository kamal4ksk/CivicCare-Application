
import { Crown, UserMinus } from 'lucide-react';

/**
 * Component 126 - Admin Member Data
 * Reusable row item shown inside the Community Members modal (125).
 *
 * Props:
 *  - member: { id, name, email, isAdmin, joinedAt }
 *  - onRemove: (memberId) => void
 */
export function AdminMemberData({ member, onRemove }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
        {member.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-gray-900 truncate">{member.name}</p>
          {member.isAdmin && <Crown className="w-3.5 h-3.5 text-amber-500" />}
        </div>
        <p className="text-xs text-gray-500 truncate">{member.email}</p>
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0">
        {new Date(member.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
      </span>
      {!member.isAdmin && (
        <button
          onClick={() => onRemove?.(member.id)}
          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
          title="Remove member"
        >
          <UserMinus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default AdminMemberData;
