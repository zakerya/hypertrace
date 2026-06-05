// frontend/src/app/dashboard/components/MetricsSidebar.tsx

import { BarChart3 } from "lucide-react";
import { Parcel, STATUS_GROUPS } from "../lib/constants";

interface MetricsSidebarProps {
  parcels: Parcel[] | undefined;
}

export default function MetricsSidebar({ parcels }: MetricsSidebarProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hidden 2xl:block">
      {/* Updated to match Update Milestone header style */}
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-400" /> Metrics
      </h2>
      <div className="space-y-4">
        {STATUS_GROUPS.map(group => (
          <div key={group.title}>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-2">
              <group.icon className="h-4 w-4" /> {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map(item => {
                const count = parcels?.filter(p => p.current_status === item).length || 0;
                return (
                  <div key={item} className="flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-gray-800/50 transition-colors">
                    <span className="text-xs text-gray-400 truncate mr-2">{item}</span>
                    <span className={`text-xs font-bold flex-shrink-0 ${count > 0 ? 'text-white bg-gray-800 w-5 h-5 flex items-center justify-center rounded-md' : 'text-gray-600'}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}