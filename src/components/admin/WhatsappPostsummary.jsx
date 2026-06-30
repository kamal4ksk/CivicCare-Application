import { MessageCircle, Clock, CheckCircle } from 'lucide-react';

/**
 * Component 109 - WhatsApp Post Summary
 * Total / Pending / Converted stat cards for the WhatsApp Center (108).
 *
 * Props:
 *  - messages: array of message objects with a `converted: boolean` flag
 */
export function WhatsAppPostSummary({ messages = [] }) {
  const total = messages.length;
  const converted = messages.filter((m) => m.converted).length;
  const pending = total - converted;

  const stats = [
    { label: 'Total Messages', value: total, icon: MessageCircle, color: 'from-green-500 to-emerald-600' },
    { label: 'Pending', value: pending, icon: Clock, color: 'from-orange-500 to-amber-600' },
    { label: 'Converted', value: converted, icon: CheckCircle, color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WhatsAppPostSummary;