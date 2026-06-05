// frontend/src/app/dashboard/components/CreateShipmentModal.tsx

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  User, UserCheck, Mail, Phone, MapPin, Flag, Calendar, Plus, X 
} from "lucide-react";
import { Parcel } from "../lib/constants";

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateShipmentModal({ isOpen, onClose }: CreateShipmentModalProps) {
  const queryClient = useQueryClient();
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

    const createMutation = useMutation({
    mutationFn: async (newParcel: Omit<Parcel, "id" | "current_status" | "status_history">) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/parcels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newParcel),
      });
      if (!res.ok) throw new Error("Failed to create parcel");
      return res.json();
    },
    onSuccess: () => {
      onClose();
      setSenderName(""); setReceiverName(""); setReceiverEmail(""); setReceiverPhone("");
      setOrigin(""); setDestination(""); setEstimatedDelivery("");
      queryClient.invalidateQueries({ queryKey: ["parcels"] });
    },
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ 
      sender_name: senderName, 
      receiver_name: receiverName, 
      receiver_email: receiverEmail,
      receiver_phone: receiverPhone,
      origin, 
      destination, 
      estimated_delivery: estimatedDelivery 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-xl shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-blue-400" /> Create New Shipment
          </h2>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleCreateSubmit} className="p-6 space-y-6">
          
          {/* Section 1: People */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User className="h-4 w-4" /> Who is shipping?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Sender Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    value={senderName} 
                    onChange={(e) => setSenderName(e.target.value)} 
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Receiver Name</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    value={receiverName} 
                    onChange={(e) => setReceiverName(e.target.value)} 
                    placeholder="Jane Smith"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Receiver Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="email" 
                    required 
                    value={receiverEmail} 
                    onChange={(e) => setReceiverEmail(e.target.value)} 
                    placeholder="jane@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Receiver Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="tel" 
                    value={receiverPhone} 
                    onChange={(e) => setReceiverPhone(e.target.value)} 
                    placeholder="+1 234 567 8900"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Route */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Where is it going?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Origin</label>
                <div className="relative">
                  <Flag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)} 
                    placeholder="New York, NY"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <input 
                    type="text" 
                    required 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    placeholder="Los Angeles, CA"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Timing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4" /> When will it arrive?
            </h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Estimated Delivery</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                <input 
                  type="text" 
                  required 
                  value={estimatedDelivery} 
                  onChange={(e) => setEstimatedDelivery(e.target.value)} 
                  placeholder="Oct 29, 2024"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-800">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 bg-gray-950 border border-gray-800 text-gray-300 rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={createMutation.isPending} 
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50 font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Plus className={`h-4 w-4 ${createMutation.isPending ? 'animate-spin' : ''}`} />
              {createMutation.isPending ? "Creating..." : "Create Shipment"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}