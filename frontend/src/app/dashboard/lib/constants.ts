// frontend/src/app/dashboard/lib/constants.ts

import { Package, Truck, Plane, Home } from "lucide-react";

export interface StatusUpdate {
  status: string;
  location: string;
  time: string;
}

export interface Parcel {
  id: string;
  sender_name: string;
  receiver_name: string;
  receiver_email: string;
  receiver_phone: string; 
  current_status: string;
  origin: string;
  destination: string;
  estimated_delivery: string;
  status_history: StatusUpdate[];
}

export const STATUS_GROUPS = [
  { title: "Preparation", icon: Package, items: ["Label Created", "Items Sorted", "Items Packed", "Left Sender Facility"] },
  { title: "Local & Hub", icon: Truck, items: ["Received by Courier", "Arrived at Origin Hub", "Departed Origin Hub"] },
  { title: "Air Transit", icon: Plane, items: ["Arrived at Airport", "Departed Airport", "Arrived at Destination Airport", "Customs Clearance"] },
  { title: "Final Mile", icon: Home, items: ["Arrived at Destination Hub", "Out for Delivery", "Delivered"] },
];

export const ALL_STATUSES = STATUS_GROUPS.flatMap(g => g.items);