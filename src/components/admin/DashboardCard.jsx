import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

/**
 * Component 91 - Dashboard Card
 * Reusable stat card used on the Admin Dashboard.
 *
 * Props:
 *  - label: string
 *  - value: number | string
 *  - icon: lucide-react icon component
 *  - color: tailwind gradient classes, e.g. "from-blue-500 to-blue-600"
 *  - delay?: number (animation stagger delay)
 */
export function DashboardCard({ label, value, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${color} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  );
}

export default DashboardCard;