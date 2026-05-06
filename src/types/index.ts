export type ShipmentStatus = 'Pending' | 'In Transit' | 'In Port' | 'Out for Delivery' | 'Delivered' | 'On Hold';

export interface ShipmentHistory {
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
}

export interface Shipment {
  id: string; // Tracking Number
  sender_name: string;
  receiver_name: string;
  origin: string;
  destination: string;
  current_status: ShipmentStatus;
  estimated_delivery: string;
  created_at: string;
  history: ShipmentHistory[];
  transport_type?: 'land' | 'sea' | 'air';
}
