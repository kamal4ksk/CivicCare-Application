import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

/**
 * Component 98 - Users Info Card
 * Single user row in the All Users list (image 2 style).
 * Shows avatar, name, email, and post count badge only.
 *
 * Props:
 *  - user: { id, name, email, postsCount, isSuspended, role }
 *  - isSelected: boolean
 *  - onClick: () => void
 *  - delay?: number
 */
export function UsersInfoCard({ user, isSelected, onClick, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border ${
        isSelected
          ? 'border-blue-400 bg-blue-50/60 shadow-sm'
          : 'border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-gray-200'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
          user.isSuspended
            ? 'bg-gray-400'
            : 'bg-gradient-to-br from-violet-500 to-indigo-500'
        }`}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Name + email */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
        <p className="text-xs text-gray-400 truncate">{user.email}</p>
      </div>

      {/* Post count badge only (matching image 2) */}
      <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg flex-shrink-0">
        <FileText className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-xs font-semibold text-blue-600">{user.postsCount}</span>
      </div>
    </motion.div>
  );
}

export default UsersInfoCard;