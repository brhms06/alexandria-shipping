"use client";

import dynamic from "next/dynamic";

const TrackingMapLeaflet = dynamic(() => import("./TrackingMapLeaflet"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#f8fafc] animate-pulse rounded-3xl border border-slate-100"></div>
});

interface TrackingMapProps {
  pickup?: { lat: number; lng: number; label: string };
  dropoff?: { lat: number; lng: number; label: string };
  currentLocation?: { lat: number; lng: number; label: string };
  history?: { lat: number; lng: number }[];
  stops?: { lat: number; lng: number; name: string; status: string }[];
  status?: number;
  transportType?: 'land' | 'sea' | 'air';
  interactive?: boolean;
}

export default function TrackingMap(props: TrackingMapProps) {
  return <TrackingMapLeaflet {...props} />;
}
