import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, AlertTriangle, Heart, MessageCircle, MapPin } from 'lucide-react';

function getPriorityColor(priority) {
  if (priority === 'high') return 'text-red-600 bg-red-100';
  if (priority === 'medium') return 'text-yellow-600 bg-yellow-100';
  return 'text-green-600 bg-green-100';
}

function getStatusColor(status) {
  if (status === 'resolved') return 'text-green-600 bg-green-100';
  if (status === 'in_progress') return 'text-blue-600 bg-blue-100';
  return 'text-yellow-600 bg-yellow-100';
}

/**
 * Component 102 - Posts Usermanage
 * Expandable list of a user's posts shown inside "User Details" (99).
 * Each post can be expanded to show description, location, and like/comment
 * counts which open the Like Info (104) / Comment Info (106) modals.
 *
 * Props:
 *  - userName: string
 *  - posts: array of post objects:
 *      { id, title, createdAt, status, priority, description, location,
 *        likes, comments, category, spamReports }
 *  - onLikesClick: (post) => void
 *  - onCommentsClick: (post) => void
 */
export function PostsUserManage({ userName, posts = [], onLikesClick, onCommentsClick }) {
  const [expandedPostId, setExpandedPostId] = useState(null);

  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        Posts by {userName}
      </h4>
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200"
          >
            <button
              onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
              className="w-full p-3 flex items-start gap-3 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.status && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getStatusColor(post.status)}`}>
                      {post.status.replace('_', ' ')}
                    </span>
                  )}
                  {post.priority && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getPriorityColor(post.priority)}`}>
                      {post.priority}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(post.spamReports ?? 0) > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span className="text-xs font-semibold text-red-500">{post.spamReports} spam</span>
                  </div>
                )}
                {expandedPostId === post.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {expandedPostId === post.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 border-t border-gray-200 pt-2 space-y-1">
                    <p className="text-xs text-gray-500">{post.description}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </div>
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <button
                        onClick={(e) => { e.stopPropagation(); onLikesClick?.(post); }}
                        className="flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-600 font-medium">{post.likes} likes</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onCommentsClick?.(post); }}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-blue-600 font-medium">{post.comments} comments</span>
                      </button>
                      <span className="text-xs text-gray-500 capitalize">📂 {post.category}</span>
                    </div>
                    {(post.spamReports ?? 0) > 0 && (
                      <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {post.spamReports} spam report{(post.spamReports ?? 0) > 1 ? 's' : ''} flagged on this post
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No posts yet</p>
        )}
      </div>
    </div>
  );
}

export default PostsUserManage;