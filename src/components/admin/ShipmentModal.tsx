"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, Plus, Trash2, Calendar, Weight, Box, Info, MapPin, 
  Package, Search, Loader2, Copy, Check, Upload, FileText, 
  Image as ImageIcon, Flag, User, Briefcase, Tag, Clock, RotateCcw,
  Globe, Shield, DollarSign, ArrowUpRight, Users, Navigation2, Activity,
  Printer, Trash
} from "lucide-react";
import { createClient, getStoragePathFromUrl } from "@/lib/supabase-client";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TrackingMap = dynamic(() => import("@/components/TrackingMap"), { ssr: false });

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  shipment?: any;
}

const SERVICE_LEVELS = ["Standard", "Express", "Air Freight", "Priority Maritime"];
const PAYMENT_STATUSES = ["Paid", "Cancelled", "Refundable", "On Hold"];
const PAYMENT_METHODS = [
  "Bank", "PayPal", "MasterCard/Visacard", "Chime", "Zelle", "Venmo", 
  "Crypto", "e-transfer", "Google Pay", "Apple Pay", "ACH", "Cashapp", "Giftcard"
];
const PACKAGE_STATUSES = [
  { id: 1, label: "Order Received" },
  { id: 2, label: "Processed" },
  { id: 3, label: "In Transit" },
  { id: 4, label: "On Hold" },
  { id: 5, label: "Out for Delivery" },
  { id: 6, label: "Picked Up" }
];
const TRANSPORT_TYPES = [
  { id: 'land', label: 'Land', icon: Box, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 'sea', label: 'Sea', icon: Flag, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  { id: 'air', label: 'Air', icon: Clock, color: 'bg-purple-50 text-purple-600 border-purple-100' }
];

export default function ShipmentModal({ isOpen, onClose, onSuccess, shipment }: ShipmentModalProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    current_lat: 0,
    current_lng: 0,
    current_location_name: "",
    transport_type: "land" as "land" | "sea" | "air",
    image_url: "",
    amount: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [createLog, setCreateLog] = useState(true);
  const [logMessage, setLogMessage] = useState("");
  const [mapTarget, setMapTarget] = useState<'sender' | 'receiver' | 'current'>('current');
  const [copied, setCopied] = useState(false);

  const generateTrackingId = () => {
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
    return `ALX-${randomDigits}-ALTS`;
  };

  const handleCopy = () => {
    if (!formData.tracking_id) return;
    navigator.clipboard.writeText(formData.tracking_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (shipment) {
      const firstItem = shipment.shipment_items?.[0];
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
        current_lat: shipment.current_lat || 0,
        current_lng: shipment.current_lng || 0,
        current_location_name: shipment.current_location_name || "",
        transport_type: shipment.transport_type || "land",
        image_url: shipment.image_url || "",
        amount: firstItem ? firstItem.price : 0
      });
      setImagePreview(shipment.image_url || null);
    } else {
      resetForm();
    }
  }, [shipment, isOpen]);

  const resetForm = () => {
    setFormData({
      tracking_id: generateTrackingId(),
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      sender_name: "Alexandria Freight Co.",
      sender_address: "128 Terminal Way, Alexandria, VA",
      sender_lat: 0,
      sender_lng: 0,
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
      current_lat: 0,
      current_lng: 0,
      current_location_name: "",
      transport_type: "land",
      image_url: "",
      amount: 0
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;
    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'shipment-images';
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `shipments/${fileName}`;
      const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, imageFile);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err: any) {
      console.error("Image upload error:", err);
      return formData.image_url;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = formData.image_url;
      if (imageFile) {
        if (shipment && shipment.image_url) {
          const storageInfo = getStoragePathFromUrl(shipment.image_url);
          if (storageInfo) await supabase.storage.from(storageInfo.bucket).remove([storageInfo.path]);
        }
        imageUrl = await uploadImage();
      }

      const { amount, estimated_delivery, ...dataToSave } = formData;
      const finalData = { 
        ...dataToSave, 
        estimated_delivery: estimated_delivery || null,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      };

      if (shipment) {
        const { error: sError } = await supabase.from('shipments').update(finalData).eq('id', shipment.id);
        if (sError) throw sError;
        await supabase.from('shipment_items').delete().eq('shipment_id', shipment.id);
        await supabase.from('shipment_items').insert({ shipment_id: shipment.id, item_name: "Shipment Total", price: amount, quantity: 1 });
        if (createLog) {
          await supabase.from('shipment_updates').insert({
            shipment_id: shipment.id,
            status: formData.status,
            location: formData.current_location_name,
            message: logMessage || formData.internal_notes || `Status updated to ${PACKAGE_STATUSES.find(s=>s.id===formData.status)?.label}`
          });
        }
      } else {
        const { data: newShipment, error: sError } = await supabase.from('shipments').insert([finalData]).select().single();
        if (sError) throw sError;
        await supabase.from('shipment_items').insert({ shipment_id: newShipment.id, item_name: "Shipment Total", price: amount, quantity: 1 });
        await supabase.from('shipment_updates').insert({ shipment_id: newShipment.id, status: formData.status, location: formData.current_location_name, message: "Shipment record created and initialized." });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save shipment");
    } finally {
      setLoading(false);
    }
  };

  const handleGeocode = async (address: string, type: 'sender' | 'receiver' | 'current') => {
    if (!address) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        if (type === 'sender') setFormData(prev => ({ ...prev, sender_lat: parseFloat(lat), sender_lng: parseFloat(lon) }));
        else if (type === 'receiver') setFormData(prev => ({ ...prev, receiver_lat: parseFloat(lat), receiver_lng: parseFloat(lon) }));
        else setFormData(prev => ({ ...prev, current_lat: parseFloat(lat), current_lng: parseFloat(lon) }));
      }
    } catch (err) { console.error("Geocoding error:", err); }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const coords = { lat, lng };
    if (mapTarget === 'sender') setFormData(prev => ({ ...prev, sender_lat: lat, sender_lng: lng }));
    else if (mapTarget === 'receiver') setFormData(prev => ({ ...prev, receiver_lat: lat, receiver_lng: lng }));
    else setFormData(prev => ({ ...prev, current_lat: lat, current_lng: lng }));

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        if (mapTarget === 'sender') setFormData(prev => ({ ...prev, sender_address: data.display_name }));
        else if (mapTarget === 'receiver') setFormData(prev => ({ ...prev, receiver_address: data.display_name }));
        else setFormData(prev => ({ ...prev, current_location_name: data.display_name }));
      }
    } catch (err) { console.error("Reverse geocoding error:", err); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl h-[92vh] p-0 overflow-hidden bg-white border-none rounded-none shadow-none flex flex-col font-sans">
        
        {/* ─── OFFICIAL HEADER ─── */}
        <header className="px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] text-white border-b-4 border-black flex items-center justify-between shrink-0 z-20 relative overflow-hidden">
          {/* Subtle backglow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-blue-400/5 blur-[80px] pointer-events-none" />
          
          <div className="flex items-center gap-3 sm:gap-6 relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white flex items-center justify-center text-[#0A2F6E] shrink-0 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-transform hover:scale-105">
               <Package size={24} className="sm:size-8" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter italic leading-none mb-1 truncate">
                {shipment ? 'Edit Manifest' : 'New Entry'}
              </DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-blue-200 flex items-center gap-1 group cursor-pointer hover:text-white transition-colors" onClick={handleCopy}>
                   ID: {formData.tracking_id} {copied ? <Check size={8} className="text-emerald-400" /> : <Copy size={8} className="opacity-50" />}
                </span>
                <span className="hidden sm:inline w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/40 truncate">HQ Command Console</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose} className="border-2 border-white/20 bg-transparent text-white rounded-none hover:bg-white/10 transition-all h-10 w-10 shrink-0">
            <X size={20} />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-10">
          <form id="manifest-form" onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
            
            {error && (
              <div className="p-4 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3">
                <Info size={18} /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
              
              {/* ─── LEFT: SHIPMENT DETAILS ─── */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-10">
                
                {/* 1. MANIFEST LOGIC (Status/Location) */}
                <div className="bg-white border-2 sm:border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.05)] sm:shadow-[12px_12px_0px_rgba(0,0,0,0.05)] overflow-hidden group">
                  <div className="p-4 sm:p-6 border-b-2 sm:border-b-4 border-black bg-gradient-to-r from-[#0A2F6E] to-[#2B7FFF] text-white flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                    <div className="flex items-center gap-3 relative z-10">
                      <Navigation2 size={18} className="sm:size-5" />
                      <h3 className="font-black uppercase text-[10px] sm:text-xs tracking-widest italic">Operational Tracking</h3>
                    </div>
                    <Badge className="bg-white text-[#0A2F6E] rounded-none font-black text-[7px] sm:text-[8px] uppercase tracking-widest relative z-10">Active Vector</Badge>
                  </div>
                  
                  <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status Deployment</Label>
                        <Select value={formData.status.toString()} onValueChange={(val) => val && setFormData({ ...formData, status: parseInt(val) })}>
                          <SelectTrigger className="h-14 border-2 border-black rounded-none text-xs font-black uppercase tracking-widest focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black rounded-none">
                            {PACKAGE_STATUSES.map(s => <SelectItem key={s.id} value={s.id.toString()} className="font-black uppercase text-[10px] tracking-widest focus:bg-[#0A2F6E] focus:text-white">{s.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transit Mode</Label>
                        <Select value={formData.transport_type} onValueChange={(val) => setFormData({ ...formData, transport_type: val as any })}>
                          <SelectTrigger className="h-14 border-2 border-black rounded-none text-xs font-black uppercase tracking-widest focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-black rounded-none">
                            {TRANSPORT_TYPES.map(t => <SelectItem key={t.id} value={t.id} className="font-black uppercase text-[10px] tracking-widest focus:bg-[#0A2F6E] focus:text-white">{t.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Manifest Origin</Label>
                        <div className="flex gap-2">
                           <Input value={formData.sender_address} onChange={(e) => setFormData({ ...formData, sender_address: e.target.value })} className="h-14 border-2 border-black rounded-none text-xs font-black uppercase focus:ring-0" />
                           <Button type="button" onClick={() => handleGeocode(formData.sender_address, 'sender')} className="h-14 w-14 bg-black rounded-none text-white hover:bg-[#0A2F6E]"><Search size={18} /></Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Vector Position</Label>
                        <div className="flex gap-2">
                           <Input value={formData.current_location_name} onChange={(e) => setFormData({ ...formData, current_location_name: e.target.value })} className="h-14 border-2 border-black rounded-none text-xs font-black uppercase focus:ring-0 bg-blue-50/50" />
                           <Button type="button" onClick={() => handleGeocode(formData.current_location_name, 'current')} className="h-14 w-14 bg-[#0A2F6E] rounded-none text-white"><Search size={18} /></Button>
                        </div>
                      </div>
                    </div>

                    <div className="h-[300px] border-4 border-black relative">
                       <TrackingMap 
                        pickup={{ lat: formData.sender_lat, lng: formData.sender_lng, label: formData.sender_address }}
                        dropoff={{ lat: formData.receiver_lat, lng: formData.receiver_lng, label: formData.receiver_address }}
                        current={{ lat: formData.current_lat, lng: formData.current_lng, label: formData.current_location_name }}
                        transportType={formData.transport_type}
                        onMapClick={handleMapClick}
                      />
                      <div className="absolute top-4 left-4 z-[1000] flex gap-2">
                        {(['sender', 'receiver', 'current'] as const).map((t) => (
                          <button key={t} type="button" onClick={() => setMapTarget(t)} className={`px-4 py-2 border-2 border-black font-black uppercase text-[8px] tracking-widest transition-all ${mapTarget === t ? 'bg-[#0A2F6E] text-white' : 'bg-white text-black'}`}>
                            Set {t === 'sender' ? 'Origin' : t === 'receiver' ? 'Dest' : 'Current'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. SENDER & RECEIVER PROFILES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="bg-white border-4 border-black p-8 space-y-6">
                      <h4 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 italic text-[#0A2F6E]">Origin Profile</h4>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sender Name</Label>
                            <Input value={formData.sender_name} onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })} className="h-12 border-2 border-black rounded-none text-xs font-black" />
                         </div>
                      </div>
                   </div>
                   <div className="bg-white border-4 border-black p-8 space-y-6">
                      <h4 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 italic text-[#0A2F6E]">Delivery Profile</h4>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Receiver Name</Label>
                            <Input value={formData.receiver_name} onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })} className="h-12 border-2 border-black rounded-none text-xs font-black" />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Number</Label>
                            <Input value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} className="h-12 border-2 border-black rounded-none text-xs font-black" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* ─── RIGHT: CARGO & FINANCIALS ─── */}
              <div className="lg:col-span-5 space-y-10">
                
                {/* 3. LOGISTICS UPDATES (CRITICAL) */}
                <div className="bg-white border-4 border-black shadow-[12px_12px_0px_rgba(10,47,110,0.05)] overflow-hidden">
                  <div className="p-6 border-b-4 border-black bg-emerald-500 text-white flex items-center gap-3">
                    <Activity size={20} />
                    <h3 className="font-black uppercase text-xs tracking-widest italic">Timeline Deployment</h3>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Master Narrative</Label>
                      <Textarea 
                        value={formData.internal_notes}
                        onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                        className="min-h-[120px] border-2 border-black rounded-none text-xs font-bold leading-relaxed resize-none focus:ring-0"
                        placeholder="Current manifest narrative... visible to client."
                      />
                    </div>
                    <div className="p-6 bg-gray-50 border-2 border-black space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0A2F6E]">Trigger Timeline Update</span>
                          <input type="checkbox" checked={createLog} onChange={(e) => setCreateLog(e.target.checked)} className="w-5 h-5 border-2 border-black rounded-none checked:bg-[#0A2F6E]" />
                       </div>
                       {createLog && (
                         <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Milestone Message</Label>
                            <Input value={logMessage} onChange={(e) => setLogMessage(e.target.value)} placeholder="e.g. Verified by Port Authority" className="h-12 border-2 border-black rounded-none text-[10px] font-black uppercase" />
                         </div>
                       )}
                    </div>
                  </div>
                </div>

                {/* 4. FINANCIAL LEDGER */}
                <div className="bg-black text-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                  <div className="p-6 border-b-2 border-white/10 flex items-center gap-3 bg-white/5">
                    <DollarSign size={20} className="text-[#2B7FFF]" />
                    <h3 className="font-black uppercase text-xs tracking-widest italic">Financial Ledger</h3>
                  </div>
                  <div className="p-8 space-y-8">
                     <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Cargo Valuation (USD)</Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-[#2B7FFF] italic">$</span>
                          <Input 
                            type="number" 
                            value={formData.amount} 
                            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} 
                            className="h-16 bg-white/5 border-2 border-white/10 rounded-none text-2xl font-black text-white pl-10 focus:ring-0" 
                          />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                           <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Method</Label>
                           <Select value={formData.payment_method} onValueChange={(v)=> v && setFormData({...formData, payment_method: v})}>
                              <SelectTrigger className="h-12 bg-white/5 border-2 border-white/10 rounded-none text-[10px] font-black uppercase tracking-widest">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-2 border-black rounded-none">
                                 {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m} className="font-black uppercase text-[10px] tracking-widest">{m}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[9px] font-black uppercase tracking-widest text-[#2B7FFF]">Verification Status</Label>
                           <Select value={formData.payment_status} onValueChange={(v)=> v && setFormData({...formData, payment_status: v})}>
                              <SelectTrigger className="h-12 bg-[#2B7FFF]/20 border-2 border-[#2B7FFF] rounded-none text-[10px] font-black uppercase tracking-widest text-white">
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-2 border-black rounded-none">
                                 {PAYMENT_STATUSES.map(s => <SelectItem key={s} value={s} className="font-black uppercase text-[10px] tracking-widest">{s}</SelectItem>)}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </div>
                </div>

                {/* 5. CARGO EVIDENCE */}
                <div className="bg-white border-4 border-black p-8 space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-2 italic text-[#0A2F6E]">Cargo Evidence</h4>
                  <div className="flex items-center justify-center border-4 border-dashed border-gray-200 aspect-video relative group overflow-hidden">
                     {imagePreview ? (
                       <Image src={imagePreview} alt="Evidence" fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                     ) : (
                       <div className="text-center">
                          <ImageIcon size={40} className="mx-auto text-gray-200 mb-2" />
                          <p className="text-[8px] font-black uppercase text-gray-300">No Image Initialized</p>
                       </div>
                     )}
                     <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                        <Upload size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Update Evidence</span>
                     </button>
                     <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>

        {/* ─── OFFICIAL FOOTER ─── */}
        <footer className="px-4 sm:px-8 py-4 sm:py-6 bg-white border-t-2 sm:border-t-4 border-black flex items-center justify-between shrink-0 gap-4">
          <div className="flex gap-2 sm:gap-4">
             <Button type="button" variant="outline" onClick={onClose} className="h-10 sm:h-14 px-4 sm:px-10 border-2 sm:border-4 border-black rounded-none font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-black hover:text-white transition-all">Cancel</Button>
             <Button type="button" onClick={resetForm} variant="outline" className="h-10 sm:h-14 px-3 sm:px-6 border-2 sm:border-4 border-black rounded-none font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-gray-100 hidden sm:flex"><RotateCcw size={16} /></Button>
          </div>
          <div className="flex flex-1 sm:flex-none">
             <Button 
               type="submit" 
               form="manifest-form" 
               disabled={loading} 
               className="w-full sm:w-auto h-10 sm:h-14 px-4 sm:px-16 bg-gradient-to-r from-[#0A2F6E] to-[#061B3D] hover:from-[#2B7FFF] hover:to-[#0A2F6E] text-white rounded-none font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_rgba(10,47,110,0.2)] transition-all duration-500 relative overflow-hidden group/btn"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Printer size={16} className="sm:mr-3 mr-2" />} 
                  <span className="truncate">{shipment ? 'Authorize Update' : 'Initialize Manifest'}</span>
                </span>
             </Button>
          </div>
        </footer>

      </DialogContent>
    </Dialog>
  );
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
