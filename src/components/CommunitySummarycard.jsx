/**
 * Component 121 - Community Summary Card
 * Reusable stat card used in the Community Management summary (120).
 *
 * Props:
 *  - label: string
 *  - value: number | string
 *  - icon: lucide-react icon component
 *  - color: tailwind gradient classes, e.g. "from-blue-500 to-blue-600"
 */
export function CommunitySummaryCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div className={`p-3 bg-gradient-to-br ${color} rounded-xl flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default CommunitySummaryCard;
