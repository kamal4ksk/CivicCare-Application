import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, ChevronUp, Edit2, Trash2,
  Lock, Globe, MapPin, Calendar, Eye
} from 'lucide-react';
import { AdminCommunityInfo } from './AdminCommunityinfo';

/**
 * Component 123 - Admin Community List
 * Full table layout: COMMUNITY | CATEGORY | MEMBERS | STATUS | ACTIONS
 * Matches image 2 design exactly.
 *
 * Props:
 *  - communities: array of community objects
 *  - onEdit: (community) => void
 *  - onDelete: (id) => void
 *  - onViewMembers: (community) => void
 */
export function AdminCommunityList({ communities = [], onEdit, onDelete, onViewMembers }) {
  const [expandedId, setExpandedId] = useState(null);

  if (communities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <p className="text-gray-400 text-sm">No communities found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200">
        {['COMMUNITY', 'CATEGORY', 'MEMBERS', 'STATUS', 'ACTIONS'].map((col) => (
          <p key={col} className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            {col}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {communities.map((community, i) => {
          const isExpanded = expandedId === community.id;
          const previewMembers = community.members?.slice(0, 3) ?? [];
          const extraCount = (community.membersCount ?? 0) - previewMembers.length;

          return (
            <motion.div
              key={community.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {/* Main row */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">

                {/* COMMUNITY col */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${community.cover} flex items-center justify-center text-xl flex-shrink-0`}>
                    {community.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-900 text-sm truncate">{community.name}</p>
                      {community.isPrivate ? (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                          <Lock className="w-3 h-3" /> Private
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                          <Globe className="w-3 h-3" /> Public
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      {community.location && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="w-3 h-3" />{community.location}
                        </span>
                      )}
                      {community.createdAt && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CATEGORY col */}
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="text-gray-400">#</span>
                  {community.category}
                </div>

                {/* MEMBERS col */}
                <div className="flex items-center gap-2">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2">
                    {previewMembers.map((m) => (
                      <div
                        key={m.id}
                        title={m.name}
                        className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        style={{ background: stringToGradient(m.name) }}
                      >
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {community.membersCount ?? community.members?.length ?? 0}
                  </span>
                </div>

                {/* STATUS col */}
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    community.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${community.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {community.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* ACTIONS col */}
                <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : community.id)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Expand"
                  >
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4" />
                      : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onViewMembers?.(community)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Members"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit?.(community)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete?.(community.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <AdminCommunityInfo
                      community={community}
                      onViewMembers={() => onViewMembers?.(community)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Generate a consistent color for each member avatar based on their name
function stringToGradient(str = '') {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default AdminCommunityList;