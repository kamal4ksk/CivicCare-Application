import { motion, AnimatePresence } from 'motion/react';
import { X, Users } from 'lucide-react';
import { AdminMemberData } from './AdminMemberdata';

/**
 * Component 125 - Admin Community Members Modal
 * Shows the member list (126) for a selected community.
 *
 * Props:
 *  - isOpen: boolean
 *  - community: { id, name, members: array } | null
 *  - onClose: () => void
 *  - onRemoveMember: (communityId, memberId) => void
 */
export function AdminCommunityMembersModal({ isOpen, community, onClose, onRemoveMember }) {
  return (
    <AnimatePresence>
      {isOpen && community && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden border border-gray-200 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-900">{community.name} — Members ({community.members.length})</h3>
              </div>
              <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2">
              {community.members.map((member) => (
                <AdminMemberData
                  key={member.id}
                  member={member}
                  onRemove={(memberId) => onRemoveMember?.(community.id, memberId)}
                />
              ))}
              {community.members.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No members yet</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AdminCommunityMembersModal;
