import React from "react";
import { Users, Globe, Lock, ShieldCheck } from "lucide-react";
import CommunitySummaryCard from "./CommunitySummarycard";

export default function CommunitySummary({ communities = [] }) {
  const total = communities.length;
  const joined = communities.filter((c) => c.joined).length;
  const totalMembers = communities.reduce((sum, c) => sum + (c.members?.length || 0), 0);
  const publicCount = communities.filter((c) => c.type === "Public").length;

  const stats = [
    {
      label: "Total Communities",
      value: total,
      icon: Globe,
      color: "from-purple-500 to-indigo-600",
    },
    {
      label: "Joined Communities",
      value: joined,
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Total Members",
      value: totalMembers,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Public Groups",
      value: publicCount,
      icon: Lock,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full select-none">
      {stats.map((stat) => (
        <CommunitySummaryCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}
