// frontend/src/app/track/[id]/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { 
  Package, MapPin, Calendar, Clock, ArrowLeft, CheckCircle, 
  Truck, Plane, Home, ArrowRight, User, UserCheck 
} from "lucide-react";

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
  estimated_delivery: string;
  status_history: StatusUpdate[];
}

// Map milestones to icons for the timeline
const getMilestoneIcon = (status: string) => {
  if (["Delivered"].includes(status)) return <CheckCircle className="h-4 w-4 text-green-400" />;
  if (["Out for Delivery"].includes(status)) return <Home className="h-4 w-4 text-blue-400" />;
  if (status.includes("Airport") || status.includes("Transit")) return <Plane className="h-4 w-4 text-yellow-400" />;
  if (status.includes("Hub") || status.includes("Courier")) return <Truck className="h-4 w-4 text-purple-400" />;
  return <Package className="h-4 w-4 text-gray-400" />;
};

export default function TrackingPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: parcel, isLoading, isError } = useQuery<Parcel>({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/parcels/${id}`);
      if (!res.ok) throw new Error("Parcel not found");
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center text-gray-400 animate-pulse flex items-center gap-2">
        <Package className="h-5 w-5 animate-bounce" /> Locating your package...
      </div>
    </div>
  );

  if (isError || !parcel) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 animate-fade-in-up max-w-md mx-auto">
        <Package className="h-16 w-16 text-gray-700 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Tracking ID Not Found</h2>
        <p className="text-gray-500">We couldn't find a parcel with that ID. Please check the number and try again.</p>
        <button onClick={() => router.push('/')} className="px-6 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Go Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up pb-16">
      
      {/* Back button */}
      <button onClick={() => router.push('/')} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      {/* Header Card */}
      <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Tracking ID</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono mt-1">{parcel.id}</h1>
          </div>
          <div className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border whitespace-nowrap ${
            parcel.current_status === "Delivered" ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"
          }`}>
            {parcel.current_status}
          </div>
        </div>

        <div className="bg-gray-950 p-5 rounded-xl border border-gray-800/50 space-y-4">
          {/* Origin -> Destination Route */}
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-gray-400">{parcel.origin}</span>
            <ArrowRight className="h-4 w-4 text-gray-600 flex-shrink-0" />
            <MapPin className="h-4 w-4 text-green-400 flex-shrink-0" />
            <span className="text-white font-medium">{parcel.destination}</span>
          </div>

          <div className="border-t border-gray-800 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2.5">
              <User className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-gray-600 text-xs">Sender</p>
                <p className="text-white font-medium">{parcel.sender_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <UserCheck className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-gray-600 text-xs">Receiver</p>
                <p className="text-white font-medium">{parcel.receiver_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-gray-600 text-xs">Est. Delivery</p>
                <p className="text-white font-medium">{parcel.estimated_delivery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" /> Shipment Timeline
        </h2>
        
        <div className="relative">
          {/* The absolute vertical line - Much easier to align than border-left */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-800"></div>
          
          <div className="space-y-8">
            {parcel.status_history && parcel.status_history.length > 0 ? (
              parcel.status_history.map((event, index) => {
                const isLatest = index === parcel.status_history.length - 1;
                return (
                  <div key={index} className="relative flex gap-4 items-start">
                    {/* Timeline Node */}
                    <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isLatest ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-gray-950 border-gray-700'
                    }`}>
                      {getMilestoneIcon(event.status)}
                    </div>

                    {/* Timeline Content */}
                    <div className={`pt-0.5 pb-2 ${!isLatest && 'opacity-60'}`}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-0.5">
                        <h3 className={`font-semibold ${isLatest ? 'text-white' : 'text-gray-300'}`}>
                          {event.status}
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">{event.time}</span>
                      </div>
                      {event.location && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 pl-12">No history available.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}