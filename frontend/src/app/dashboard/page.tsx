/* frontend/src/app/dashboard/page.tsx */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// Define the TypeScript interface matching your Go Struct
interface Parcel {
  id: string;
  sender_name: string;
  receiver_name: string;
  status: string;
  origin: string;
  destination: string;
  estimated_delivery: string;
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  // Fetch data from Go backend
  const { data: parcels, isLoading, isError } = useQuery<Parcel[]>({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/v1/parcels");
      if (!res.ok) throw new Error("Failed to fetch parcels");
      return res.json();
    },
  });

  // Mutation to CREATE a new parcel
  const createMutation = useMutation({
    mutationFn: async (newParcel: Omit<Parcel, "id" | "status">) => {
      const res = await fetch("http://localhost:8080/api/v1/parcels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newParcel),
      });
      if (!res.ok) throw new Error("Failed to create parcel");
      return res.json();
    },
    onSuccess: () => {
      // When successful, close modal, reset form, and refresh the table!
      setIsModalOpen(false);
      setSenderName("");
      setReceiverName("");
      setOrigin("");
      setDestination("");
      setEstimatedDelivery("");
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      sender_name: senderName,
      receiver_name: receiverName,
      origin,
      destination,
      estimated_delivery: estimatedDelivery,
    });
  };

  const metrics = [
    { title: "Total Shipments", value: parcels?.length || 0, icon: "📦", change: "+12%", color: "text-blue-400" },
    { title: "In Transit", value: parcels?.filter(p => p.status === "In Transit").length || 0, icon: "🚚", change: "+4%", color: "text-yellow-400" },
    { title: "Delivered", value: parcels?.filter(p => p.status === "Delivered").length || 0, icon: "✅", change: "+8%", color: "text-green-400" },
    { title: "Pending Pickup", value: parcels?.filter(p => p.status === "Pending Pickup").length || 0, icon: "⏳", change: "-2%", color: "text-purple-400" },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Transit": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Pending Pickup": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) return <div className="text-white text-center text-xl pt-20 animate-pulse">Loading shipments from Go backend...</div>;
  if (isError) return <div className="text-red-400 text-center text-xl pt-20">Error connecting to the Go backend.</div>;

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor your shipments and delivery performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 animate-glow"
        >
          + Create Shipment
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-md">{metric.change}</span>
            </div>
            <h3 className={`text-3xl font-bold ${metric.color}`}>{metric.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Shipments List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Recent Shipments</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All →</button>
        </div>
        
        <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
          <span>Tracking ID</span>
          <span>Receiver</span>
          <span>Route</span>
          <span>Status</span>
          <span className="text-right">Est. Delivery</span>
        </div>

        <div className="divide-y divide-white/5">
          {parcels && parcels.length > 0 ? (
            parcels.map((parcel) => (
              <div key={parcel.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors cursor-pointer">
                <div className="font-mono text-sm text-blue-400 font-medium">{parcel.id}</div>
                <div className="text-sm text-gray-300">{parcel.receiver_name}</div>
                <div className="text-sm text-gray-400 truncate">{parcel.origin} → {parcel.destination}</div>
                <div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusClasses(parcel.status)}`}>
                    {parcel.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 md:text-right">{parcel.estimated_delivery}</div>
              </div>
            ))
          ) : (
            <div className="px-6 py-10 text-center text-gray-500">No shipments found.</div>
          )}
        </div>
      </div>

      {/* --- CREATE SHIPMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Shipment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Sender Name</label>
                <input type="text" required value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Receiver Name</label>
                <input type="text" required value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Origin</label>
                  <input type="text" required value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. New York, NY" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Destination</label>
                  <input type="text" required value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Los Angeles, CA" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Estimated Delivery</label>
                <input type="text" required value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} placeholder="e.g. Oct 29, 2024" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={createMutation.isPending} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {createMutation.isPending ? "Creating..." : "Create Shipment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}