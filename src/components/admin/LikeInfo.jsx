import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { LikedUser } from './LikedUser';

/**
 * Component 104 - Like Info Modal
 * Shows the list of users (105) who liked a given post.
 *
 * Props:
 *  - isOpen: boolean
 *  - post: { id, title, likes }
 *  - likers: string[]   array of names who liked the post
 *  - onClose: () => void
 */
export function LikeInfoModal({ isOpen, post, likers = [], onClose }) {
  return (
    <AnimatePresence>
      {isOpen && post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-200"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-gray-900">{post.likes} Likes</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="px-5 py-2 text-xs text-gray-500 border-b border-gray-200 bg-gray-50 line-clamp-2">
              {post.title}
            </p>
            <div className="max-h-72 overflow-y-auto p-3 space-y-2">
              {likers.map((name, i) => (
                <LikedUser key={i} name={name} />
              ))}
              {likers.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">No likes yet</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LikeInfoModal;