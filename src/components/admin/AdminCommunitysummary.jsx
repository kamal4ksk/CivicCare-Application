import { Globe2, CheckCircle, Users, Lock } from 'lucide-react';
import { CommunitySummaryCard } from './CommunitySummarycard';

/**
 * Component 120 - Admin Community Summary
 * Stat cards row shown at the top of the Community Management page (122).
 *
 * Props:
 *  - communities: array of community objects with { isActive, isPrivate, membersCount }
 */
export function AdminCommunitySummary({ communities = [] }) {
  const total = communities.length;
  const active = communities.filter((c) => c.isActive).length;
  const totalMembers = communities.reduce((sum, c) => sum + (c.membersCount || 0), 0);
  const privateCount = communities.filter((c) => c.isPrivate).length;

  const stats = [
    { label: 'Total Communities', value: total, icon: Globe2, color: 'from-indigo-500 to-purple-600' },
    { label: 'Active', value: active, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { label: 'Total Members', value: totalMembers, icon: Users, color: 'from-blue-500 to-cyan-600' },
    { label: 'Private', value: privateCount, icon: Lock, color: 'from-gray-500 to-slate-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <CommunitySummaryCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
      ))}
    </div>
  );
}

export default AdminCommunitySummary;
