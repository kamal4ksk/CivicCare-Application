import React from "react";
import SummaryCard from "./SummaryCard";

export default function CommunitySummary({ communities = [] }) {
  const totalCount = communities.length;
  const joinedCount = communities.filter((c) => c.joined).length;
  
  const totalMembers = communities.reduce((sum, c) => {
    // If the community has a members list, we can count them or use a memberCount property.
    // Let's use a memberCount property or fall back to the members initials array length.
    return sum + (c.memberCount || (c.members ? c.members.length : 0));
  }, 0);
  
  const publicCount = communities.filter((c) => c.type === "Public" || c.type === "public").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <SummaryCard value={totalCount} label="Communities" valueColor="text-slate-800" />
      <SummaryCard value={joinedCount} label="Joined" valueColor="text-[#155DFC]" />
      <SummaryCard value={totalMembers} label="Total Members" valueColor="text-[#9810FA]" />
      <SummaryCard value={publicCount} label="Public" valueColor="text-emerald-600" />
    </div>
  );
}
