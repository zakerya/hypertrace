/* frontend/src/app/courier/page.tsx */

"use client";

import { useState } from "react";

export default function CourierPortal() {
  const [trackingId, setTrackingId] = useState("");
  const [activeStatus, setActiveStatus] = useState("Picked Up");

  // Mock data for active deliveries
  const activeDeliveries = [
    { id: "HTC-89012", receiver: "Alice Johnson", address: "742 Evergreen Terrace", status: "Out for Delivery", time: "2:30 PM" },
    { id: "HTC-55667", receiver: "Diana Prince", address: "1 Themyscira Way", status: "Out for Delivery", time: "3:15 PM" },
    { id: "HTC-11234", receiver: "Charlie Brown", address: "1010 Peanut Lane", status: "Picked Up", time: "1:00 PM" },
  ];

  const completedToday = 5;

  // Helper function to color-code the status badges
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Out for Delivery":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Picked Up":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleStatusUpdate = () => {
    if (!trackingId.trim()) return;
    // We'll wire this up to the Go backend later!
    alert(`Updated ${trackingId} to: ${activeStatus}`);
    setTrackingId("");
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Courier Portal</h1>
        <p className="text-gray-400 mt-1">Scan parcels, update statuses, and manage your route.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Scan / Update Card (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <span className="text-2xl">📱</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Quick Scan & Update</h2>
          </div>

          <div className="space-y-5">
            {/* Tracking Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Scan or type tracking ID (e.g. HTC-89012)..." 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg font-mono"
              />
            </div>

            {/* Status Selection Buttons */}
            <div className="flex flex-wrap gap-3">
              {["Picked Up", "In Transit", "Out for Delivery", "Delivered"].map((status) => (
                <button 
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    activeStatus === status 
                      ? "bg-green-500/30 text-green-300 border-green-500/50 shadow-lg shadow-green-500/10" 
                      : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleStatusUpdate}
              disabled={!trackingId.trim()}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-500/25 hover:shadow-green-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-600 disabled:shadow-none"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-sm text-gray-400 mb-2">Active Deliveries</div>
            <div className="text-4xl font-extrabold text-yellow-400">{activeDeliveries.length}</div>
            <div className="mt-3 w-full bg-white/10 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(activeDeliveries.length / 10) * 100}%` }}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">{activeDeliveries.length} / 10 slots used</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-sm text-gray-400 mb-2">Completed Today</div>
            <div className="text-4xl font-extrabold text-green-400">{completedToday}</div>
            <div className="text-xs text-gray-500 mt-1">+2 since 1:00 PM</div>
          </div>
        </div>

      </div>

      {/* Active Deliveries List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Current Route</h2>
        </div>
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
          <span>Tracking ID</span>
          <span>Receiver</span>
          <span className="col-span-2">Address</span>
          <span>Status</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {activeDeliveries.map((parcel) => (
            <div 
              key={parcel.id} 
              className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors"
            >
              <div className="font-mono text-sm text-blue-400 font-medium">{parcel.id}</div>
              <div className="text-sm text-gray-300">{parcel.receiver}</div>
              <div className="text-sm text-gray-400 md:col-span-2 truncate">{parcel.address}</div>
              <div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusClasses(parcel.status)}`}>
                  {parcel.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}