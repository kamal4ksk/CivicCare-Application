import React from 'react';
import { HiOutlineMapPin } from 'react-icons/hi2';
import NearbyEventCard from './NearbyEventCard';

export default function NearbyUpdates() {
  const updates = [
    { id: 1, title: "Town Hall Meeting", description: "Discuss civic improvements with local officials", location: "City Hall", date: "June 10, 2026", type: "Event", typeColor: "bg-purple-500" },
    { id: 2, title: "Free Health Checkup Camp", description: "Community health initiative by Municipal Corp", location: "Community Center", date: "June 15, 2026", type: "Service", typeColor: "bg-emerald-500" },
    { id: 3, title: "Road Maintenance Notice", description: "Main Street will be under repair", location: "Main Street", date: "Starting June 8", type: "Announcement", typeColor: "bg-cyan-500" }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] text-left flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-xs">
          <HiOutlineMapPin className="w-4 h-4 stroke-[2.2]" />
        </div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Nearby Updates</h3>
      </div>
      
      <div className="space-y-3 flex-1">
        {updates.map(upd => <NearbyEventCard key={upd.id} {...upd} />)}
      </div>

      <button className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100/80 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center">
        View All Updates
      </button>
    </div>
  );
}