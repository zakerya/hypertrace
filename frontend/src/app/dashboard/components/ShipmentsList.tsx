// frontend/src/app/dashboard/components/ShipmentsList.tsx

import { List, MapPin, ArrowRight, Filter } from "lucide-react";
import { Parcel } from "../lib/constants";

interface ShipmentsListProps {
  parcels: Parcel[];
  selectedTrackingId: string;
  onSelectTrackingId: (id: string) => void;
}

export default function ShipmentsList({ parcels, selectedTrackingId, onSelectTrackingId }: ShipmentsListProps) {
  const getStatusClasses = (status: string) => {
    if (status === "Delivered") return "bg-green-500/10 text-green-400 border-green-500/20";
    if (status === "Out for Delivery") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (["Label Created", "Items Sorted", "Items Packed", "Left Sender Facility"].includes(status)) return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
      {/* Updated padding to px-6 py-5 to match side panels */}
      <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
        {/* Updated to text-xl font-bold and h-5 w-5 icon to match other panels */}
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <List className="h-5 w-5 text-blue-400" /> Shipments
        </h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{parcels.length} results</span>
      </div>
      <div className="divide-y divide-gray-800">
        {parcels.length > 0 ? parcels.map((parcel) => (
          <div 
            key={parcel.id} 
            className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${selectedTrackingId === parcel.id ? 'bg-blue-500/5 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}
            onClick={() => onSelectTrackingId(parcel.id)}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-sm text-blue-400 font-medium">{parcel.id}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusClasses(parcel.current_status)}`}>
                {parcel.current_status}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{parcel.origin}</span>
              <ArrowRight className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{parcel.destination}</span>
            </div>
          </div>
        )) : (
          <div className="px-5 py-16 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
            <Filter className="h-8 w-8 text-gray-700 mb-2" />
            No shipments match this filter.
          </div>
        )}
      </div>
    </div>
  );
}