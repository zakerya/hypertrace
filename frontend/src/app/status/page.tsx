// frontend/src/app/status/page.tsx

// frontend/src/app/status/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Globe, Server, Database, RefreshCw, CheckCircle, XCircle, Loader } from "lucide-react";

type ServiceStatus = "checking" | "online" | "offline";

interface Service {
  name: string;
  icon: React.ElementType;
  url: string | null;
  status: ServiceStatus;
  latency: number | null;
  description: string;
}

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([
    {
      name: "Frontend (Next.js)",
      icon: Globe,
      url: "/", 
      status: "checking",
      latency: null,
      description: "The web interface serving this page.",
    },
    {
      name: "Backend API (Go)",
      icon: Server,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/health`, // FIXED: Uses Environment Variable
      status: "checking",
      latency: null,
      description: "The core API handling parcel data and logic.",
    },
    {
      name: "Database (SQLite)",
      icon: Database,
      url: null, 
      status: "offline",
      latency: null,
      description: "Persistent storage for parcels and users.",
    },
  ]);

  const checkServices = async () => {
    // Set all to checking first
    setServices(prev => prev.map(s => ({ ...s, status: "checking" as ServiceStatus })));

    // Fetch all services simultaneously for faster checks
    const results = await Promise.all(
      services.map(async (service): Promise<Service> => {
        if (!service.url) {
          return { ...service, status: "offline" };
        }

        try {
          const startTime = performance.now();
          const res = await fetch(service.url, { cache: "no-store" });
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);

          if (res.ok) {
            return { ...service, status: "online", latency };
          } else {
            return { ...service, status: "offline", latency: null };
          }
        } catch (error) {
          return { ...service, status: "offline", latency: null };
        }
      })
    );

    setServices(results);
  };

  useEffect(() => {
    checkServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const anyOffline = services.some(s => s.status === "offline" && s.url !== null);

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case "online": return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "offline": return <XCircle className="h-5 w-5 text-red-400" />;
      case "checking": return <Loader className="h-5 w-5 text-yellow-400 animate-spin" />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case "online": return "Operational";
      case "offline": return "Offline";
      case "checking": return "Checking...";
    }
  };

  const getStatusTextColor = (status: ServiceStatus) => {
    switch (status) {
      case "online": return "text-green-400";
      case "offline": return "text-red-400";
      case "checking": return "text-yellow-400";
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
          {anyOffline ? <XCircle className="h-6 w-6 text-red-400" /> : <CheckCircle className="h-6 w-6 text-green-400" />}
          <h2 className={`text-2xl font-bold ${anyOffline ? "text-red-400" : "text-green-400"}`}>
            {anyOffline ? "Partial System Outage" : "All Systems Operational"}
          </h2>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="divide-y divide-gray-800">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.name} className="flex items-center justify-between p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-950 rounded-lg border border-gray-800">
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      {service.name} 
                      {getStatusIcon(service.status)}
                    </h3>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusTextColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </div>
                  {service.latency !== null && (
                    <div className="text-xs text-gray-600 mt-1">
                      {service.latency}ms
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <button 
          onClick={checkServices}
          className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 font-medium rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" /> Refresh Status
        </button>
      </div>
    </div>
  );
}