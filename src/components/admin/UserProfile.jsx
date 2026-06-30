import { Ban, Shield } from 'lucide-react';

/**
 * Component 100 - User Profile
 * Profile header block shown at the top of "User Details" (99).
 *
 * Props:
 *  - user: { name, email, phone, isSuspended, role }
 */
export function UserProfile({ user }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl ${user.isSuspended ? 'bg-red-50 border border-red-200' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 ${user.isSuspended ? 'bg-gray-400' : 'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          {user.isSuspended && (
            <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-semibold flex items-center gap-1">
              <Ban className="w-3 h-3" /> Suspended
            </span>
          )}
          {user.role === 'admin' && (
            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" /> Admin
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500">{user.phone}</p>
      </div>
    </div>
  );
}

export default UserProfile;