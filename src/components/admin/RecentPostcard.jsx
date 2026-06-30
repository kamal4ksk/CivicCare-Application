import { motion } from 'motion/react';

/**
 * Component 93 - Recent Post Card
 * Reusable row item used inside the "Recent Posts" admin dashboard section.
 *
 * Props:
 *  - post: { id, title, author, status, createdAt }
 *  - delay?: number
 */
export function RecentPostCard({ post, delay = 0 }) {
  const statusStyles = {
    pending: 'bg-orange-100 text-orange-700',
    in_progress: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{post.title}</p>
        <p className="text-sm text-gray-500">
          By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusStyles[post.status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {post.status.replace('_', ' ')}
      </span>
    </motion.div>
  );
}

export default RecentPostCard;