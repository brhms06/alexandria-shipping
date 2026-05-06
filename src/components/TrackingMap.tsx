"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TrackingMapProps {
  pickup: { lat: number; lng: number; label: string };
  dropoff: { lat: number; lng: number; label: string };
  current?: { lat: number; lng: number; label: string };
  onMapClick?: (lat: number, lng: number) => void;
  transportType?: 'land' | 'sea' | 'air';
}

export default function TrackingMap({ pickup, dropoff, current, onMapClick, transportType = 'land' }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const clickHandlerRef = useRef(onMapClick);

  useEffect(() => {
    clickHandlerRef.current = onMapClick;
  }, [onMapClick]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        center: [20, 0],
        zoom: 2,
      });
      mapInstance.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 18,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        if (clickHandlerRef.current) {
          clickHandlerRef.current(e.latlng.lat, e.latlng.lng);
        }
      });
    }

    const map = mapInstance.current;
    const layerGroup = layerGroupRef.current;

    if (!layerGroup) return;

    layerGroup.clearLayers();

    // Custom Icons
    const originIcon = L.divIcon({
      className: "leaflet-custom-marker",
      html: `<div class="map-pin bg-white border-2 border-[#2B7FFF] text-[#2B7FFF] shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    const destinationIcon = L.divIcon({
      className: "leaflet-custom-marker",
      html: `<div class="map-pin bg-[#2D2430] text-white shadow-lg">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    const getShipmentIcon = () => {
      return L.divIcon({
        className: "leaflet-shipment-marker",
        html: `<div class="relative">
          <div class="absolute -inset-4 bg-[#2B7FFF]/30 rounded-full animate-ping"></div>
          <div class="map-pin bg-[#2B7FFF] text-white scale-125 shadow-2xl border-2 border-white ring-4 ring-[#2B7FFF]/10 relative z-10 transition-transform duration-500 hover:scale-150">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>
        </div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
      });
    };

    const hubIcon = L.divIcon({
      className: "leaflet-hub-marker",
      html: `<div class="w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow-sm opacity-60 hover:opacity-100 hover:scale-150 transition-all cursor-pointer"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    // Add Origin & Destination
    L.marker([pickup.lat || 0, pickup.lng || 0], { icon: originIcon })
      .addTo(layerGroup)
      .bindPopup(`<strong>Origin</strong><br/>${pickup.label}`);

    L.marker([dropoff.lat || 0, dropoff.lng || 0], { icon: destinationIcon })
      .addTo(layerGroup)
      .bindPopup(`<strong>Destination</strong><br/>${dropoff.label}`);

    // Helper: Generate a path with intermediate points
    const getPathPoints = (start: [number, number], end: [number, number], transport: string) => {
      if (transport !== 'land') return [start, end];
      
      const points: [number, number][] = [start];
      const segments = 30; // Increased segments for smoother terrain-like curves
      
      // Calculate a "control point" for the curve based on distance
      const midLat = (start[0] + end[0]) / 2;
      const midLng = (start[1] + end[1]) / 2;
      
      // Vertical distance difference to determine curvature direction
      const distLat = Math.abs(end[0] - start[0]);
      const distLng = Math.abs(end[1] - start[1]);
      
      for (let i = 1; i < segments; i++) {
        const t = i / segments;
        
        // Quadratic Bezier Interpolation
        // P = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        
        // Let's use a simpler sine-based "terrain" wobble on top of linear interpolation
        const baseLat = start[0] + (end[0] - start[0]) * t;
        const baseLng = start[1] + (end[1] - start[1]) * t;
        
        // Add "terrain" variance - mimicking roads following geography
        const varianceFreq1 = Math.sin(t * Math.PI * 4) * 0.02;
        const varianceFreq2 = Math.cos(t * Math.PI * 2) * 0.01;
        const curveOffset = Math.sin(t * Math.PI) * (distLng * 0.1); // Broad curve
        
        const finalLat = baseLat + varianceFreq1 + varianceFreq2;
        const finalLng = baseLng + curveOffset;
        
        points.push([finalLat, finalLng]);
      }
      
      points.push(end);
      return points;
    };

    // Draw Routes
    if (current) {
      const isLand = transportType === 'land';
      
      // 1. Covered Route (Solid Gold - Premium thick line)
      const coveredPoints = getPathPoints([pickup.lat, pickup.lng], [current.lat, current.lng], transportType);
      L.polyline(coveredPoints as L.LatLngExpression[], {
        color: "#2B7FFF",
        weight: 6,
        opacity: 1,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(layerGroup);

      // 2. Remaining Route (Animated Dotted Line)
      const remainingPoints = getPathPoints([current.lat, current.lng], [dropoff.lat, dropoff.lng], transportType);
      L.polyline(remainingPoints as L.LatLngExpression[], {
        color: "#2D2430",
        weight: 3,
        opacity: 0.4,
        dashArray: "10, 15",
        lineJoin: 'round',
        lineCap: 'round',
        className: 'animated-path'
      }).addTo(layerGroup);

      // Add the animation CSS if not already present
      if (!document.getElementById('map-animations')) {
        const style = document.createElement('style');
        style.id = 'map-animations';
        style.innerHTML = `
          @keyframes dash {
            to {
              stroke-dashoffset: -100;
            }
          }
          .animated-path {
            stroke-dasharray: 8, 12;
            animation: dash 20s linear infinite;
          }
          .leaflet-shipment-marker .map-pin {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `;
        document.head.appendChild(style);
      }

      // 3. Dynamic "Logistics Hubs" along the path
      const pathForHubs = [...coveredPoints, ...remainingPoints];
      pathForHubs.forEach((pt, idx) => {
        if (idx % 10 === 0 && idx !== 0 && idx < pathForHubs.length - 1) {
          const isCovered = idx < coveredPoints.length;
          
          L.marker(pt as L.LatLngExpression, { 
            icon: L.divIcon({
              className: "leaflet-hub-marker",
              html: `<div class="group relative flex items-center justify-center">
                <div class="w-3 h-3 ${isCovered ? 'bg-[#2B7FFF]' : 'bg-slate-300'} rounded-full border-2 border-white shadow-md transition-all hover:scale-150"></div>
                <div class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#2D2430] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all transform translate-y-1 group-hover:translate-y-0 z-[2000] font-bold tracking-tight">
                  CHECKPOINT ${idx}
                </div>
              </div>`,
              iconSize: [12, 12],
              iconAnchor: [6, 6],
            }) 
          }).addTo(layerGroup);
        }
      });

      // 4. Current Location Marker (The Package)
      L.marker([current.lat || 0, current.lng || 0], { icon: getShipmentIcon(), zIndexOffset: 1000 })
        .addTo(layerGroup)
        .bindPopup(`<strong>Live Package</strong><br/>${current.label}`)
        .openPopup();

      // 5. Port Decorations (Nearby locations)
      const portIcon = L.divIcon({
        className: "leaflet-port-marker",
        html: `<div class="w-4 h-4 bg-[#2D2430]/20 rounded-full border-2 border-[#2D2430]/30 flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-[#2D2430]/40 rounded-full"></div>
        </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const portNodes = [
        { lat: current.lat + 0.1, lng: current.lng - 0.15, name: "Alpha Hub" },
        { lat: current.lat - 0.08, lng: current.lng + 0.2, name: "Omega Port" }
      ];
      
      portNodes.forEach(node => {
        L.marker([node.lat, node.lng], { icon: portIcon })
          .addTo(layerGroup)
          .bindPopup(`<strong>Facility</strong><br/>${node.name}`);
      });

    } else {
      // Full Path if no current position
      const fullPoints = getPathPoints([pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng], transportType);
      L.polyline(fullPoints as L.LatLngExpression[], {
        color: "#2D2430",
        weight: 3,
        opacity: 0.2,
        dashArray: "10, 15",
        lineJoin: 'round',
        className: 'animated-path'
      }).addTo(layerGroup);
    }

    // Fit Bounds
    const allPoints: [number, number][] = [];
    
    if (pickup.lat && pickup.lng) allPoints.push([pickup.lat, pickup.lng]);
    if (dropoff.lat && dropoff.lng) allPoints.push([dropoff.lat, dropoff.lng]);
    if (current?.lat && current?.lng) allPoints.push([current.lat, current.lng]);

    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [100, 100], animate: true });
      }
    } else {
      map.setView([20, 0], 2);
    }
    
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

  }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng, current?.lat, current?.lng, transportType]);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#f8f9fa]">
      <div ref={mapRef} className="leaflet-map-container h-full w-full" />
      
      {/* Premium Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] hidden md:block">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-gray-100 flex flex-col gap-2.5">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1.5">
            Logistics Legend
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#2B7FFF] shadow-sm"></div>
            <span className="text-[11px] font-semibold text-[#2D2430]">Covered Route</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-1.5 h-0.5 bg-[#2D2430]/30"></div>
              <div className="w-1.5 h-0.5 bg-[#2D2430]/30"></div>
            </div>
            <span className="text-[11px] font-semibold text-[#2D2430]/60">Remaining Path</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-white"></div>
            <span className="text-[11px] font-medium text-slate-500">Logistics Node</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#2B7FFF] rounded-full flex items-center justify-center border border-white">
               <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-[11px] font-semibold text-[#2D2430]">Live Package</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #f8f9fa !important;
        }
        .map-pin {
          display: flex;
          align-items: center;
          justify-center;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
