"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, Plus, Trash2, Calendar, Weight, Box, Info, MapPin, 
  Package, Search, Loader2, Copy, Check, Upload, FileText, 
  Image as ImageIcon, Flag, User, Briefcase, Tag, Clock, RotateCcw,
  Globe, Shield, DollarSign, ArrowUpRight, Users, Navigation2, Activity,
  Printer, Trash, CreditCard, Mail, Phone, Map, DollarSign as Money,
  Plane, Ship, Truck
} from "lucide-react";
import { createClient, getStoragePathFromUrl } from "@/lib/supabase-client";
import dynamic from "next/dynamic";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import EmailModal from "./EmailModal";
import { sendShipmentUpdateEmail } from "@/app/actions/email";

const TrackingMap = dynamic(() => import("@/components/TrackingMap"), { ssr: false });

interface Stop {
  name: string;
  lat: number;
  lng: number;
  status: 'pending' | 'completed';
}

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  shipment?: any;
}

const SERVICE_LEVELS = ["Standard", "Express", "Air Freight", "Priority Maritime"];
const PAYMENT_STATUSES = ["Paid", "Cancelled", "Refundable", "On Hold"];
const PAYMENT_METHODS = ["Bank", "PayPal", "Card", "Zelle", "Venmo", "Cashapp"];
const PACKAGE_STATUSES = [
  { id: 1, label: "Order Received" },
  { id: 2, label: "Processing" },
  { id: 3, label: "In Transit" },
  { id: 4, label: "Arrived at Stop" },
  { id: 5, label: "Out for Delivery" },
  { id: 6, label: "Delivered" },
  { id: 7, label: "On Hold" }
];

