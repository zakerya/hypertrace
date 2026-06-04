/* frontend/src/app/courier/page.tsx */

"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface StatusUpdate {
  status: string;
  location: string;
  time: string;
}

interface Parcel {
  id: string;
  sender_name: string;
  receiver_name: string;
  current_status: string;
  origin: string;
  destination: string;
  status_history: StatusUpdate[];
}

// Categorized Milestones for better UX!
const MILESTONE_CATEGORIES = [
  {
    title: "📦 Preparation",
    items: ["Label Created", "Items Sorted", "Items Packed", "Left Sender Facility"],
  },
  {
    title: "🚚 Local Courier & Hub",
    items: ["Received by Courier", "Arrived at Origin Hub", "Departed Origin Hub"],
  },
  {
    title: "✈️ Air & International Transit",
    items: ["Arrived at Airport", "Departed Airport", "Arrived at Destination Airport", "Customs Clearance"],
  },
  {
    title: "🏡 Final Mile",
    items: ["Arrived at Destination Hub", "Out for Delivery", "Delivered"],
  },
];

export default function CourierPortal() {
  const queryClient = useQueryClient();
  const [trackingId, setTrackingId] = useState("");
  const [activeStatus, setActiveStatus] = useState("Received by Courier");
  const [location, setLocation] = useState("");

  const { data: parcels, isLoading } = useQuery<Parcel[]>({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/v1/parcels");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

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
      alert("Status updated successfully!");
      setTrackingId("");
      setLocation("");
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
    onError: () => {
      alert("Error updating status. Check Tracking ID.");
    },
  });

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "text-green-400";
    if (status === "Out for Delivery") return "text-blue-400";
    if (status.includes("Airport") || status.includes("Hub") || status === "Departed Airport") return "text-yellow-400";
    return "text-gray-400";
  };

  if (isLoading) return <div className="text-white text-center text-xl pt-20 animate-pulse">Loading...</div>;

  return (
    <div className="space-y-10">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Courier Portal</h1>
        <p className="text-gray-400 mt-1">Scan parcels, update milestones, and manage the logistics chain.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Update Status Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30"><span className="text-2xl">📱</span></div>
            <h2 className="text-2xl font-bold text-white">Update Milestone</h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Tracking ID (e.g. HTC-89012)" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none transition-all font-mono"
              />
              <input 
                type="text" 
                placeholder="Current Location (e.g. JFK Airport)" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>

            {/* Categorized Milestones with Pill Buttons */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {MILESTONE_CATEGORIES.map((category) => (
                <div key={category.title}>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((milestone) => (
                      <button 
                        key={milestone}
                        onClick={() => setActiveStatus(milestone)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all text-center ${
                          activeStatus === milestone 
                            ? "bg-green-500/30 text-green-300 border-green-500/50 shadow-lg shadow-green-500/10 scale-105" 
                            : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20"
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
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? "Updating..." : `Update to: ${activeStatus}`}
            </button>
          </div>
        </div>

        {/* Active Shipments Quick View */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-bold text-white mb-4">Active Shipments</h3>
          <div className="space-y-3 max-h-[550px] overflow-y-auto custom-scrollbar">
            {parcels?.filter(p => p.current_status !== "Delivered").map((parcel) => (
              <div 
                key={parcel.id} 
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  trackingId === parcel.id 
                    ? "bg-green-500/10 border-green-500/30" 
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
                onClick={() => setTrackingId(parcel.id)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-sm text-blue-400 font-bold">{parcel.id}</span>
                  <span className={`text-xs font-medium ${getStatusColor(parcel.current_status)}`}>
                    {parcel.current_status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {parcel.origin} → {parcel.destination}
                </div>
              </div>
            ))}
            
            {parcels?.filter(p => p.current_status !== "Delivered").length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No active shipments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}