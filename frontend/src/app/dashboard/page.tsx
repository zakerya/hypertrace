// frontend/src/app/dashboard/page.tsx

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Parcel, ALL_STATUSES } from "./lib/constants";

// Import components
import CreateShipmentModal from "./components/CreateShipmentModal";
import FilterSidebar from "./components/FilterSidebar";
import ShipmentsList from "./components/ShipmentsList";
import UpdateMilestonePanel from "./components/UpdateMilestonePanel";
import MetricsSidebar from "./components/MetricsSidebar";

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTrackingId, setSelectedTrackingId] = useState("");

  const { data: parcels, isLoading, isError } = useQuery<Parcel[]>({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/parcels`);
      if (!res.ok) throw new Error("Failed to fetch parcels");
      return res.json();
    },
  });

  // Filter logic
  const toggleCategory = (items: string[]) => {
    const allSelected = items.every(item => selectedStatuses.includes(item));
    if (allSelected) {
      setSelectedStatuses(prev => prev.filter(s => !items.includes(s)));
    } else {
      setSelectedStatuses(prev => [...new Set([...prev, ...items])]);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(prev => prev.filter(s => s !== status));
    } else {
      setSelectedStatuses(prev => [...prev, status]);
    }
  };

  const filteredParcels = parcels?.filter(p => selectedStatuses.includes(p.current_status)) || [];

  if (isLoading) return <div className="text-white text-center text-xl pt-20 animate-pulse">Loading...</div>;
  if (isError) return <div className="text-red-400 text-center text-xl pt-20">Error connecting to Go backend.</div>;

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Operations</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage and update shipment lifecycles.</p>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <Plus className="h-4 w-4" /> Create Shipment
        </button>
      </div>

      {/* 4-PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_380px] 2xl:grid-cols-[260px_1fr_380px_280px] gap-6 items-start">
        
        <FilterSidebar 
          selectedStatuses={selectedStatuses} 
          onToggleStatus={toggleStatus} 
          onToggleCategory={toggleCategory} 
          onClear={() => setSelectedStatuses([])} 
        />

        <ShipmentsList 
          parcels={filteredParcels} 
          selectedTrackingId={selectedTrackingId} 
          onSelectTrackingId={setSelectedTrackingId} 
        />

        <UpdateMilestonePanel 
          trackingId={selectedTrackingId} 
          onTrackingIdChange={setSelectedTrackingId} 
        />

        <MetricsSidebar parcels={parcels} />

      </div>

      <CreateShipmentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}