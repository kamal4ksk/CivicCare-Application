import { motion } from 'motion/react';

/**
 * Component 95 - Manage User (Quick Action Button)
 * Reusable quick-action button used in the Admin Dashboard "Quick Actions" grid.
 *
 * Props:
 *  - icon: lucide-react icon component
 *  - iconColor: tailwind text color class, e.g. "text-blue-600"
 *  - title: string
 *  - description: string
 *  - onClick: () => void
 */
export function QuickActionButton({ icon: Icon, iconColor, title, description, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all text-left"
    >
      <Icon className={`w-8 h-8 ${iconColor} mb-2`} />
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </motion.button>
  );
}

export default QuickActionButton;