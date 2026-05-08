"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Truck, Ship, Plane, Navigation, Circle } from "lucide-react";

interface Stop {
  name: string;
  lat: number;
  lng: number;
  status: 'pending' | 'completed';
}

interface TrackingMapProps {
  pickup?: { lat: number; lng: number; label: string };
  dropoff?: { lat: number; lng: number; label: string };
  stops?: Stop[];
  currentStopIndex?: number;
  lastUpdate?: string;
  transportType?: 'land' | 'sea' | 'air';
  shipments?: any[];
  interactive?: boolean;
}

export default function TrackingMap({ 
  pickup, 
  dropoff, 
  stops = [],
  currentStopIndex = -1,
  lastUpdate,
  transportType = 'land',
  shipments, 
  interactive = true 
}: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // ─── ILLUSION OF MOVEMENT LOGIC ───
  useEffect(() => {
    if (currentStopIndex >= stops.length) return; // Delivered

    const interval = setInterval(() => {
      // Calculate a slow "progress" based on time since last update
      // This is purely visual but stays consistent
      const now = new Date().getTime();
      const last = lastUpdate ? new Date(lastUpdate).getTime() : now;
      const elapsedHours = (now - last) / (1000 * 60 * 60);
      
      // Every 1 hour of "real time", move 5% of the way, capped at 85%
      // So it always looks like it's moving but never arrives
      const progress = Math.min(0.85, (elapsedHours * 0.05) % 0.85);
      setAnimationProgress(progress);
    }, 10000); // Update every 10s

    return () => clearInterval(interval);
  }, [currentStopIndex, lastUpdate, stops.length]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      const map = L.map(mapRef.current, {
        scrollWheelZoom: interactive,
        zoomControl: interactive,
        center: [20, 0],
        zoom: 2,
        attributionControl: false,
      });
      mapInstance.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstance.current;
    const layerGroup = layerGroupRef.current;
    if (!layerGroup) return;
    layerGroup.clearLayers();

    // ─── HELPER: ICONS ───
    const createTransportIcon = (type: string, isPulsing = false) => {
      let iconHtml = '';
      const color = '#2563eb'; // blue-600
      
      if (type === 'air') iconHtml = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="${color}" stroke-width="2" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5 20.5 3 18.5 3.5 17 5L13.5 8.5 5.3 6.7c-1.1-.3-2.3.4-2.5 1.5l-.2.8c-.1.5.1 1 .5 1.3L10.5 14l-4 4-2.5-.5c-.5-.1-1.1.1-1.4.5l-.5.5c-.3.3-.3.8 0 1.1l2.4 2.4c.3.3.8.3 1.1 0l.5-.5c.4-.3.6-.9.5-1.4l-.5-2.5 4-4 3.7 7.4c.3.4.8.6 1.3.5l.8-.2c1.1-.2 1.8-1.4 1.5-2.5z"/></svg>`;
      else if (type === 'sea') iconHtml = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="${color}" stroke-width="2" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 1.4 0 2.5-1 3.5-1 1.2 0 1.9 1 3.5 1s2.3-1 3.5-1 1.9 1 3.5 1 2.4-1 3.5-1"/><path d="M19.38 20.51a3.12 3.12 0 0 0 .87-.51c.31-.27.57-.6.75-.97V11l-4-4-1.5-1.5a2 2 0 0 0-2.83 0L11 7V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12.5c0 .37.18.7.46.91l.54.41c1.1.83 2.6.83 3.7 0l1.3-1a1.2 1.2 0 0 1 1.46 0l1.3 1c1.1.83 2.6.83 3.7 0l.92-.71Z"/></svg>`;
      else iconHtml = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="${color}" stroke-width="2" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.098-2.622a1 1 0 0 0-.78-.354H15"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;

      return L.divIcon({
        className: "custom-transport-icon",
        html: `
          <div class="relative">
            ${isPulsing ? '<div class="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>' : ''}
            <div class="relative bg-white p-1 rounded-lg border-2 border-blue-600 shadow-lg transition-all duration-500">
              ${iconHtml}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    };

    const createStopIcon = (isCompleted: boolean) => L.divIcon({
      className: "custom-stop-icon",
      html: `<div class="w-4 h-4 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-300'} border-2 border-white rounded-full shadow-md"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    // ─── RENDERING LOGIC ───

    if (pickup && dropoff) {
      const allPoints = [
        { lat: pickup.lat, lng: pickup.lng, name: 'Origin', status: 'completed' },
        ...stops,
        { lat: dropoff.lat, lng: dropoff.lng, name: 'Destination', status: currentStopIndex >= stops.length ? 'completed' : 'pending' }
      ];

      // Draw Path
      const pathCoordinates = allPoints.map(p => [p.lat, p.lng] as [number, number]);
      L.polyline(pathCoordinates, {
        color: "#e2e8f0",
        weight: 3,
        dashArray: "10, 10"
      }).addTo(layerGroup);

      // Draw Stops
      allPoints.forEach((p, idx) => {
        const isCompleted = idx <= currentStopIndex + 1; // currentStopIndex is -1 for origin
        L.marker([p.lat, p.lng], { icon: createStopIcon(isCompleted) })
          .addTo(layerGroup)
          .bindPopup(`<p class="font-bold text-slate-800">${p.name}</p>`);
      });

      // Calculate Current Position for Moving Icon
      // If we are between idx and idx+1
      const startIdx = currentStopIndex + 1;
      const endIdx = startIdx + 1;

      if (startIdx < allPoints.length - 1) {
        const start = allPoints[startIdx];
        const end = allPoints[endIdx];
        
        // Linear interpolation for "Illusion of Movement"
        const curLat = start.lat + (end.lat - start.lat) * animationProgress;
        const curLng = start.lng + (end.lng - start.lng) * animationProgress;

        L.marker([curLat, curLng], { 
          icon: createTransportIcon(transportType, true) 
        }).addTo(layerGroup);

        // Highlight completed path
        const completedPath = [...pathCoordinates.slice(0, startIdx + 1), [curLat, curLng] as [number, number]];
        L.polyline(completedPath, {
          color: "#2563eb",
          weight: 4
        }).addTo(layerGroup);
      } else if (currentStopIndex >= stops.length) {
        // Delivered
        L.polyline(pathCoordinates, { color: "#10b981", weight: 4 }).addTo(layerGroup);
      }

      const bounds = L.latLngBounds(pathCoordinates);
      map.fitBounds(bounds, { padding: [100, 100] });
    }

    setTimeout(() => { map.invalidateSize(); }, 100);

  }, [pickup, dropoff, stops, currentStopIndex, transportType, animationProgress, interactive]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
