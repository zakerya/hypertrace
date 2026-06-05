// frontend/src/app/dashboard/components/UpdateMilestonePanel.tsx

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { STATUS_GROUPS } from "../lib/constants";

interface UpdateMilestonePanelProps {
  trackingId: string;
  onTrackingIdChange: (id: string) => void;
}

export default function UpdateMilestonePanel({ trackingId, onTrackingIdChange }: UpdateMilestonePanelProps) {
  const queryClient = useQueryClient();
  const [location, setLocation] = useState("");
  const [activeStatus, setActiveStatus] = useState("Received by Courier");

  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/api/v1/parcels/status?tracking_id=${trackingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: activeStatus, location: location }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      onTrackingIdChange("");
      setLocation("");
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
  });

  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        <RefreshCw className="h-5 w-5 text-green-400" /> Update Milestone
      </h2>
      
      <div className="space-y-3 mb-5">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Tracking ID</label>
          <input 
            type="text" 
            placeholder="Click a shipment to select" 
            value={trackingId} 
            onChange={(e) => onTrackingIdChange(e.target.value)} 
            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 outline-none font-mono text-sm" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Current Location</label>
          <input 
            type="text" 
            placeholder="e.g. JFK Airport, New York" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 outline-none text-sm" 
          />
        </div>
      </div>

      <div className="space-y-4 mb-5">
        {STATUS_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <group.icon className="h-4 w-4" /> {group.title}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((milestone) => (
                <button 
                  key={milestone} 
                  onClick={() => setActiveStatus(milestone)} 
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all text-center ${
                    activeStatus === milestone 
                      ? "bg-green-500/20 text-green-300 border-green-500/30 scale-105 shadow-lg shadow-green-500/10" 
                      : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-300"
                  }`}
                >
                  {milestone}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => updateMutation.mutate()} 
        disabled={!trackingId.trim() || !location.trim() || updateMutation.isPending} 
        className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
      >
        <RefreshCw className={`h-4 w-4 ${updateMutation.isPending ? 'animate-spin' : ''}`} />
        {updateMutation.isPending ? "Updating..." : `Update to: ${activeStatus}`}
      </button>
    </div>
  );
}