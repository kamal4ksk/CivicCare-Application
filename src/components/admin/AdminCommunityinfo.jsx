import { Users, MapPin, Tag, Calendar, User } from 'lucide-react';

/**
 * Component 124 - Admin Community Info
 * Expanded detail panel shown below a community row when chevron is clicked.
 * Matches image 2 design: description, meta row, member avatar stack + View Members button.
 *
 * Props:
 *  - community: { description, creator, category, location, createdAt, members }
 *  - onViewMembers: () => void
 */
export function AdminCommunityInfo({ community, onViewMembers }) {
  const previewMembers = community.members?.slice(0, 5) ?? [];
  const extra = (community.members?.length ?? 0) - previewMembers.length;

  return (
    <div className="px-6 py-5 bg-gray-50/60 space-y-4">
      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{community.description}</p>

      {/* Meta row */}
      <div className="flex items-center gap-5 flex-wrap text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-400" />
          Created by <span className="font-semibold text-gray-700 ml-1">{community.creator}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-gray-400" />
          {community.category}
        </span>
        {community.location && (
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {community.location}
          </span>
        )}
        {community.createdAt && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>

      {/* Members row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {previewMembers.map((m) => (
              <div
                key={m.id}
                title={m.name}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: stringToColor(m.name) }}
              >
                {m.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {extra > 0 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                +{extra}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {community.members?.length ?? 0} member{(community.members?.length ?? 0) !== 1 ? 's' : ''}
          </span>
        </div>

        <button
          onClick={onViewMembers}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
        >
          <Users className="w-4 h-4" />
          View Members
        </button>
      </div>
    </div>
  );
}

function stringToColor(str = '') {
  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default AdminCommunityInfo;