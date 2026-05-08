"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/lib/supabase-client";
import { 
  Ship, Package, MapPin, Clock, Shield, Search, Globe, Zap, 
  CheckCircle, ArrowRight, Navigation, Phone, Mail, FileText, 
  Truck, Plane, Anchor, Info, AlertCircle, ChevronLeft, User, 
  Printer, Share2, Download, ExternalLink, Map as MapIcon, 
  ChevronDown, ArrowLeft
} from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Dynamically import Leaflet with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

const STATUS_MAP: Record<number, { label: string; color: string }> = {
  1: { label: "ORDER PLACED", color: "#64748b" },
  2: { label: "PACKED", color: "#8b5cf6" },
  3: { label: "IN TRANSIT", color: "#0A2F6E" },
  4: { label: "OUT FOR DELIVERY", color: "#f59e0b" },
  5: { label: "DELIVERED", color: "#10b981" },
  6: { label: "HELD AT PORT", color: "#ef4444" },
};

export default function TrackingPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const [shipment, setShipment] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'info' | 'map'>('info');
  const supabase = createClient();

  useEffect(() => {
    async function fetchShipment() {
      const { data, error } = await supabase
        .from("shipments")
        .select(`*, shipment_updates (*)`)
        .eq("tracking_id", params.id)
        .single();

      if (data) {
        setShipment(data);
        setUpdates(data.shipment_updates?.sort((a: any, b: any) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ) || []);
      }
      setLoading(false);
    }
    fetchShipment();
  }, [params.id, supabase]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(10, 47, 110); // Deep Navy
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("ALEXANDRIA LOGISTICS", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL CARGO MANIFEST & RECEIPT", 20, 32);
    
    // Shipment ID
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Tracking ID: ${shipment.tracking_id}`, 20, 55);
    doc.setFontSize(10);
    doc.text(`Issued On: ${new Date().toLocaleString()}`, 20, 62);
    
    // Status Box
    doc.setDrawColor(200, 200, 200);
    doc.rect(140, 48, 50, 18);
    doc.setFont("helvetica", "bold");
    doc.text("STATUS", 145, 54);
    doc.setTextColor(10, 47, 110);
    doc.text(STATUS_MAP[shipment.status]?.label || "PENDING", 145, 61);
    
    // Sender/Receiver Table
    (doc as any).autoTable({
      startY: 75,
      head: [['SENDER INFORMATION', 'RECEIVER INFORMATION']],
      body: [[
        `${shipment.sender_name}\n${shipment.sender_address}\n${shipment.customer_phone || ""}`,
        `${shipment.receiver_name}\n${shipment.receiver_address}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [10, 47, 110] },
      styles: { fontSize: 10, cellPadding: 8 }
    });
    
    // Package Details
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['LOGISTICS DETAILS', 'VALUE']],
      body: [
        ['Service Level', shipment.service_level || 'Standard Express'],
        ['Transport Method', shipment.transport_type?.toUpperCase() || 'SEA'],
        ['Gross Weight', `${shipment.weight} KG`],
        ['Total Volume', `${shipment.volume} M3`],
        ['Estimated Delivery', shipment.estimated_delivery || 'TBD']
      ],
      theme: 'striped',
      headStyles: { fillColor: [10, 47, 110] }
    });

    // History
    if (updates.length > 0) {
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['DATE', 'LOCATION / STATUS', 'MESSAGE']],
        body: updates.map(u => [
          new Date(u.created_at).toLocaleDateString(),
          u.status || 'Update',
          u.message || u.location || 'Logged'
        ]),
        headStyles: { fillColor: [10, 47, 110] }
      });
    }
    
    doc.save(`Alexandria_Receipt_${shipment.tracking_id}.pdf`);
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#0A2F6E] border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-[#0A2F6E]">Loading Manifest Data...</p>
      </div>
    </div>
  );

  const status = STATUS_MAP[shipment.status] || STATUS_MAP[1];
  const L = typeof window !== 'undefined' ? require('leaflet') : null;
  const customIcon = L ? new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }) : null;

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col font-sans">
      
      {/* ─── 1. CORPORATE HEADER ─── */}
      <header className="bg-navy text-white py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Background"
            fill
            className="object-cover opacity-10 grayscale"
          />
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-accent flex items-center justify-center text-white shadow-xl">
            <Ship size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">Alexandria <span className="text-accent">Tracking</span></h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/50">SECURE GLOBAL LOGISTICS PORTAL</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
          <Button 
            onClick={() => window.location.href='/tracking'} 
            variant="outline" 
            className="flex-1 md:flex-none border-white/20 text-white hover:bg-white/10 rounded-none h-14 px-8 font-bold uppercase text-[10px] tracking-widest bg-transparent"
          >
            <ArrowLeft size={16} className="mr-2" /> New Search
          </Button>
          <Button 
            onClick={generatePDF} 
            className="flex-1 md:flex-none bg-accent hover:bg-accent/90 text-white rounded-none h-14 px-10 font-bold uppercase text-[10px] tracking-widest shadow-xl"
          >
            <Printer size={16} className="mr-2" /> Export Manifest
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-navy/5 blur-[150px] -z-10 rounded-full" />
        
        <AnimatePresence mode="wait">
          {view === 'info' ? (
            <motion.div 
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* STATUS BAR */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-slate-200 pb-10 gap-8 relative">
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Current Manifest Status</p>
                  <div className="flex items-center gap-6">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-navy uppercase tracking-tight italic">{status.label}</h2>
                    <div className="w-3 h-3 bg-accent rounded-full animate-ping hidden sm:block" />
                  </div>
                </div>
                <div className="text-left md:text-right relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">Estimated Arrival</p>
                  <p className="text-2xl md:text-4xl font-extrabold text-navy tracking-tight">{shipment.estimated_delivery || "DECEMBER 24, 2026"}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                 <Button 
                   onClick={() => setView('map')} 
                   className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 bg-gradient-to-r from-[#0A2F6E] to-[#061B3D] hover:from-[#2B7FFF] hover:to-[#0A2F6E] text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none flex items-center justify-center gap-3 shadow-xl transition-all duration-500 relative overflow-hidden group/map"
                 >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/map:animate-shimmer" />
                    <MapIcon size={18} className="relative z-10" /> <span className="relative z-10">View Live Map</span>
                 </Button>
                 <Button variant="outline" className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 border-4 border-black text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
                    <Phone size={16} className="mr-2" /> Contact Station
                 </Button>
              </div>

              {/* TWO COLUMN INFO GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                
                {/* SENDER COLUMN */}
                <div className="bg-white p-10 md:p-12 space-y-8">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-10 h-10 bg-slate-50 flex items-center justify-center shrink-0"><User size={20}/></div>
                    <h3 className="font-bold uppercase tracking-widest text-[10px]">Consignor Details</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-2xl md:text-3xl font-bold text-navy leading-tight">{shipment.sender_name}</p>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-sm font-light">{shipment.sender_address}</p>
                    <p className="font-mono text-xs font-medium text-slate-400 mt-6 tracking-widest">{shipment.customer_phone || "CONTACT ENCRYPTED"}</p>
                  </div>
                </div>

                {/* RECEIVER COLUMN */}
                <div className="bg-white p-10 md:p-12 space-y-8">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="w-10 h-10 bg-slate-50 flex items-center justify-center shrink-0"><Navigation size={20}/></div>
                    <h3 className="font-bold uppercase tracking-widest text-[10px]">Consignee Details</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-2xl md:text-3xl font-bold text-navy leading-tight">{shipment.receiver_name}</p>
                    <p className="text-lg text-slate-500 leading-relaxed max-w-sm font-light">{shipment.receiver_address}</p>
                    <p className="font-mono text-xs font-medium text-slate-400 mt-6 tracking-widest">VERIFIED DISCHARGE POINT</p>
                  </div>
                </div>

              </div>

              {/* THE JOURNEY PATH */}
              <div className="bg-slate-50 border border-slate-100 p-8 md:p-16">
                <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] text-slate-400 mb-12">Logistics Journey Path</h3>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-16 relative">
                  {/* Background Line */}
                  <div className="hidden md:block absolute top-12 left-12 right-12 h-[2px] bg-slate-200 -z-10" />

                  {[
                    { label: "Origin Port", location: shipment.sender_address.split(',')[0], icon: Ship, active: true },
                    { label: "Current Point", location: shipment.current_location_name || "In Transit", icon: Navigation, active: true, highlighted: true },
                    { label: "Final Port", location: shipment.receiver_address.split(',')[0], icon: Anchor, active: false },
                  ].map((point, i) => (
                    <div key={i} className="flex md:flex-col items-center gap-6 md:gap-6 md:text-center flex-1 w-full">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-none border-2 transition-all shrink-0 ${point.highlighted ? 'bg-navy border-navy text-white shadow-2xl scale-110' : 'bg-white border-slate-200 text-slate-300'}`}>
                        <point.icon size={32} className="relative z-10" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${point.highlighted ? 'text-accent' : 'text-slate-400'}`}>{point.label}</p>
                        <p className={`text-xl font-bold ${point.highlighted ? 'text-navy' : 'text-slate-900'}`}>{point.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRACKING HISTORY TABLE */}
              <div className="space-y-8">
                <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] text-slate-400">Activity History Log</h3>
                <div className="border border-slate-200 overflow-x-auto shadow-sm">
                  <table className="w-full text-left min-w-[600px] md:min-w-0">
                    <thead className="bg-navy text-white text-[10px] font-bold uppercase tracking-[0.2em]">
                      <tr>
                        <th className="p-6">Date & Time</th>
                        <th className="p-6">Operational Status</th>
                        <th className="p-6">Details / Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {updates.length > 0 ? updates.map((update, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-6 text-sm font-medium text-slate-500">{new Date(update.created_at).toLocaleString()}</td>
                          <td className="p-6 text-sm font-bold text-navy uppercase tracking-tight">{update.status || shipment.status_name}</td>
                          <td className="p-6 text-sm font-light text-slate-600">{update.message || update.location || "Manifest Update Logged"}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={3} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Tracking initialized. Live updates pending...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[75vh] w-full border-4 border-black relative bg-gray-100"
            >
              <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
                <Button onClick={() => setView('info')} className="bg-black text-white rounded-none px-6 h-12 font-black uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-2">
                  <ArrowLeft size={16} /> Revert to Details
                </Button>
                <div className="bg-white p-4 border-2 border-black shadow-xl">
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Current Vessel Positioning</p>
                   <p className="text-sm font-black text-[#0A2F6E]">{shipment.current_location_name || "GPS Synchronizing..."}</p>
                </div>
              </div>

              {typeof window !== 'undefined' && (
                <MapContainer 
                  center={[shipment.current_lat || 59.3293, shipment.current_lng || 18.0686]} 
                  zoom={12} 
                  className="h-full w-full grayscale-[0.3]"
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; Alexandria Logistics'
                  />
                  <Polyline 
                    positions={[[shipment.sender_lat, shipment.sender_lng], [shipment.current_lat, shipment.current_lng]]}
                    color="#0A2F6E" weight={6}
                  />
                  <Polyline 
                    positions={[[shipment.current_lat, shipment.current_lng], [shipment.receiver_lat, shipment.receiver_lng]]}
                    color="#0A2F6E" weight={4} dashArray="8, 12" opacity={0.3}
                  />
                  <Marker position={[shipment.current_lat, shipment.current_lng]} icon={customIcon!} />
                </MapContainer>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-10 px-4 md:px-10 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
          ALEXANDRIA LOGISTICS CO. • VERIFIED SHIPMENT {shipment.tracking_id} • ALL RIGHTS RESERVED 2026
        </p>
      </footer>
    </div>
  );
}
