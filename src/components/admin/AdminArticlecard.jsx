import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * Component 113 - Admin Article Card
 * Reusable card used in the Article Management grid (112).
 *
 * Props:
 *  - article: { id, title, description, category, imageUrl, createdAt }
 *  - onEdit: (article) => void
 *  - onDelete: (id) => void
 *  - delay?: number
 */
export function AdminArticleCard({ article, onEdit, onDelete, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      <div className="relative h-40">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-gray-700 capitalize">
          {article.category}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-gray-900 line-clamp-1">{article.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
        <p className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleDateString()}</p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit?.(article)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete?.(article.id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminArticleCard;