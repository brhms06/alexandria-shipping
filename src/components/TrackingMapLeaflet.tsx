"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet default icon fix
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const createLocationIcon = (label: string) => {
  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); width: 100px;">
        <div style="width: 16px; height: 16px; background-color: #0f172a; border: 2px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"></div>
        <div style="margin-top: 4px; background-color: rgba(15, 23, 42, 0.9); backdrop-filter: blur(4px); padding: 2px 8px; border-radius: 4px; font-size: 8px; font-weight: 900; color: white; text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); border: 1px solid rgba(255,255,255,0.1);">${label}</div>
      </div>
    `,
    className: 'custom-location-icon',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createStopIcon = (label: string, isCompleted: boolean) => {
  const color = isCompleted ? '#10b981' : '#f59e0b';
  return L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); width: 100px;">
        <div style="width: 12px; height: 12px; background-color: ${color}; border: 2px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"></div>
        <div style="margin-top: 4px; background-color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(4px); padding: 2px 6px; border-radius: 4px; font-size: 7px; font-weight: 800; color: ${color}; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid rgba(0,0,0,0.05);">${label}</div>
      </div>
    `,
    className: 'custom-stop-icon',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createHistoryIcon = () => {
  return L.divIcon({
    html: `<div style="width: 8px; height: 8px; background-color: rgba(15, 23, 42, 0.4); border: 1px solid white; border-radius: 50%; transform: translate(-50%, -50%);"></div>`,
    className: 'custom-history-icon',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createTransportIcon = (type: string) => {
  let svg = '';
  if (type === 'air') {
    svg = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="#2563eb" stroke-width="2.5" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5 20.5 3 18.5 3.5 17 5L13.5 8.5 5.3 6.7c-1.1-.3-2.3.4-2.5 1.5l-.2.8c-.1.5.1 1 .5 1.3L10.5 14l-4 4-2.5-.5c-.5-.1-1.1.1-1.4.5l-.5.5c-.3.3-.3.8 0 1.1l2.4 2.4c.3.3.8.3 1.1 0l.5-.5c.4-.3.6-.9.5-1.4l-.5-2.5 4-4 3.7 7.4c.3.4.8.6 1.3.5l.8-.2c1.1-.2 1.8-1.4 1.5-2.5z"/></svg>`;
  } else if (type === 'sea') {
    svg = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="#2563eb" stroke-width="2.5" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 1.4 0 2.5-1 3.5-1 1.2 0 1.9 1 3.5 1s2.3-1 3.5-1 1.9 1 3.5 1 2.4-1 3.5-1"/><path d="M19.38 20.51a3.12 3.12 0 0 0 .87-.51c.31-.27.57-.6.75-.97V11l-4-4-1.5-1.5a2 2 0 0 0-2.83 0L11 7V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v12.5c0 .37.18.7.46.91l.54.41c1.1.83 2.6.83 3.7 0l1.3-1a1.2 1.2 0 0 1 1.46 0l1.3 1c1.1.83 2.6.83 3.7 0l.92-.71Z"/></svg>`;
  } else {
    svg = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="#2563eb" stroke-width="2.5" fill="white" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.098-2.622a1 1 0 0 0-.78-.354H15"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
  }

  return L.divIcon({
    html: \`
      <div style="position: relative; transform: translate(-50%, -50%);">
        <div style="position: absolute; top: -16px; left: -16px; right: -16px; bottom: -16px; background-color: rgba(59, 130, 246, 0.2); border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
        <div style="position: relative; background-color: white; padding: 8px; border-radius: 16px; border: 2px solid #2563eb; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); transition: all 0.5s;">
          \${svg}
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      </style>
    \`,
    className: 'custom-transport-icon-container',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const MapBoundsUpdater = ({ pathPoints }: { pathPoints: {lat: number, lng: number}[] }) => {
  const map = useMap();
  useEffect(() => {
    if (pathPoints.length > 0) {
      const bounds = L.latLngBounds(pathPoints);
      map.fitBounds(bounds, { padding: [80, 80] });
    }
  }, [map, pathPoints]);
  return null;
};

export interface TrackingMapProps {
  pickup?: { lat: number; lng: number; label: string };
  dropoff?: { lat: number; lng: number; label: string };
  currentLocation?: { lat: number; lng: number; label: string };
  history?: { lat: number; lng: number }[];
  stops?: { lat: number; lng: number; name: string; status: string }[];
  status?: number;
  transportType?: 'land' | 'sea' | 'air';
  interactive?: boolean;
}

export default function TrackingMapLeaflet({
  pickup,
  dropoff,
  currentLocation,
  history = [],
  stops = [],
  status = 1,
  transportType = 'land',
  interactive = true
}: TrackingMapProps) {
  const [animatedPos, setAnimatedPos] = useState<{lat: number, lng: number} | null>(null);

  const IS_MOVING = status === 3 || status === 5; // In Transit or Out for Delivery

  const nextTarget = useMemo(() => {
    const nextStop = stops.find(s => s.status === 'pending');
    if (nextStop) return nextStop;
    return dropoff;
  }, [stops, dropoff]);

  useEffect(() => {
    if (!currentLocation) return;
    
    setAnimatedPos({ lat: currentLocation.lat, lng: currentLocation.lng });

    if (!IS_MOVING || !nextTarget) return;

    // Dynamic movement simulation (60 FPS)
    const fps = 60;
    const intervalMs = 1000 / fps;
    const speed = 0.00001; // Movement speed per frame

    const interval = setInterval(() => {
      setAnimatedPos(prev => {
        if (!prev) return prev;
        
        // Calculate distance to target
        const distLat = nextTarget.lat - prev.lat;
        const distLng = nextTarget.lng - prev.lng;
        const distance = Math.sqrt(distLat * distLat + distLng * distLng);
        
        // If we're very close, just snap to it or stop moving
        if (distance < speed) return prev;
        
        // Normalize direction vector
        const dirLat = distLat / distance;
        const dirLng = distLng / distance;
        
        return {
          lat: prev.lat + dirLat * speed,
          lng: prev.lng + dirLng * speed
        };
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [currentLocation, IS_MOVING, nextTarget]);

  const traveledPoints = useMemo(() => {
    if (!pickup) return [];
    const points = [pickup];
    const uniqueHistory = history.filter((p, i) => {
      if (i === 0) return true;
      const prev = history[i-1];
      return Math.abs(p.lat - prev.lat) > 0.0001 || Math.abs(p.lng - prev.lng) > 0.0001;
    });
    uniqueHistory.forEach(point => points.push(point));
    
    stops.filter(s => s.status === 'completed').forEach(s => points.push(s));
    
    if (animatedPos) {
      points.push(animatedPos);
    } else if (currentLocation) {
      points.push(currentLocation);
    }
    return points;
  }, [pickup, history, stops, animatedPos, currentLocation]);

  const upcomingPoints = useMemo(() => {
    const points = [];
    if (animatedPos) {
      points.push(animatedPos);
    } else if (currentLocation) {
      points.push(currentLocation);
    } else if (pickup) {
      points.push(pickup);
    }
    
    stops.filter(s => s.status === 'pending').forEach(s => points.push(s));
    if (dropoff) points.push(dropoff);
    
    return points;
  }, [animatedPos, currentLocation, pickup, stops, dropoff]);

  const boundingPoints = useMemo(() => {
    const points = [];
    if (pickup) points.push(pickup);
    if (currentLocation) points.push(currentLocation);
    if (dropoff) points.push(dropoff);
    stops.forEach(s => points.push(s));
    history.forEach(p => points.push(p));
    return points;
  }, [pickup, currentLocation, dropoff, stops, history]);

  const currentDisplayPos = animatedPos || currentLocation || pickup;
  const transportIcon = useMemo(() => createTransportIcon(transportType), [transportType]);
  const originIcon = useMemo(() => createLocationIcon("Origin"), []);
  const destIcon = useMemo(() => createLocationIcon("Destination"), []);
  const histIcon = useMemo(() => createHistoryIcon(), []);

  const center: [number, number] = [20, 0];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-100 bg-[#f8fafc]">
      <MapContainer
        center={center}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        zoomControl={interactive}
        dragging={interactive}
        scrollWheelZoom={interactive}
        doubleClickZoom={interactive}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsUpdater pathPoints={boundingPoints} />

        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} icon={originIcon} interactive={false} />
        )}

        {stops.map((stop, i) => (
          stop.lat && stop.lng ? (
            <Marker key={`stop-${i}`} position={[stop.lat, stop.lng]} icon={createStopIcon(stop.name || `Stop ${i+1}`, stop.status === 'completed')} interactive={false} />
          ) : null
        ))}

        {dropoff && (
          <Marker position={[dropoff.lat, dropoff.lng]} icon={destIcon} interactive={false} />
        )}

        {history.map((point, i) => (
          <Marker key={i} position={[point.lat, point.lng]} icon={histIcon} interactive={false} />
        ))}

        {traveledPoints.length > 1 && (
          <Polyline
            positions={traveledPoints.map(p => [p.lat, p.lng])}
            pathOptions={{ color: '#2563eb', weight: 3, opacity: 0.8 }}
          />
        )}

        {upcomingPoints.length > 1 && (
          <Polyline
            positions={upcomingPoints.map(p => [p.lat, p.lng])}
            pathOptions={{ color: '#94a3b8', weight: 2, opacity: 0.8, dashArray: '5, 10' }}
          />
        )}

        {currentDisplayPos && (
          <Marker position={[currentDisplayPos.lat, currentDisplayPos.lng]} icon={transportIcon} />
        )}
      </MapContainer>
    </div>
  );
}
