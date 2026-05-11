"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/lib/supabase-client";
import { 
  Ship, Package, MapPin, Clock, ShieldCheck, Search, Globe, Zap, 
  CheckCircle, ArrowRight, Navigation, Phone, Mail, FileText, 
  Truck, Plane, Anchor, Info, AlertCircle, ChevronLeft, User, 
  Printer, Share2, Download, ExternalLink, Map as MapIcon, 
  ChevronDown, ArrowLeft, Building2, Calendar, DollarSign, Hash, Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import TrackingMap from "@/components/TrackingMap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STATUS_MAP: Record<number, { label: string; color: string; bgColor: string }> = {
  1: { label: "Order Received", color: "#00458B", bgColor: "#E0EEFF" },
  2: { label: "Processing", color: "#00458B", bgColor: "#E0EEFF" },
  3: { label: "In Transit", color: "#00458B", bgColor: "#E0EEFF" },
  4: { label: "Arrived at Stop", color: "#00458B", bgColor: "#E0EEFF" },
  5: { label: "Out for Delivery", color: "#00458B", bgColor: "#E0EEFF" },
  6: { label: "Delivered", color: "#10B981", bgColor: "#D1FAE5" },
  7: { label: "On Hold", color: "#EF4444", bgColor: "#FEE2E2" },
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
    doc.setFillColor(0, 69, 139); // Alexandria Blue
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ALEXANDRIA SHIPPING", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL SHIPMENT MANIFEST & TRACKING REPORT", 20, 32);
    
    // Shipment ID
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Tracking ID: ${shipment.tracking_id}`, 20, 55);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 20, 62);
    
    // Status Box
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.rect(140, 48, 55, 20, 'FD');
    doc.setFont("helvetica", "bold");
    doc.text("CURRENT STATUS", 145, 55);
    doc.setTextColor(0, 69, 139);
    doc.setFontSize(12);
    doc.text(STATUS_MAP[shipment.status]?.label || "PENDING", 145, 63);
    
    // Sender/Receiver Table
    (doc as any).autoTable({
      startY: 75,
      head: [['SENDER INFORMATION', 'RECEIVER INFORMATION']],
      body: [[
        `${shipment.sender_name}\n${shipment.sender_address}\n${shipment.sender_country || ""}\nPhone: ${shipment.sender_phone || "N/A"}\nEmail: ${shipment.sender_email || "N/A"}`,
        `${shipment.receiver_name}\n${shipment.receiver_address}\n${shipment.receiver_country || ""}\nPhone: ${shipment.receiver_phone || "N/A"}\nEmail: ${shipment.receiver_email || "N/A"}`
      ]],
      theme: 'grid',
      headStyles: { fillColor: [0, 69, 139], textColor: [255, 255, 255] },
      styles: { fontSize: 9, cellPadding: 8 }
    });
    
    // Package Details
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['SHIPMENT PARAMETERS', 'VALUE']],
      body: [
        ['Service Level', shipment.service_level || 'Standard Freight'],
        ['Transport Mode', shipment.transport_type?.toUpperCase() || 'SEA'],
        ['Gross Weight', `${shipment.weight} KG`],
        ['Volume', `${shipment.volume} M3`],
        ['PO / Invoice #', shipment.po_number || 'N/A'],
        ['Dispatch Date', shipment.dispatch_date ? new Date(shipment.dispatch_date).toLocaleDateString() : 'N/A'],
        ['Est. Delivery', shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString() : 'Pending Update'],
        ['Payment Status', shipment.payment_status || 'Pending'],
        ['Pending Fees', shipment.pending_fees > 0 ? `$${Number(shipment.pending_fees).toFixed(2)}` : 'None']
      ],
      theme: 'striped',
      headStyles: { fillColor: [0, 69, 139], textColor: [255, 255, 255] }
    });

    // History
    if (updates.length > 0) {
      (doc as any).autoTable({
        startY: (doc as any).lastAutoTable.finalY + 10,
        head: [['DATE/TIME', 'STATUS', 'LOCATION/MESSAGE']],
        body: updates.map(u => [
          new Date(u.created_at).toLocaleString(),
          u.status || 'UPDATE',
          u.message || u.location || '-'
        ]),
        headStyles: { fillColor: [0, 69, 139], textColor: [255, 255, 255] }
      });
    }
    
    doc.save(`ALEX_SHIPMENT_${shipment.tracking_id}.pdf`);
  };

  const getTransportIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'air': return <Plane size={24} className="text-blue-600" />;
      case 'land': return <Truck size={24} className="text-blue-600" />;
      case 'sea':
      default: return <Ship size={24} className="text-blue-600" />;
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Retrieving Shipment Data...</p>
      </div>
    </div>
  );

  if (!shipment) return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
       <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Shipment Not Found</h2>
          <p className="text-slate-500 mb-6">The tracking ID you provided does not exist in our records.</p>
          <Button onClick={() => window.location.href='/tracking'}>Return to Search</Button>
       </div>
    </div>
  );

  const status = STATUS_MAP[shipment.status] || STATUS_MAP[1];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 pt-32">
        
        {/* Top Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
           <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="space-y-4">
                 <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                    <Globe size={14} /> Global Tracking System
                 </div>
                 <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Shipment <span className="text-blue-600">#{shipment.tracking_id}</span>
                 </h1>
                 <div className="flex flex-wrap gap-3 pt-2">
                    <Badge className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: status.bgColor, color: status.color }}>
                       {status.label}
                    </Badge>
                    <Badge variant="outline" className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-slate-200 text-slate-500">
                       {shipment.service_level || 'Standard Freight'}
                    </Badge>
                 </div>
              </div>

              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                 <Button 
                   onClick={() => setView(view === 'info' ? 'map' : 'info')}
                   className="flex-1 lg:flex-none h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all flex items-center gap-2"
                 >
                    {view === 'info' ? <><MapIcon size={18} /> View on Map</> : <><Info size={18} /> Shipment Details</>}
                 </Button>
                 <Button 
                   onClick={generatePDF}
                   variant="outline"
                   className="flex-1 lg:flex-none h-12 px-6 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-lg transition-all flex items-center gap-2"
                 >
                    <Printer size={18} /> Export Manifest
                 </Button>
              </div>
           </div>

           <Separator className="my-10" />

           {/* Quick Stats Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Delivery</p>
                 <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    <p className="text-xl font-bold text-slate-900">{shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Updating..."}</p>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transport Mode</p>
                 <div className="flex items-center gap-2">
                    {getTransportIcon(shipment.transport_type)}
                    <p className="text-xl font-bold text-slate-900 uppercase">{shipment.transport_type || "SEA"}</p>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight / Volume</p>
                 <div className="flex items-center gap-2">
                    <Package size={16} className="text-blue-600" />
                    <p className="text-xl font-bold text-slate-900">{shipment.weight} KG / {shipment.volume} M³</p>
                 </div>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{shipment.po_number ? 'PO / Reference' : 'Last Update'}</p>
                 <div className="flex items-center gap-2">
                    {shipment.po_number ? <Hash size={16} className="text-blue-600" /> : <Clock size={16} className="text-blue-600" />}
                    <p className="text-xl font-bold text-slate-900">{shipment.po_number || new Date(shipment.updated_at).toLocaleDateString()}</p>
                 </div>
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
           {view === 'info' ? (
              <motion.div 
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                 {/* Left Column: Details */}
                 <div className="lg:col-span-2 space-y-8">
                    {/* Journey Path */}
                    <Card className="border-none shadow-sm overflow-hidden">
                       <CardContent className="p-0">
                          <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                             <h3 className="font-bold flex items-center gap-2">
                                <Navigation size={18} className="text-blue-400" /> Shipment Progress
                             </h3>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Synchronization</span>
                          </div>
                          <div className="p-10 md:p-16">
                             <div className="flex flex-row items-start justify-between gap-6 relative overflow-x-auto pb-6 pt-4 custom-scrollbar">
                                <div className="absolute top-12 md:top-14 left-10 right-10 h-1 bg-slate-100 z-0 min-w-[max-content]" style={{ width: 'calc(100% - 80px)' }} />

                                {(() => {
                                  const points = [
                                    { 
                                      label: "Origin", 
                                      location: shipment.sender_address?.split(',')[0] || "Origin", 
                                      icon: Building2, 
                                      active: true,
                                      completed: shipment.current_stop_index >= 0 || shipment.status >= 3
                                    }
                                  ];
                                  
                                  if (shipment.stops && shipment.stops.length > 0) {
                                    shipment.stops.forEach((stop: any, index: number) => {
                                      points.push({
                                        label: `Stop ${index + 1}`,
                                        location: stop.name || `Waypoint ${index + 1}`,
                                        icon: MapPin,
                                        active: shipment.status >= 3 && (shipment.current_stop_index >= index || shipment.status >= 5),
                                        completed: stop.status === 'completed'
                                      });
                                    });
                                  } else {
                                    points.push({
                                      label: "In Transit", 
                                      location: shipment.status >= 3 ? (shipment.current_location || "Departed") : "Pending", 
                                      icon: MapPin, 
                                      active: shipment.status >= 3, 
                                      completed: shipment.status >= 5
                                    });
                                  }
                                  
                                  points.push({
                                    label: "Destination", 
                                    location: shipment.receiver_address?.split(',')[0] || "Destination", 
                                    icon: Anchor, 
                                    active: shipment.status >= 5,
                                    completed: shipment.status >= 5
                                  });

                                  return points.map((point, i) => (
                                    <div key={i} className="flex flex-col items-center gap-4 text-center flex-1 min-w-[120px] group relative">
                                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 relative ${point.active ? 'bg-blue-600 border-blue-100 text-white shadow-xl shadow-blue-600/20' : 'bg-white border-slate-100 text-slate-300'}`}>
                                         {point.active && !point.completed && <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />}
                                         <point.icon size={24} className="md:w-7 md:h-7" />
                                         {point.completed && <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white"><CheckCircle size={12} /></div>}
                                      </div>
                                      <div className="space-y-1 mt-2">
                                         <p className={`text-[10px] font-bold uppercase tracking-widest ${point.active ? 'text-blue-600' : 'text-slate-400'}`}>{point.label}</p>
                                         <p className={`text-sm font-bold ${point.active ? 'text-slate-900' : 'text-slate-400'} line-clamp-2 px-2`}>{point.location}</p>
                                      </div>
                                    </div>
                                  ));
                                })()}
                             </div>
                          </div>
                       </CardContent>
                    </Card>

                    {/* Timeline History */}
                    <div className="space-y-6">
                       <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <Clock size={20} className="text-blue-600" /> Shipment History
                       </h3>
                       <div className="space-y-4">
                          {updates.length > 0 ? updates.map((update, i) => (
                             <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.1 }}
                               key={i} 
                               className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex gap-6"
                             >
                                <div className="flex flex-col items-center">
                                   <div className={`w-3 h-3 rounded-full mt-1.5 ${i === 0 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-200'}`} />
                                   {i !== updates.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-2" />}
                                </div>
                                <div className="space-y-2 flex-1">
                                   <div className="flex items-center justify-between">
                                      <p className="font-bold text-slate-900">{update.status || shipment.status_name}</p>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(update.created_at).toLocaleString()}</span>
                                   </div>
                                   <p className="text-sm text-slate-500 leading-relaxed">{update.message || update.location || "Operational update verified at logistics hub."}</p>
                                </div>
                             </motion.div>
                          )) : (
                             <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-200">
                                <Clock size={40} className="text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Awaiting first status update...</p>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Right Column: Info Cards */}
                 <div className="space-y-8">
                    {/* Pending Fees Alert */}
                    {shipment.pending_fees > 0 && (
                       <Card className="border-2 border-amber-300 bg-amber-50 shadow-sm">
                          <CardContent className="p-6 flex items-start gap-4">
                             <div className="p-3 bg-amber-100 rounded-xl">
                                <DollarSign size={24} className="text-amber-700" />
                             </div>
                             <div className="flex-1">
                                <p className="font-bold text-amber-900 text-lg">Outstanding Balance</p>
                                <p className="text-sm text-amber-700 mt-1">A fee of <span className="font-black text-amber-900">${Number(shipment.pending_fees).toFixed(2)}</span> is required before delivery can proceed. Please contact our team to settle this balance.</p>
                             </div>
                          </CardContent>
                       </Card>
                    )}

                 {/* Consignor/Consignee Info */}
                    <Card className="border-none shadow-sm">
                       <CardContent className="p-8 space-y-8">
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                <Building2 size={14} /> Consignor Details
                             </div>
                             <div>
                                <p className="text-xl font-bold text-slate-900">{shipment.sender_name}</p>
                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{shipment.sender_address}</p>
                                {shipment.sender_country && <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Flag size={10} /> {shipment.sender_country}</p>}
                             </div>
                             {(shipment.sender_phone || shipment.sender_email) && (
                                <div className="flex flex-wrap gap-4 pt-2">
                                   {shipment.sender_phone && <a href={`tel:${shipment.sender_phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors"><Phone size={12} /> {shipment.sender_phone}</a>}
                                   {shipment.sender_email && <a href={`mailto:${shipment.sender_email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors"><Mail size={12} /> {shipment.sender_email}</a>}
                                </div>
                             )}
                          </div>
                          <Separator />
                          <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                <MapPin size={14} /> Consignee Details
                             </div>
                             <div>
                                <p className="text-xl font-bold text-slate-900">{shipment.receiver_name}</p>
                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{shipment.receiver_address}</p>
                                {shipment.receiver_country && <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Flag size={10} /> {shipment.receiver_country}</p>}
                             </div>
                             {(shipment.receiver_phone || shipment.receiver_email) && (
                                <div className="flex flex-wrap gap-4 pt-2">
                                   {shipment.receiver_phone && <a href={`tel:${shipment.receiver_phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors"><Phone size={12} /> {shipment.receiver_phone}</a>}
                                   {shipment.receiver_email && <a href={`mailto:${shipment.receiver_email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors"><Mail size={12} /> {shipment.receiver_email}</a>}
                                </div>
                             )}
                          </div>
                       </CardContent>
                    </Card>

                    {/* Support Card */}
                    <Card className="bg-blue-600 text-white border-none shadow-xl relative overflow-hidden">
                       <div className="absolute -right-8 -bottom-8 opacity-10">
                          <Ship size={160} />
                       </div>
                       <CardContent className="p-8 relative z-10 space-y-6">
                          <h4 className="text-xl font-bold">Need assistance?</h4>
                          <p className="text-blue-100 text-sm leading-relaxed">
                             Our dedicated customer service team is available to help you with any questions regarding this shipment.
                          </p>
                          <div className="space-y-4 pt-2">
                             <a href="tel:+310101234567" className="flex items-center gap-3 text-sm font-bold hover:text-white transition-colors">
                                <div className="p-2 bg-white/10 rounded-lg"><Phone size={16} /></div>
                                +31 (0) 10 123 4567
                             </a>
                             <a href="mailto:support@alexandria-shipping.com" className="flex items-center gap-3 text-sm font-bold hover:text-white transition-colors">
                                <div className="p-2 bg-white/10 rounded-lg"><Mail size={16} /></div>
                                support@alexandria-shipping.com
                             </a>
                          </div>
                       </CardContent>
                    </Card>
                 </div>
              </motion.div>
           ) : (
              <motion.div 
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[75vh] w-full rounded-2xl border border-slate-200 overflow-hidden relative shadow-2xl bg-white"
              >
                <div className="absolute top-6 left-6 z-[50] flex flex-col gap-4">
                   <Button 
                     onClick={() => setView('info')} 
                     className="bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 rounded-lg px-6 h-12 font-bold shadow-xl flex items-center gap-2 transition-all"
                   >
                     <ChevronLeft size={18} /> Back to Details
                   </Button>
                   <div className="bg-white/90 backdrop-blur-md p-6 border border-slate-200 rounded-xl shadow-xl max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                         <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Current Position</p>
                      </div>
                      <p className="text-lg font-bold text-slate-900 leading-tight">
                         {shipment.current_location || "Synchronizing GPS..."}
                      </p>
                   </div>
                </div>

                <TrackingMap 
                  pickup={{ lat: shipment.sender_lat, lng: shipment.sender_lng, label: shipment.sender_address }}
                  dropoff={{ lat: shipment.receiver_lat, lng: shipment.receiver_lng, label: shipment.receiver_address }}
                  currentLocation={{ 
                    lat: shipment.current_lat, 
                    lng: shipment.current_lng, 
                    label: shipment.current_location || "In Transit" 
                  }}
                  history={updates.slice().reverse().map((u: any) => ({ lat: u.lat, lng: u.lng })).filter((u: any) => typeof u.lat === 'number' && typeof u.lng === 'number')}
                  stops={shipment.stops || []}
                  status={shipment.status}
                  transportType={shipment.transport_type as any}
                  interactive={true}
                />
              </motion.div>
           )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
