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
  { id: 'land', label: 'Land', icon: Box, color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' },
  { id: 'sea', label: 'Sea', icon: Flag, color: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' },
  { id: 'air', label: 'Air', icon: Clock, color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' }
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
      <DialogContent className="max-w-[95vw] lg:max-w-6xl h-[90vh] p-0 overflow-hidden bg-[#0A111A] border border-white/10 rounded-sm shadow-2xl flex flex-col font-sans selection:bg-accent selection:text-navy cyber-scanlines relative">
        <div className="absolute inset-0 bg-[#0A111A] z-[-1]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-0" />
        
        {/* ─── OFFICIAL HEADER ─── */}
        <header className="px-6 sm:px-10 py-5 sm:py-8 bg-navy text-white border-b border-white/5 flex items-center justify-between shrink-0 z-20 relative overflow-hidden">
          {/* Subtle backglow effect */}
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-accent/5 blur-[120px] pointer-events-none" />
          
          <div className="flex items-center gap-4 sm:gap-8 relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/10 rounded-sm transition-transform hover:scale-105">
               <Package size={24} className="sm:size-8 text-accent" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-xl sm:text-4xl font-bold text-white tracking-tighter italic leading-none mb-2 truncate glow-text">
                {shipment ? 'Edit Manifest' : 'New Entry'}
              </DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2 group cursor-pointer hover:text-white transition-colors" onClick={handleCopy}>
                   MANIFEST ID: <span className="text-white">{formData.tracking_id}</span> {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} className="opacity-30 group-hover:opacity-100 transition-opacity" />}
                </span>
                <span className="hidden sm:inline w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Alexandria Terminal Station</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/40 hover:text-white hover:bg-white/5 transition-all h-12 w-12 shrink-0">
            <X size={24} />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto bg-[#050B14] p-6 sm:p-10 scrollbar-thin scrollbar-thumb-white/10">
          <form id="manifest-form" onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
            
            {error && (
              <div className="p-4 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-3">
                <Info size={18} /> {error}
              </div>
            )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
                
                {/* ─── LEFT: SHIPMENT DETAILS ─── */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-10">
                  
                  {/* 1. OPERATIONAL TRACKING */}
                  <Card className="border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden group">
                    <div className="p-4 sm:p-6 border-b border-white/5 bg-white/5 flex items-center justify-between relative overflow-hidden">
                      <div className="flex items-center gap-3 relative z-10 text-white">
                        <Navigation2 size={18} className="sm:size-5 text-accent" />
                        <h3 className="font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em] italic">Operational Tracking</h3>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold text-[8px] uppercase tracking-widest px-3 py-1 relative z-10 animate-pulse">Live Signal</Badge>
                    </div>
                    
                    <div className="p-6 sm:p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Current Deployment Status</Label>
                          <Select value={formData.status.toString()} onValueChange={(val) => val && setFormData({ ...formData, status: parseInt(val) })}>
                            <SelectTrigger className="h-12 border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest focus:ring-accent bg-white/5 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-navy border-white/10 rounded-sm text-white">
                              {PACKAGE_STATUSES.map(s => <SelectItem key={s.id} value={s.id.toString()} className="font-bold uppercase text-[10px] tracking-widest focus:bg-accent focus:text-navy py-3">{s.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Transport Vector</Label>
                          <Select value={formData.transport_type} onValueChange={(val) => setFormData({ ...formData, transport_type: val as any })}>
                            <SelectTrigger className="h-12 border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest focus:ring-accent bg-white/5 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-navy border-white/10 rounded-sm text-white">
                              {TRANSPORT_TYPES.map(t => <SelectItem key={t.id} value={t.id} className="font-bold uppercase text-[10px] tracking-widest focus:bg-accent focus:text-navy py-3">{t.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Manifest Origin Point</Label>
                          <div className="flex gap-2">
                             <Input value={formData.sender_address} onChange={(e) => setFormData({ ...formData, sender_address: e.target.value })} className="h-12 bg-white/5 border-white/10 rounded-sm text-xs font-bold uppercase focus-visible:ring-accent text-white" />
                             <Button type="button" onClick={() => handleGeocode(formData.sender_address, 'sender')} className="h-12 w-12 bg-accent rounded-sm text-navy hover:bg-accent/90"><Search size={18} /></Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Real-time Location Tag</Label>
                          <div className="flex gap-2">
                             <Input value={formData.current_location_name} onChange={(e) => setFormData({ ...formData, current_location_name: e.target.value })} className="h-12 bg-white/5 border-white/10 rounded-sm text-xs font-bold uppercase focus-visible:ring-accent text-white" />
                             <Button type="button" onClick={() => handleGeocode(formData.current_location_name, 'current')} className="h-12 w-12 bg-accent rounded-sm text-navy hover:bg-accent/90"><Search size={18} /></Button>
                          </div>
                        </div>
                      </div>

                      <div className="h-[300px] border border-white/5 rounded-sm relative overflow-hidden bg-black/40 grayscale contrast-125">
                         <TrackingMap 
                          pickup={{ lat: formData.sender_lat, lng: formData.sender_lng, label: formData.sender_address }}
                          dropoff={{ lat: formData.receiver_lat, lng: formData.receiver_lng, label: formData.receiver_address }}
                          current={{ lat: formData.current_lat, lng: formData.current_lng, label: formData.current_location_name }}
                          transportType={formData.transport_type}
                          onMapClick={handleMapClick}
                        />
                        <div className="absolute top-4 left-4 z-[1000] flex gap-2">
                          {(['sender', 'receiver', 'current'] as const).map((t) => (
                            <button key={t} type="button" onClick={() => setMapTarget(t)} className={`px-4 py-2 border border-white/10 rounded-sm font-bold uppercase text-[9px] tracking-widest shadow-xl transition-all ${mapTarget === t ? 'bg-accent text-navy' : 'bg-navy/80 text-white hover:bg-navy backdrop-blur-md'}`}>
                              {t === 'sender' ? 'Set Origin' : t === 'receiver' ? 'Set Dest' : 'Set Position'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 2. SENDER & RECEIVER PROFILES */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <Card className="border border-white/5 bg-white/5 backdrop-blur-sm p-8 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-4 italic text-accent">Sender Profile</h4>
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Entity Name</Label>
                              <Input value={formData.sender_name} onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })} className="h-11 bg-white/5 border-white/10 rounded-sm text-xs font-bold text-white focus-visible:ring-accent" />
                           </div>
                        </div>
                     </Card>
                     <Card className="border border-white/5 bg-white/5 backdrop-blur-sm p-8 space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-4 italic text-accent">Consignee Profile</h4>
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Full Name</Label>
                              <Input value={formData.receiver_name} onChange={(e) => setFormData({ ...formData, receiver_name: e.target.value })} className="h-11 bg-white/5 border-white/10 rounded-sm text-xs font-bold text-white focus-visible:ring-accent" />
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Contact Terminal</Label>
                              <Input value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} className="h-11 bg-white/5 border-white/10 rounded-sm text-xs font-bold text-white focus-visible:ring-accent" />
                           </div>
                        </div>
                     </Card>
                  </div>
                </div>

                {/* ─── RIGHT: CARGO & FINANCIALS ─── */}
                <div className="lg:col-span-5 space-y-10">
                  
                  {/* 3. TIMELINE DEPLOYMENT */}
                  <Card className="border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/5 text-white flex items-center gap-3">
                      <Activity size={18} className="text-accent" />
                      <h3 className="font-bold uppercase text-[10px] tracking-[0.2em] italic">Timeline Deployment</h3>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Public Narrative</Label>
                        <Textarea 
                          value={formData.internal_notes}
                          onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                          className="min-h-[120px] bg-white/5 border-white/10 rounded-sm text-xs font-medium leading-relaxed resize-none focus-visible:ring-accent text-white placeholder:text-white/10"
                          placeholder="Current manifest narrative... visible to client."
                        />
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-sm space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Log Automatic Milestone</span>
                            <input type="checkbox" checked={createLog} onChange={(e) => setCreateLog(e.target.checked)} className="w-4 h-4 accent-accent rounded-sm bg-white/5 border-white/10" />
                         </div>
                         {createLog && (
                           <div className="space-y-3 animate-in fade-in slide-in-from-top-1">
                              <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Verification Note</Label>
                              <Input value={logMessage} onChange={(e) => setLogMessage(e.target.value)} placeholder="e.g. Verified by Port Authority" className="h-11 bg-white/5 border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-wider text-white focus-visible:ring-accent" />
                           </div>
                         )}
                      </div>
                    </div>
                  </Card>

                  {/* 4. FINANCIAL LEDGER */}
                  <Card className="bg-navy text-white border-none shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/5">
                      <DollarSign size={18} className="text-accent" />
                      <h3 className="font-bold uppercase text-[10px] tracking-[0.2em] italic">Financial Ledger</h3>
                    </div>
                    <div className="p-8 space-y-8 relative z-10">
                       <div className="space-y-3">
                          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Declared Valuation (USD)</Label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-accent italic">$</span>
                            <Input 
                              type="number" 
                              value={formData.amount} 
                              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} 
                              className="h-16 bg-white/5 border-white/10 rounded-sm text-3xl font-bold text-white pl-10 focus-visible:ring-accent" 
                            />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">Protocol</Label>
                             <Select value={formData.payment_method} onValueChange={(v)=> v && setFormData({...formData, payment_method: v})}>
                                <SelectTrigger className="h-11 bg-white/5 border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border-slate-200 rounded-sm">
                                   {PAYMENT_METHODS.map(m => <SelectItem key={m} value={m} className="font-bold uppercase text-[10px] tracking-widest py-2">{m}</SelectItem>)}
                                </SelectContent>
                             </Select>
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent/60">Authorization</Label>
                             <Select value={formData.payment_status} onValueChange={(v)=> v && setFormData({...formData, payment_status: v})}>
                                <SelectTrigger className="h-11 bg-accent/20 border-accent/40 rounded-sm text-[10px] font-bold uppercase tracking-widest text-accent">
                                   <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-navy border-white/10 rounded-sm text-white">
                                   {PAYMENT_STATUSES.map(s => <SelectItem key={s} value={s} className="font-bold uppercase text-[10px] tracking-widest py-2 focus:bg-accent focus:text-navy">{s}</SelectItem>)}
                                </SelectContent>
                             </Select>
                          </div>
                       </div>
                    </div>
                  </Card>

                  {/* 5. CARGO EVIDENCE */}
                  <Card className="border border-white/5 bg-white/5 backdrop-blur-sm p-8 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-4 italic text-accent">Cargo Evidence</h4>
                    <div className="flex items-center justify-center border-2 border-dashed border-white/10 rounded-sm aspect-video relative group overflow-hidden bg-black/20">
                       {imagePreview ? (
                         <Image src={imagePreview} alt="Evidence" fill className="object-cover transition-all" />
                       ) : (
                         <div className="text-center">
                            <ImageIcon size={32} className="mx-auto text-white/10 mb-2" />
                            <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">Awaiting Signal</p>
                         </div>
                       )}
                       <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-navy/90 text-white opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-md">
                          <Upload size={24} className="text-accent" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Upload Verification</span>
                       </button>
                       <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    </div>
                  </Card>

                </div>
              </div>
          </form>
        </div>

        {/* ─── OFFICIAL FOOTER ─── */}
        <footer className="px-6 sm:px-10 py-5 sm:py-8 bg-[#0A111A] border-t border-white/5 flex items-center justify-between shrink-0 gap-4">
          <div className="flex gap-3 sm:gap-4">
             <Button type="button" variant="ghost" onClick={onClose} className="h-12 sm:h-14 px-6 sm:px-10 font-bold uppercase text-[10px] sm:text-xs tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all">Cancel</Button>
             <Button type="button" onClick={resetForm} variant="outline" className="h-12 sm:h-14 px-4 sm:px-6 border-white/10 bg-white/5 rounded-sm font-bold uppercase text-[10px] sm:text-xs tracking-widest text-white/40 hover:bg-white/10 hidden sm:flex"><RotateCcw size={16} /></Button>
          </div>
          <div className="flex flex-1 sm:flex-none">
             <Button 
               type="submit" 
               form="manifest-form" 
               disabled={loading} 
               className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-16 bg-accent hover:bg-accent/90 text-navy rounded-sm font-bold uppercase text-[10px] sm:text-xs tracking-widest shadow-[0_0_30px_rgba(255,190,0,0.2)] transition-all duration-300 relative overflow-hidden group/btn"
             >
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? <Loader2 className="animate-spin mr-3" /> : <Shield size={18} className="sm:mr-3 mr-2" />} 
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
