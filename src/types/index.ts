export type ShipmentStatus = 'Pending' | 'In Transit' | 'In Port' | 'Out for Delivery' | 'Delivered' | 'On Hold' | 'Arrived at Stop';

export interface Stop {
  name: string;
  lat: number;
  lng: number;
  status: 'pending' | 'completed';
  arrival_time?: string;
  transport_to_next?: 'land' | 'sea' | 'air';
}

export interface ShipmentHistory {
  status: ShipmentStatus | string;
  location: string;
  timestamp: string;
  description: string;
  email_sent?: boolean;
  email_content?: string;
}

export interface Shipment {
  id: string; // Tracking Number
  sender_name: string;
  receiver_name: string;
  sender_email?: string;
  origin: string;
  origin_lat?: number;
  origin_lng?: number;
  destination: string;
  destination_lat?: number;
  destination_lng?: number;
  current_status: ShipmentStatus;
  estimated_delivery: string;
  created_at: string;
  history: ShipmentHistory[];
  transport_type: 'land' | 'sea' | 'air';
  stops: Stop[];
  current_stop_index: number; // -1 for origin, stops.length for destination
  last_status_update: string;
}
