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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shipment?: any;
}

const SERVICE_LEVELS = ["Standard", "Express", "Air Freight", "Priority Maritime"];
const PAYMENT_STATUSES = ["Paid", "Cancelled", "Refundable", "On Hold"];
const PAYMENT_METHODS = ["ACH", "Bank", "CashApp", "Venmo", "Zelle", "Visacard", "Apple Pay", "Google Pay", "Crypto", "Chime", "Paypal"];
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pendingUpdateData, setPendingUpdateData] = useState<any>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    tracking_id: "",
    sender_name: "",
    sender_email: "",
    sender_phone: "",
    sender_country: "",
    sender_address: "",
    sender_lat: 0,
    sender_lng: 0,
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    receiver_country: "",
    receiver_address: "",
    receiver_lat: 0,
    receiver_lng: 0,
    origin: "",
    destination: "",
    current_location: "",
    current_lat: 0,
    current_lng: 0,
    status: 1,
    service_level: "Standard",
    payment_status: "On Hold",
    payment_method: "Bank",
    weight: 0,
    weight_unit: "kg" as "kg" | "lbs",
    volume: 0,
    estimated_delivery: "",
    dispatch_date: "",
    internal_notes: "",
    transport_type: "land" as "land" | "sea" | "air",
    amount: 0,
    po_number: "",
    pending_fees: 0,
    stops: [] as Stop[],
    current_stop_index: -1,
    last_status_update: new Date().toISOString()
  });

  const [copied, setCopied] = useState(false);

  const resetForm = () => {
    setFormData({
      tracking_id: `ALX-${Math.floor(10000000 + Math.random() * 90000000)}`,
      sender_name: "",
      sender_email: "",
      sender_phone: "",
      sender_country: "",
      sender_address: "",
      sender_lat: 0,
      sender_lng: 0,
      receiver_name: "",
      receiver_email: "",
      receiver_phone: "",
      receiver_country: "",
      receiver_address: "",
      receiver_lat: 0,
      receiver_lng: 0,
      origin: "",
      destination: "",
      current_location: "",
      current_lat: 0,
      current_lng: 0,
      status: 1,
      service_level: "Standard",
      payment_status: "Pending",
      payment_method: "Bank",
      weight: 0,
      weight_unit: "kg",
      volume: 0,
      estimated_delivery: "",
      dispatch_date: "",
      internal_notes: "",
      transport_type: "land",
      amount: 0,
      po_number: "",
      pending_fees: 0,
      stops: [],
      current_stop_index: -1,
      last_status_update: new Date().toISOString()
    });
  };

  useEffect(() => {
    if (shipment) {
      setFormData({
        tracking_id: shipment.tracking_id || "",
        sender_name: shipment.sender_name || "",
        sender_email: shipment.sender_email || "",
        sender_phone: shipment.sender_phone || "",
        sender_country: shipment.sender_country || "",
        sender_address: shipment.sender_address || "",
        sender_lat: shipment.sender_lat || 0,
        sender_lng: shipment.sender_lng || 0,
        receiver_name: shipment.receiver_name || "",
        receiver_email: shipment.receiver_email || "",
        receiver_phone: shipment.receiver_phone || "",
        receiver_country: shipment.receiver_country || "",
        receiver_address: shipment.receiver_address || "",
        receiver_lat: shipment.receiver_lat || 0,
        receiver_lng: shipment.receiver_lng || 0,
        origin: shipment.origin || "",
        destination: shipment.destination || "",
        current_location: shipment.current_location || "",
        current_lat: shipment.current_lat || 0,
        current_lng: shipment.current_lng || 0,
        status: shipment.status || 1,
        service_level: shipment.service_level || "Standard",
        payment_status: shipment.payment_status || "On Hold",
        payment_method: shipment.payment_method || "Bank",
        weight: shipment.weight || 0,
        weight_unit: shipment.weight_unit || "kg",
        volume: shipment.volume || 0,
        estimated_delivery: shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toISOString().slice(0, 16) : "",
        dispatch_date: shipment.dispatch_date ? new Date(shipment.dispatch_date).toISOString().slice(0, 16) : "",
        internal_notes: shipment.internal_notes || "",
        transport_type: shipment.transport_type || "land",
        amount: shipment.shipment_items?.[0]?.price || shipment.amount || 0,
        po_number: shipment.po_number || "",
        pending_fees: shipment.pending_fees || 0,
        stops: shipment.stops || [],
        current_stop_index: shipment.current_stop_index ?? -1,
        last_status_update: shipment.last_status_update || new Date().toISOString()
      });
    } else {
      resetForm();
    }
  }, [shipment, isOpen]);

  // resetForm was moved above

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateStop = (index: number, field: keyof Stop, value: any) => {
    setFormData(prev => {
      const newStops = [...prev.stops];
      newStops[index] = { ...newStops[index], [field]: value };
      return { ...prev, stops: newStops };
    });
  };

  const handleGeocode = async (address: string, callback: (lat: number, lng: number) => void) => {
    if (!address) return;
    setIsGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        callback(isNaN(lat) ? 0 : lat, isNaN(lng) ? 0 : lng);
      }
    } catch (err) { 
      console.error("Geocoding error:", err); 
    } finally {
      setIsGeocoding(false);
    }
  };

  const forceGeocode = (type: 'sender' | 'receiver' | 'current') => {
    const address = type === 'sender' ? formData.sender_address 
                  : type === 'receiver' ? formData.receiver_address 
                  : formData.current_location;
    
    const latField = type === 'sender' ? 'sender_lat' 
                   : type === 'receiver' ? 'receiver_lat' 
                   : 'current_lat';
                   
    const lngField = type === 'sender' ? 'sender_lng' 
                   : type === 'receiver' ? 'receiver_lng' 
                   : 'current_lng';
                   
    if (address) {
      handleGeocode(address, (lat, lng) => setFormData(prev => ({...prev, [latField]: lat, [lngField]: lng})));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'sender' | 'receiver' | 'current') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      forceGeocode(type);
    }
  };

  // Auto-geocode current_location when it changes
  useEffect(() => {
    if (!isOpen || !formData.current_location || !shipment) return;
    if (formData.current_location === shipment.current_location) return;

    if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);
    geocodeTimeoutRef.current = setTimeout(() => {
      forceGeocode('current');
    }, 2000); 

    return () => {
      if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.current_location, isOpen, shipment]);

  // Auto-geocode sender_address
  useEffect(() => {
    if (!isOpen || !formData.sender_address || !shipment) return;
    if (formData.sender_address === shipment.sender_address) return;

    const timeout = setTimeout(() => {
      forceGeocode('sender');
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.sender_address, isOpen, shipment]);

  // Auto-geocode receiver_address
  useEffect(() => {
    if (!isOpen || !formData.receiver_address || !shipment) return;
    if (formData.receiver_address === shipment.receiver_address) return;

    const timeout = setTimeout(() => {
      forceGeocode('receiver');
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.receiver_address, isOpen, shipment]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.sender_name || !formData.receiver_name || !formData.receiver_address) {
      setError("Please fill in required fields.");
      setLoading(false);
      return;
    }

    const isStatusChanged = !shipment || 
      shipment.status !== formData.status || 
      shipment.current_stop_index !== formData.current_stop_index ||
      shipment.current_location !== formData.current_location;

    if (isStatusChanged) {
      setIsEmailModalOpen(true);
      setPendingUpdateData(formData);
      setLoading(false);
      return;
    }

    await finalizeSave(formData, undefined, false);
  };

  const finalizeSave = async (dataToSave: typeof formData, emailContent?: string, shouldLog = true) => {
    setLoading(true);
    try {
      const finalPayload = {
        tracking_id: dataToSave.tracking_id,
        sender_name: dataToSave.sender_name,
        sender_email: dataToSave.sender_email,
        sender_phone: dataToSave.sender_phone,
        sender_country: dataToSave.sender_country,
        sender_address: dataToSave.sender_address,
        sender_lat: Number(dataToSave.sender_lat) || 0,
        sender_lng: Number(dataToSave.sender_lng) || 0,
        receiver_name: dataToSave.receiver_name,
        receiver_email: dataToSave.receiver_email,
        receiver_phone: dataToSave.receiver_phone,
        receiver_country: dataToSave.receiver_country,
        receiver_address: dataToSave.receiver_address,
        receiver_lat: Number(dataToSave.receiver_lat) || 0,
        receiver_lng: Number(dataToSave.receiver_lng) || 0,
        origin: dataToSave.origin,
        destination: dataToSave.destination,
        current_location: dataToSave.current_location,
        current_lat: Number(dataToSave.current_lat) || 0,
        current_lng: Number(dataToSave.current_lng) || 0,
        status: Number(dataToSave.status) || 1,
        service_level: dataToSave.service_level,
        payment_status: dataToSave.payment_status,
        payment_method: dataToSave.payment_method,
        weight: Number(dataToSave.weight) || 0,
        weight_unit: dataToSave.weight_unit,
        volume: Number(dataToSave.volume) || 0,
        internal_notes: dataToSave.internal_notes,
        transport_type: dataToSave.transport_type,
        po_number: dataToSave.po_number,
        pending_fees: Number(dataToSave.pending_fees) || 0,
        stops: dataToSave.stops || [],
        current_stop_index: Number(dataToSave.current_stop_index) ?? -1,
        last_status_update: new Date().toISOString(),
        estimated_delivery: dataToSave.estimated_delivery ? new Date(dataToSave.estimated_delivery).toISOString() : null,
        dispatch_date: dataToSave.dispatch_date ? new Date(dataToSave.dispatch_date).toISOString() : null,
        updated_at: new Date().toISOString(),
        amount: Number(dataToSave.amount) || 0
      };

      if (shipment) {
        const { error: sError } = await supabase.from('shipments').update(finalPayload).eq('id', shipment.id);
        if (sError) {
          console.error("Supabase Update Error:", sError);
          throw sError;
        }
        
        if (shouldLog) {
          await supabase.from('shipment_updates').insert({
            shipment_id: shipment.id,
            status: finalPayload.status,
            location: dataToSave.current_location || "In Transit",
            lat: finalPayload.current_lat,
            lng: finalPayload.current_lng,
            message: emailContent || `Shipment status updated to ${PACKAGE_STATUSES.find(s=>s.id===finalPayload.status)?.label}`,
            email_sent: !!emailContent
          });
        }
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
            lat: finalPayload.sender_lat,
            lng: finalPayload.sender_lng,
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
          to: dataToSave.receiver_email,
          subject: `Alexandria: Update for ${dataToSave.tracking_id}`,
          content: emailContent
        });
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <DialogContent className="max-w-5xl w-[95vw] md:w-full max-h-[95vh] overflow-hidden p-0 bg-white border-none rounded-2xl md:rounded-[32px] shadow-2xl flex flex-col font-sans">
          
          <header className="px-6 py-6 md:px-10 md:py-10 border-b border-navy/5 flex items-start sm:items-center justify-between bg-white shrink-0 flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-navy flex items-center justify-center text-white rounded-xl md:rounded-2xl shadow-xl shadow-navy/20 shrink-0">
                 <Package size={32} />
              </div>
              <div>
                <DialogTitle className="text-3xl font-serif font-black text-navy leading-tight">
                  {shipment ? 'Modify Manifest' : 'Register New Cargo'}
                </DialogTitle>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black text-navy/40 uppercase tracking-[0.2em]">Shipment ID:</span>
                  <span className="text-xs font-black text-navy bg-slate-50 px-2 py-0.5 rounded border border-navy/5 tracking-wider">{formData.tracking_id}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-50 text-navy/20 hover:text-navy transition-all">
                <X size={24} />
              </Button>
            </div>
          </header>

          <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 md:px-10 bg-white border-b border-navy/5 shrink-0 overflow-x-auto custom-scrollbar">
              <TabsList className="bg-transparent gap-6 md:gap-10 h-16 p-0 min-w-max">
                <TabsTrigger value="details" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-navy data-[state=active]:bg-transparent data-[state=active]:text-navy font-black text-[10px] uppercase tracking-[0.2em] text-navy/30 transition-all">Manifest Details</TabsTrigger>
                <TabsTrigger value="route" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-navy data-[state=active]:bg-transparent data-[state=active]:text-navy font-black text-[10px] uppercase tracking-[0.2em] text-navy/30 transition-all flex gap-2 items-center">
                  <Map size={14} /> Tactical Route
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto bg-parchment p-6 md:p-12 custom-scrollbar">
              <form id="shipment-form" onSubmit={handleSubmit} className="space-y-8 md:space-y-12 max-w-5xl mx-auto pb-10">
                
                {error && (
                  <div className="p-5 bg-red-50 text-signal-red rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 border border-signal-red/10 animate-in fade-in slide-in-from-top-2">
                    <Info size={16} /> {error}
                  </div>
                )}

                <TabsContent value="details" className="m-0 space-y-8 md:space-y-12 focus-visible:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Column 1: Participants */}
                    <div className="space-y-8 md:space-y-12">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30 flex items-center gap-2">
                          <User size={14} /> Consignor (Sender)
                        </h3>
                        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-navy/5 shadow-sm space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Identity / Name</Label>
                            <Input value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="Full Name or Entity" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Email Address</Label>
                              <Input value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="sender@domain.io" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Phone Number</Label>
                              <Input value={formData.sender_phone} onChange={e => setFormData({...formData, sender_phone: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="+1 (555) 123-4567" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Country</Label>
                            <Input value={formData.sender_country} onChange={e => setFormData({...formData, sender_country: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="e.g. United States" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Origin Point Address</Label>
                            <div className="flex gap-2 relative">
                              <Input 
                                value={formData.sender_address} 
                                onChange={e => setFormData({...formData, sender_address: e.target.value})} 
                                onBlur={() => forceGeocode('sender')}
                                onKeyDown={(e) => handleKeyDown(e, 'sender')}
                                className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none flex-1" 
                                placeholder="Street, City, State" 
                              />
                              <Button type="button" variant="secondary" onClick={() => forceGeocode('sender')} className="h-12 w-12 p-0 rounded-xl bg-navy text-white hover:bg-navy-dark shrink-0">
                                {isGeocoding ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                              </Button>
                              {(formData.sender_lat !== 0 || formData.sender_lng !== 0) && !isGeocoding && (
                                <div className="absolute -right-2 -top-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white">
                                  <Check size={10} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30 flex items-center gap-2">
                          <MapPin size={14} /> Consignee (Receiver)
                        </h3>
                        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-navy/5 shadow-sm space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Identity / Name</Label>
                            <Input value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="Full Name or Entity" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Email Address</Label>
                              <Input value={formData.receiver_email} onChange={e => setFormData({...formData, receiver_email: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="receiver@domain.io" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Phone Number</Label>
                              <Input value={formData.receiver_phone} onChange={e => setFormData({...formData, receiver_phone: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="+1 (555) 987-6543" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Country</Label>
                            <Input value={formData.receiver_country} onChange={e => setFormData({...formData, receiver_country: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="e.g. United States" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Discharge Point Address</Label>
                            <div className="flex gap-2 relative">
                              <Input 
                                value={formData.receiver_address} 
                                onChange={e => setFormData({...formData, receiver_address: e.target.value})} 
                                onBlur={() => forceGeocode('receiver')}
                                onKeyDown={(e) => handleKeyDown(e, 'receiver')}
                                className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none flex-1" 
                                placeholder="Full Delivery Address" 
                              />
                              <Button type="button" variant="secondary" onClick={() => forceGeocode('receiver')} className="h-12 w-12 p-0 rounded-xl bg-navy text-white hover:bg-navy-dark shrink-0">
                                {isGeocoding ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                              </Button>
                              {(formData.receiver_lat !== 0 || formData.receiver_lng !== 0) && !isGeocoding && (
                                <div className="absolute -right-2 -top-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white">
                                  <Check size={10} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Logistics & Billing */}
                    <div className="space-y-8 md:space-y-12">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30 flex items-center gap-2">
                          <Activity size={14} /> Logistics Parameters
                        </h3>
                        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-navy/5 shadow-sm space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Origin City/State</Label>
                              <Input value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none" placeholder="e.g. Rotterdam, NL" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Final Destination</Label>
                              <Input value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none" placeholder="e.g. New York, USA" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Live Location (Current)</Label>
                            <div className="flex gap-2 relative">
                              <Input 
                                value={formData.current_location} 
                                onChange={e => setFormData({...formData, current_location: e.target.value})} 
                                onBlur={() => forceGeocode('current')}
                                onKeyDown={(e) => handleKeyDown(e, 'current')}
                                className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none flex-1" 
                                placeholder="Current facility or transit point" 
                              />
                              <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => forceGeocode('current')} 
                                className="h-12 w-12 p-0 rounded-xl bg-navy text-white hover:bg-navy-dark shrink-0"
                              >
                                {isGeocoding ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                              </Button>
                              {(formData.current_lat !== 0 || formData.current_lng !== 0) && !isGeocoding && (
                                <div className="absolute -right-2 -top-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white">
                                  <Check size={10} />
                                </div>
                              )}
                            </div>
                            {isGeocoding && <p className="text-[9px] font-bold text-navy/40 animate-pulse ml-1 italic">Determining coordinates via satellite link...</p>}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Package Status</Label>
                              <Select value={formData.status.toString()} onValueChange={v => v && setFormData({...formData, status: parseInt(v)})}>
                                <SelectTrigger className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-black text-navy uppercase tracking-widest">
                                  <SelectValue>
                                    {PACKAGE_STATUSES.find(s => s.id === formData.status)?.label}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-navy/5">
                                  {PACKAGE_STATUSES.map(s => (
                                    <SelectItem key={s.id} value={s.id.toString()} className="text-[10px] font-black uppercase tracking-widest py-3">{s.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">ETA (Due Date)</Label>
                              <Input type="datetime-local" value={formData.estimated_delivery} onChange={e => setFormData({...formData, estimated_delivery: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Dispatch / Ship Date</Label>
                              <Input type="datetime-local" value={formData.dispatch_date} onChange={e => setFormData({...formData, dispatch_date: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">PO / Invoice Number</Label>
                              <Input value={formData.po_number} onChange={e => setFormData({...formData, po_number: e.target.value})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none" placeholder="e.g. PO-2026-00142" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Transport Mode</Label>
                              <div className="flex p-1 bg-slate-50 border border-navy/5 rounded-xl h-12">
                                {(['land', 'sea', 'air'] as const).map(type => (
                                  <button
                                    key={type}
                                    type="button"
                                    onClick={() => setFormData({...formData, transport_type: type})}
                                    className={`flex-1 flex items-center justify-center rounded-lg transition-all ${formData.transport_type === type ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-navy/30 hover:text-navy/50'}`}
                                  >
                                    {type === 'air' ? <Plane size={16} /> : type === 'sea' ? <Ship size={16} /> : <Truck size={16} />}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Service Tier</Label>
                              <Select value={formData.service_level} onValueChange={v => setFormData({...formData, service_level: v})}>
                                <SelectTrigger className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-black text-navy uppercase tracking-widest">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-navy/5">
                                  {SERVICE_LEVELS.map(lvl => (
                                    <SelectItem key={lvl} value={lvl} className="text-[10px] font-black uppercase tracking-widest py-3">{lvl}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30 flex items-center gap-2">
                          <DollarSign size={14} /> Financial & Specifications
                        </h3>
                        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-navy/5 shadow-sm space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Manifest Value (USD)</Label>
                              <div className="relative">
                                <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" />
                                <Input type="number" value={formData.amount || 0} onChange={e => setFormData({...formData, amount: e.target.value === "" ? 0 : parseFloat(e.target.value)})} className="h-12 pl-10 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Payment Protocol</Label>
                              <Select value={formData.payment_method} onValueChange={v => setFormData({...formData, payment_method: v})}>
                                <SelectTrigger className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-black text-navy uppercase tracking-widest">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-navy/5">
                                  {PAYMENT_METHODS.map(m => (
                                    <SelectItem key={m} value={m} className="text-[10px] font-black uppercase tracking-widest py-3">{m}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Net Mass</Label>
                              <div className="flex gap-2">
                                <Input type="number" value={formData.weight || 0} onChange={e => setFormData({...formData, weight: e.target.value === "" ? 0 : parseFloat(e.target.value)})} className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold shadow-none flex-1" />
                                <div className="flex p-1 bg-slate-50 border border-navy/5 rounded-xl w-24">
                                  {(['kg', 'lbs'] as const).map(u => (
                                    <button
                                      key={u}
                                      type="button"
                                      onClick={() => setFormData({...formData, weight_unit: u})}
                                      className={`flex-1 flex items-center justify-center text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${formData.weight_unit === u ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-navy/30'}`}
                                    >
                                      {u}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Payment Status</Label>
                              <Select value={formData.payment_status} onValueChange={v => setFormData({...formData, payment_status: v})}>
                                <SelectTrigger className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-black text-navy uppercase tracking-widest">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-navy/5">
                                  {PAYMENT_STATUSES.map(s => (
                                    <SelectItem key={s} value={s} className="text-[10px] font-black uppercase tracking-widest py-3">{s}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Pending Fees (USD)</Label>
                            <div className="relative">
                              <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                              <Input type="number" value={formData.pending_fees || 0} onChange={e => setFormData({...formData, pending_fees: e.target.value === "" ? 0 : parseFloat(e.target.value)})} className="h-12 pl-10 bg-amber-50 border-amber-200 rounded-xl text-xs font-bold shadow-none text-amber-900 placeholder:text-amber-400" placeholder="0.00" />
                            </div>
                            <p className="text-[8px] text-amber-600 font-medium ml-1">Customs, delivery fees, or outstanding charges.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="route" className="m-0 space-y-10 focus-visible:outline-none">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30">Location Management</h3>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-navy/5 shadow-sm space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Current Package Location</Label>
                            <div className="flex gap-2 relative">
                              <Input 
                                value={formData.current_location} 
                                onChange={e => setFormData({...formData, current_location: e.target.value})} 
                                onBlur={() => forceGeocode('current')}
                                onKeyDown={(e) => handleKeyDown(e, 'current')}
                                className="h-12 bg-slate-50 border-navy/5 rounded-xl text-xs font-bold focus:bg-white transition-all shadow-none flex-1" 
                                placeholder="City, Facility, or Transit Point" 
                              />
                              <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => forceGeocode('current')} 
                                className="h-12 w-12 p-0 rounded-xl bg-navy text-white hover:bg-navy-dark shrink-0"
                              >
                                {isGeocoding ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                              </Button>
                              {(formData.current_lat !== 0 || formData.current_lng !== 0) && !isGeocoding && (
                                <div className="absolute -right-2 -top-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white">
                                  <Check size={10} />
                                </div>
                              )}
                            </div>
                            {isGeocoding && <p className="text-[9px] font-bold text-navy/40 animate-pulse ml-1 italic">Determining coordinates via satellite link...</p>}
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Precision Coordinates</Label>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-50 p-3 rounded-xl border border-navy/5">
                                <span className="text-[8px] font-black text-navy/30 uppercase block mb-1">Latitude</span>
                                <span className="text-xs font-mono font-bold text-navy">{formData.current_lat.toFixed(6)}</span>
                              </div>
                              <div className="bg-slate-50 p-3 rounded-xl border border-navy/5">
                                <span className="text-[8px] font-black text-navy/30 uppercase block mb-1">Longitude</span>
                                <span className="text-xs font-mono font-bold text-navy">{formData.current_lng.toFixed(6)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-navy/5 mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-[9px] font-black text-navy/40 uppercase tracking-widest ml-1">Waypoints / Stops</Label>
                              <Button type="button" variant="outline" size="sm" onClick={handleAddStop} className="h-8 text-[10px] font-bold">
                                <Plus size={14} className="mr-1" /> Add Stop
                              </Button>
                            </div>
                            
                            {formData.stops.length === 0 ? (
                              <p className="text-[10px] text-navy/30 italic text-center py-4 bg-slate-50 rounded-xl border border-navy/5">No waypoints defined.</p>
                            ) : (
                              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {formData.stops.map((stop, index) => (
                                  <div key={index} className="flex flex-col gap-2 p-3 bg-slate-50 border border-navy/5 rounded-xl">
                                    <div className="flex items-center gap-2">
                                      <div className="w-5 h-5 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                        {index + 1}
                                      </div>
                                      <Input 
                                        value={stop.name} 
                                        onChange={(e) => updateStop(index, 'name', e.target.value)} 
                                        placeholder="Stop location name" 
                                        className="h-8 text-xs bg-white shadow-none" 
                                      />
                                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveStop(index)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0">
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                    <div className="flex gap-2 pl-7">
                                      <Input 
                                        type="number"
                                        value={stop.lat} 
                                        onChange={(e) => updateStop(index, 'lat', parseFloat(e.target.value))} 
                                        placeholder="Lat" 
                                        className="h-8 text-xs bg-white w-24 font-mono shadow-none" 
                                      />
                                      <Input 
                                        type="number"
                                        value={stop.lng} 
                                        onChange={(e) => updateStop(index, 'lng', parseFloat(e.target.value))} 
                                        placeholder="Lng" 
                                        className="h-8 text-xs bg-white w-20 sm:w-24 font-mono shadow-none" 
                                      />
                                      <Button 
                                        type="button" 
                                        variant="secondary" 
                                        onClick={() => handleGeocode(stop.name, (lat, lng) => {
                                          updateStop(index, 'lat', lat);
                                          updateStop(index, 'lng', lng);
                                        })}
                                        className="h-8 px-2 bg-navy text-white hover:bg-navy-dark shadow-none text-[10px] hidden sm:flex"
                                      >
                                        Geocode
                                      </Button>
                                      <div className="ml-auto flex items-center gap-2">
                                        <Badge variant={stop.status === 'completed' ? 'default' : 'outline'} className={stop.status === 'completed' ? 'bg-emerald-500 text-[9px] uppercase' : 'text-navy/50 text-[9px] uppercase'}>
                                          {stop.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {formData.stops.length > 0 && formData.current_stop_index < formData.stops.length - 1 && (
                              <Button type="button" variant="default" onClick={handleConfirmArrival} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-4 h-10 shadow-none">
                                <Check size={16} className="mr-2" />
                                Confirm Arrival at Next Stop
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-navy/30">Tactical Telemetry & Visualization</h3>
                      <div className="h-[550px] rounded-[40px] overflow-hidden border border-navy/5 shadow-2xl bg-slate-100 relative group">
                        <TrackingMap 
                          pickup={formData.sender_lat ? { lat: formData.sender_lat, lng: formData.sender_lng, label: 'Origin' } : undefined}
                          dropoff={formData.receiver_lat ? { lat: formData.receiver_lat, lng: formData.receiver_lng, label: 'Destination' } : undefined}
                          currentLocation={formData.current_lat ? { lat: formData.current_lat, lng: formData.current_lng, label: 'Current' } : undefined}
                          stops={formData.stops}
                          status={formData.status}
                          transportType={formData.transport_type}
                        />
                        <div className="absolute top-6 left-6 z-[400] bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-navy/5 shadow-2xl pointer-events-none group-hover:scale-105 transition-transform duration-500">
                          <p className="text-[9px] font-black uppercase text-navy/30 tracking-widest mb-2">Satellite Link Active</p>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                            <p className="text-[11px] font-black text-navy uppercase tracking-tight">Active Track: {formData.transport_type} unit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </div>

            <footer className="px-6 py-6 md:px-10 md:py-10 bg-white border-t border-navy/5 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 md:gap-6 shrink-0">
              <button 
                type="button"
                onClick={onClose} 
                className="text-[10px] font-black uppercase tracking-widest text-navy/30 hover:text-navy transition-colors px-6 h-14 sm:h-auto"
              >
                Cancel Manifest
              </button>
              <Button 
                type="submit" 
                form="shipment-form" 
                disabled={loading || isGeocoding} 
                className="bg-navy w-full sm:w-auto hover:bg-navy-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] px-12 h-14 shadow-2xl shadow-navy/30 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin mr-3 w-5 h-5" /> : <Shield className="mr-3 w-5 h-5" />}
                Authorize Record Update
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
        onSkip={() => {
          setIsEmailModalOpen(false);
          finalizeSave(pendingUpdateData);
        }}
        recipientEmail={formData.receiver_email}
        recipientName={formData.receiver_name}
        trackingId={formData.tracking_id}
        currentStatus={PACKAGE_STATUSES.find(s=>s.id===formData.status)?.label || 'Updated'}
        location={formData.current_location || (formData.current_stop_index === -1 ? 'Origin' : (formData.stops[formData.current_stop_index]?.name || "In Transit"))}
      />
    </>
  );
}
