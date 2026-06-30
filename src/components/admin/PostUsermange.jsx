import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, ChevronUp, AlertTriangle,
  Heart, MessageCircle, MapPin, Flag, FlagOff
} from 'lucide-react';

/**
 * Component 103 - PostsUsermanage
 *
 * Shows ALL posts by a user inside the User Details panel.
 * - Spam posts: show red "⚠ N spam" badge in the header row + warning banner when expanded
 * - Clean posts: show a "Mark as Spam" button when expanded (for future spam reports)
 * - Toggling spam is local state; wire onSpamToggle prop to persist to backend
 *
 * Props:
 *  - userName        : string
 *  - posts           : array of { id, title, createdAt, status, priority,
 *                        description, location, likes, comments, category, spamReports }
 *  - onLikesClick    : (post) => void
 *  - onCommentsClick : (post) => void
 *  - onSpamToggle?   : (postId, isSpam) => void   — optional backend callback
 */
export function PostsUsermanage({
  userName = 'User',
  posts = [],
  onLikesClick,
  onCommentsClick,
  onSpamToggle,
}) {
  // Track which post is expanded
  const [expandedId, setExpandedId] = useState(posts[0]?.id ?? null);

  // Local spam flags — starts from post.spamReports > 0, can be toggled
  const [spamFlags, setSpamFlags] = useState(() => {
    const map = {};
    posts.forEach((p) => { map[p.id] = (p.spamReports ?? 0) > 0; });
    return map;
  });

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  const handleSpamToggle = (post) => {
    const newVal = !spamFlags[post.id];
    setSpamFlags((prev) => ({ ...prev, [post.id]: newVal }));
    onSpamToggle?.(post.id, newVal);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="text-sm font-semibold text-gray-800">
          Posts by {userName}
        </span>
        <span className="text-xs text-gray-400">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Post list — ALL posts, no max-height limit so all are visible */}
      <div className="divide-y divide-gray-100">
        {posts.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10">No posts yet</p>
        )}

        {posts.map((post) => {
          const isOpen = expandedId === post.id;
          const isSpam = spamFlags[post.id] ?? false;
          const spamCount = isSpam ? (post.spamReports || 1) : 0;

          return (
            <div key={post.id} className={isSpam ? 'bg-red-50/30' : ''}>

              {/* ── Collapsed row ──────────────────────────────── */}
              <button
                onClick={() => toggle(post.id)}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  {/* Title + spam badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {post.title}
                    </p>
                    {isSpam && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex-shrink-0">
                        <AlertTriangle className="w-3 h-3" />
                        {spamCount} spam
                      </span>
                    )}
                  </div>

                  {/* Date + status + priority chips */}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                      })}
                    </span>
                    {post.status && <StatusChip status={post.status} />}
                    {post.priority && <PriorityChip priority={post.priority} />}
                  </div>
                </div>

                {/* Chevron */}
                <span className="mt-0.5 flex-shrink-0 text-gray-400">
                  {isOpen
                    ? <ChevronUp className="w-4 h-4" />
                    : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {/* ── Expanded body ──────────────────────────────── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-2.5 border-t border-gray-100 pt-3">
                      {/* Location */}
                      {post.location && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {post.location}
                        </div>
                      )}

                      {/* Likes / Comments / Category */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={(e) => { e.stopPropagation(); onLikesClick?.(post); }}
                          className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="font-medium">{post.likes} likes</span>
                        </button>

                        <button
                          onClick={(e) => { e.stopPropagation(); onCommentsClick?.(post); }}
                          className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-medium">{post.comments} comments</span>
                        </button>

                        {post.category && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <span className="text-gray-300">📂</span>
                            <span className="capitalize">{post.category}</span>
                          </span>
                        )}
                      </div>

                      {/* Spam warning banner (if already spam) */}
                      {isSpam && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-xl">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                          <p className="text-xs text-red-600 font-semibold flex-1">
                            {spamCount} spam report{spamCount > 1 ? 's' : ''} flagged on this post
                          </p>
                          {/* Unmark spam */}
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSpamToggle(post); }}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold underline-offset-2 hover:underline transition-colors"
                          >
                            <FlagOff className="w-3.5 h-3.5" />
                            Unmark
                          </button>
                        </div>
                      )}

                      {/* Mark as Spam button (clean posts only) */}
                      {!isSpam && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSpamToggle(post); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all w-fit"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          Mark as Spam
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Chip helpers ────────────────────────────────────────────────────────────
function StatusChip({ status }) {
  const map = {
    pending:     'bg-yellow-100 text-yellow-700',
    in_progress: 'bg-blue-100 text-blue-700',
    resolved:    'bg-green-100 text-green-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function PriorityChip({ priority }) {
  const map = {
    high:   'bg-red-100 text-red-600',
    medium: 'bg-orange-100 text-orange-600',
    low:    'bg-green-100 text-green-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[priority] ?? 'bg-gray-100 text-gray-600'}`}>
      {priority}
    </span>
  );
}

export default PostsUsermanage;