export default function ShipmentModal({ isOpen, onClose, onSuccess, shipment }: ShipmentModalProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // ─── EMAIL MODAL STATE ───
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [pendingUpdateData, setPendingUpdateData] = useState<any>(null);

  const [formData, setFormData] = useState({
    tracking_id: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    sender_name: "",
    sender_address: "",
    sender_lat: 0,
    sender_lng: 0,
    receiver_name: "",
    receiver_address: "",
    receiver_lat: 0,
    receiver_lng: 0,
    status: 1,
    service_level: "Standard",
    payment_status: "On Hold",
    payment_method: "Bank",
    weight: 0,
    volume: 0,
    estimated_delivery: "",
    internal_notes: "",
    transport_type: "land" as "land" | "sea" | "air",
    amount: 0,
    stops: [] as Stop[],
    current_stop_index: -1,
    last_status_update: new Date().toISOString()
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shipment) {
      setFormData({
        tracking_id: shipment.tracking_id || "",
        customer_name: shipment.customer_name || "",
        customer_email: shipment.customer_email || "",
        customer_phone: shipment.customer_phone || "",
        sender_name: shipment.sender_name || "",
        sender_address: shipment.sender_address || "",
        sender_lat: shipment.sender_lat || 0,
        sender_lng: shipment.sender_lng || 0,
        receiver_name: shipment.receiver_name || "",
        receiver_address: shipment.receiver_address || "",
        receiver_lat: shipment.receiver_lat || 0,
        receiver_lng: shipment.receiver_lng || 0,
        status: shipment.status || 1,
        service_level: shipment.service_level || "Standard",
        payment_status: shipment.payment_status || "On Hold",
        payment_method: shipment.payment_method || "Bank",
        weight: shipment.weight || 0,
        volume: shipment.volume || 0,
        estimated_delivery: shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toISOString().split('T')[0] : "",
        internal_notes: shipment.internal_notes || "",
        transport_type: shipment.transport_type || "land",
        amount: shipment.shipment_items?.[0]?.price || 0,
        stops: shipment.stops || [],
        current_stop_index: shipment.current_stop_index ?? -1,
        last_status_update: shipment.last_status_update || new Date().toISOString()
      });
    } else {
      resetForm();
    }
  }, [shipment, isOpen]);

  const resetForm = () => {
    setFormData({
      tracking_id: `ALX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      sender_name: "Alexandria Freight Co.",
      sender_address: "128 Terminal Way, Alexandria, VA",
      sender_lat: 38.8048,
      sender_lng: -77.0469,
      receiver_name: "",
      receiver_address: "",
      receiver_lat: 0,
      receiver_lng: 0,
      status: 1,
      service_level: "Standard",
      payment_status: "Pending",
      payment_method: "Bank",
      weight: 0,
      volume: 0,
      estimated_delivery: "",
      internal_notes: "",
      transport_type: "land",
      amount: 0,
      stops: [],
      current_stop_index: -1,
      last_status_update: new Date().toISOString()
    });
  };

  const handleAddStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, { name: "", lat: 0, lng: 0, status: 'pending' }]
    }));
  };

  const handleRemoveStop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
      current_stop_index: prev.current_stop_index >= index ? prev.current_stop_index - 1 : prev.current_stop_index
    }));
  };

  const updateStop = (index: number, field: keyof Stop, value: any) => {
    setFormData(prev => {
      const newStops = [...prev.stops];
      newStops[index] = { ...newStops[index], [field]: value };
      return { ...prev, stops: newStops };
    });
  };

  const handleGeocode = async (address: string, callback: (lat: number, lng: number) => void) => {
    if (!address) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        callback(isNaN(lat) ? 0 : lat, isNaN(lng) ? 0 : lng);
      }
    } catch (err) { console.error("Geocoding error:", err); }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.customer_name || !formData.receiver_name || !formData.receiver_address) {
      setError("Please fill in required fields.");
      setLoading(false);
      return;
    }

    const isStatusChanged = !shipment || shipment.status !== formData.status || shipment.current_stop_index !== formData.current_stop_index;

    if (isStatusChanged) {
      setIsEmailModalOpen(true);
      setPendingUpdateData(formData);
      setLoading(false);
      return;
    }

    await finalizeSave(formData);
  };

  const finalizeSave = async (dataToSave: typeof formData, emailContent?: string) => {
    setLoading(true);
    try {
      const finalPayload = {
        tracking_id: dataToSave.tracking_id,
        customer_name: dataToSave.customer_name,
        customer_email: dataToSave.customer_email,
        customer_phone: dataToSave.customer_phone,
        sender_name: dataToSave.sender_name,
        sender_address: dataToSave.sender_address,
        sender_lat: Number(dataToSave.sender_lat) || 0,
        sender_lng: Number(dataToSave.sender_lng) || 0,
        receiver_name: dataToSave.receiver_name,
        receiver_address: dataToSave.receiver_address,
        receiver_lat: Number(dataToSave.receiver_lat) || 0,
        receiver_lng: Number(dataToSave.receiver_lng) || 0,
        status: Number(dataToSave.status) || 1,
        service_level: dataToSave.service_level,
        payment_status: dataToSave.payment_status,
        payment_method: dataToSave.payment_method,
        weight: Number(dataToSave.weight) || 0,
        volume: Number(dataToSave.volume) || 0,
        internal_notes: dataToSave.internal_notes,
        transport_type: dataToSave.transport_type,
        stops: dataToSave.stops || [],
        current_stop_index: Number(dataToSave.current_stop_index) ?? -1,
        last_status_update: new Date().toISOString(),
        estimated_delivery: dataToSave.estimated_delivery ? new Date(dataToSave.estimated_delivery).toISOString() : null,
        updated_at: new Date().toISOString()
      };

      if (shipment) {
        const { error: sError } = await supabase.from('shipments').update(finalPayload).eq('id', shipment.id);
        if (sError) {
          console.error("Supabase Update Error:", sError);
          throw sError;
        }
        
        await supabase.from('shipment_updates').insert({
          shipment_id: shipment.id,
          status: finalPayload.status,
          location: dataToSave.current_stop_index === -1 ? dataToSave.sender_address : (dataToSave.stops[dataToSave.current_stop_index]?.name || "In Transit"),
          message: emailContent || `Shipment status updated to ${PACKAGE_STATUSES.find(s=>s.id===finalPayload.status)?.label}`,
          email_sent: !!emailContent
        });
      } else {
        const { data: newShip, error: sError } = await supabase.from('shipments').insert([finalPayload]).select().single();
        if (sError) {
          console.error("Supabase Insert Error:", sError);
          throw sError;
        }
        
        if (newShip) {
          await supabase.from('shipment_updates').insert({
            shipment_id: newShip.id,
            status: finalPayload.status,
            location: dataToSave.sender_address,
            message: "Shipment record created in Alexandria system.",
            email_sent: false
          });

          await supabase.from('shipment_items').insert({ 
            shipment_id: newShip.id, 
            item_name: "Shipment Total", 
            price: dataToSave.amount || 0, 
            quantity: 1 
          });
        }
      }

      if (emailContent) {
        await sendShipmentUpdateEmail({
          to: dataToSave.customer_email,
          subject: `Alexandria: Update for ${dataToSave.tracking_id}`,
          content: emailContent
        });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("FinalizeSave Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmArrival = () => {
    const nextIndex = formData.current_stop_index + 1;
    if (nextIndex < formData.stops.length) {
      const newStops = [...formData.stops];
      newStops[nextIndex].status = 'completed';
      setFormData(prev => ({
        ...prev,
        stops: newStops,
        current_stop_index: nextIndex,
        status: 4 // Arrived at Stop
      }));
    } else {
      setFormData(prev => ({ ...prev, current_stop_index: formData.stops.length, status: 6 })); // Delivered
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 bg-white border-none rounded-[32px] shadow-2xl flex flex-col font-sans">
          
          <header className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-600 flex items-center justify-center text-white rounded-2xl shadow-lg shadow-blue-200">
                 <Package size={28} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                  {shipment ? 'Modify Shipment' : 'Register New Shipment'}
                </DialogTitle>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  ID: <span className="text-blue-600 font-bold">{formData.tracking_id}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 text-slate-400">
                <X size={24} />
              </Button>
            </div>
          </header>

          <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-10 bg-white border-b border-slate-100 shrink-0">
              <TabsList className="bg-transparent gap-8 h-14 p-0">
                <TabsTrigger value="details" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 font-bold text-slate-400 transition-all">General Details</TabsTrigger>
                <TabsTrigger value="route" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 font-bold text-slate-400 transition-all flex gap-2 items-center">
                  <Map size={16} /> Route & Movement
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-10">
              <form id="shipment-form" onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-10">
                
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
                    <Info size={18} /> {error}
                  </div>
                )}

                <TabsContent value="details" className="m-0 space-y-10 focus-visible:outline-none">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <User size={16} /> Customer Contact
                      </h3>
                      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Customer Name</Label>
                          <Input value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all" placeholder="Enter name..." />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</Label>
                          <Input value={formData.customer_email} onChange={e => setFormData({...formData, customer_email: e.target.value})} className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all" placeholder="customer@email.com" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <MapPin size={16} /> Final Destination
                      </h3>
                      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Receiver Name</Label>
                          <Input value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Delivery Address</Label>
                          <div className="flex gap-2">
                            <Input value={formData.receiver_address} onChange={e => setFormData({...formData, receiver_address: e.target.value})} className="h-12 bg-slate-50/50 border-slate-100 rounded-xl focus:bg-white transition-all flex-1" />
                            <Button type="button" variant="secondary" onClick={() => handleGeocode(formData.receiver_address, (lat, lng) => setFormData(prev=>({...prev, receiver_lat: lat, receiver_lng: lng})))} className="h-12 w-12 p-0 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0">
                              <Search size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <Activity size={16} /> Logistics & Status
                      </h3>
                      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Status</Label>
                          <Select value={formData.status.toString()} onValueChange={v => setFormData({...formData, status: parseInt(v)})}>
                            <SelectTrigger className="h-12 bg-slate-50/50 border-slate-100 rounded-xl font-bold text-blue-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                              {PACKAGE_STATUSES.map(s => (
                                <SelectItem key={s.id} value={s.id.toString()} className="font-medium py-3">{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Transport Mode</Label>
                          <div className="flex p-1 bg-slate-100 rounded-xl">
                            {(['land', 'sea', 'air'] as const).map(type => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({...formData, transport_type: type})}
                                className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-all ${formData.transport_type === type ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                              >
                                {type === 'air' ? <Plane size={18} /> : type === 'sea' ? <Ship size={18} /> : <Truck size={18} />}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Est. Delivery</Label>
                          <Input type="date" value={formData.estimated_delivery} onChange={e => setFormData({...formData, estimated_delivery: e.target.value})} className="h-12 bg-slate-50/50 border-slate-100 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="route" className="m-0 space-y-8 focus-visible:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Waypoints ({formData.stops.length})</h3>
                        <Button type="button" onClick={handleAddStop} size="sm" variant="outline" className="rounded-xl border-blue-100 text-blue-600 hover:bg-blue-50 font-bold px-4">
                          <Plus size={16} className="mr-1" /> Add Stop
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {formData.stops.map((stop, idx) => (
                          <div key={idx} className={`p-5 rounded-2xl border transition-all ${idx === formData.current_stop_index ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${idx <= formData.current_stop_index ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                {idx <= formData.current_stop_index ? 'Reached' : `Stop #${idx + 1}`}
                              </span>
                              <button type="button" onClick={() => handleRemoveStop(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="space-y-3">
                              <Input 
                                value={stop.name} 
                                onChange={e => updateStop(idx, 'name', e.target.value)}
                                className="h-10 text-sm font-bold border-slate-100" 
                                placeholder="Stop Name (e.g. Dubai Port)"
                              />
                              <div className="flex gap-2">
                                <Input 
                                  readOnly 
                                  value={stop.lat ? `${stop.lat.toFixed(4)}, ${stop.lng.toFixed(4)}` : "No coordinates"}
                                  className="h-8 text-[10px] bg-slate-50 border-none font-mono text-slate-400" 
                                />
                                <Button type="button" size="sm" variant="ghost" onClick={() => handleGeocode(stop.name, (lat, lng) => {
                                  updateStop(idx, 'lat', lat);
                                  updateStop(idx, 'lng', lng);
                                })} className="h-8 px-2 text-blue-600 hover:bg-blue-100">
                                  <Search size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {formData.stops.length === 0 && (
                          <div className="text-center py-10 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Direct Route: No stops defined</p>
                          </div>
                        )}
                      </div>

                      {formData.current_stop_index < formData.stops.length && (
                        <Button 
                          type="button"
                          onClick={handleConfirmArrival}
                          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex gap-2 items-center justify-center shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
                        >
                          <Check size={20} />
                          {formData.current_stop_index === -1 ? 'Confirm First Stop Arrival' : 'Confirm Next Stop Arrival'}
                        </Button>
                      )}
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Tactical Movement Map</h3>
                      <div className="h-[500px] rounded-[32px] overflow-hidden border border-slate-100 shadow-inner bg-slate-200 relative">
                        <TrackingMap 
                          pickup={formData.sender_lat ? { lat: formData.sender_lat, lng: formData.sender_lng, label: 'Origin' } : undefined}
                          dropoff={formData.receiver_lat ? { lat: formData.receiver_lat, lng: formData.receiver_lng, label: 'Destination' } : undefined}
                          stops={formData.stops}
                          currentStopIndex={formData.current_stop_index}
                          lastUpdate={formData.last_status_update}
                          transportType={formData.transport_type}
                        />
                        <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl pointer-events-none">
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Live Telemetry</p>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Active Movement: {formData.transport_type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </div>

            <footer className="px-10 py-8 bg-white border-t border-slate-100 flex items-center justify-end gap-4 shrink-0">
              <Button variant="ghost" onClick={onClose} className="rounded-2xl font-bold text-sm px-8 h-14 text-slate-400 hover:text-slate-900 transition-colors">
                Discard Changes
              </Button>
              <Button 
                type="submit" 
                form="shipment-form" 
                disabled={loading} 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px] font-black text-sm px-10 h-14 shadow-xl shadow-blue-200 transition-all active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : <Check className="mr-2 w-5 h-5" />}
                Save Tracking Profile
              </Button>
            </footer>
          </Tabs>

        </DialogContent>
      </Dialog>

      <EmailModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={(content) => {
          setIsEmailModalOpen(false);
          finalizeSave(pendingUpdateData, content);
        }}
        recipientEmail={formData.customer_email}
        recipientName={formData.customer_name}
        trackingId={formData.tracking_id}
        currentStatus={PACKAGE_STATUSES.find(s=>s.id===formData.status)?.label || 'Updated'}
        location={formData.current_stop_index === -1 ? 'Origin' : (formData.stops[formData.current_stop_index]?.name || "In Transit")}
      />
    </>
  );
}
