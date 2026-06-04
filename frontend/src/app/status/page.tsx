// frontend/src/app/status/page.tsx

"use client";

import { useEffect, useState } from "react";

type ServiceStatus = "checking" | "online" | "offline";

interface Service {
  name: string;
  url: string | null;
  status: ServiceStatus;
  latency: number | null;
  description: string;
}

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([
    {
      name: "Frontend (Next.js)",
      url: "/", // We'll ping the root of the React app
      status: "checking",
      latency: null,
      description: "The web interface serving this page.",
    },
    {
      name: "Backend API (Go)",
      url: "http://localhost:8080/api/v1/health",
      status: "checking",
      latency: null,
      description: "The core API handling parcel data and logic.",
    },
    {
      name: "Database (SQLite)",
      url: null, // Not hooked up yet
      status: "offline",
      latency: null,
      description: "Persistent storage for parcels and users.",
    },
  ]);

  const checkServices = async () => {
    // Copy current services to update them
    const updatedServices = [...services];

    for (let i = 0; i < updatedServices.length; i++) {
      const service = updatedServices[i];

      // Skip services with no URL (like our unhooked Database)
      if (!service.url) {
        updatedServices[i] = { ...service, status: "offline" };
        continue;
      }

      try {
        const startTime = performance.now();
        
        // Fetch the endpoint
        const res = await fetch(service.url, { cache: "no-store" });
        
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        if (res.ok) {
          updatedServices[i] = { ...service, status: "online", latency };
        } else {
          updatedServices[i] = { ...service, status: "offline", latency: null };
        }
      } catch (error) {
        // Network error (server likely down or CORS blocked)
        updatedServices[i] = { ...service, status: "offline", latency: null };
      }
    }

    setServices(updatedServices);
  };

  // Run the check when the page loads
  useEffect(() => {
    checkServices();
    // Optional: Set an interval to re-check every 30 seconds
    // const interval = setInterval(checkServices, 30000);
    // return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Determine overall system status
  const allOnline = services.every(s => s.status === "online" || s.url === null);
  const anyOffline = services.some(s => s.status === "offline" && s.url !== null);

  const getStatusDot = (status: ServiceStatus) => {
    switch (status) {
      case "online":
        return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]";
      case "offline":
        return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]";
      case "checking":
        return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)] animate-pulse";
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case "online": return "Operational";
      case "offline": return "Offline";
      case "checking": return "Checking...";
    }
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-4 pt-10 animate-fade-in-up">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">System Status</h1>
        <p className="text-gray-400 text-lg">Real-time health monitoring for HyperTrace services.</p>
      </div>

      {/* Overall Status Banner */}
      <div className={`p-6 rounded-2xl border text-center animate-fade-in-up ${
        anyOffline 
          ? "bg-red-500/10 border-red-500/30" 
          : "bg-green-500/10 border-green-500/30"
      }`} style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-center gap-3">
          <span className={`h-4 w-4 rounded-full ${anyOffline ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"}`}></span>
          <h2 className={`text-2xl font-bold ${anyOffline ? "text-red-400" : "text-green-400"}`}>
            {anyOffline ? "Partial System Outage" : "All Systems Operational"}
          </h2>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="divide-y divide-white/5">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <span className={`h-3 w-3 rounded-full ${getStatusDot(service.status)}`}></span>
                <div>
                  <h3 className="text-white font-semibold">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-medium ${service.status === 'online' ? 'text-green-400' : service.status === 'offline' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {getStatusText(service.status)}
                </div>
                {service.latency !== null && (
                  <div className="text-xs text-gray-600 mt-1">
                    {service.latency}ms
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <button 
          onClick={checkServices}
          className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all"
        >
          ↻ Refresh Status
        </button>
      </div>
    </div>
  );
}