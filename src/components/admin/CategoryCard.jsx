import { motion } from 'motion/react';
import { Edit2, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

/**
 * Component 117 - Category Card
 * Reusable card used in the Category Management grid (116).
 *
 * Props:
 *  - category: { id, name, description, icon (lucide icon name string), color (tailwind gradient classes) }
 *  - onEdit: (category) => void
 *  - onDelete: (id) => void
 *  - delay?: number
 */
export function CategoryCard({ category, onEdit, onDelete, delay = 0 }) {
  const Icon = LucideIcons[category.icon] || LucideIcons.Folder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex items-center gap-4"
    >
      <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
      </div>
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          onClick={() => onEdit?.(category)}
          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(category.id)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default CategoryCard;
