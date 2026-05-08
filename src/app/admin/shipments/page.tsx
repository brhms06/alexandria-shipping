"use client";

import { useEffect, useState } from "react";
import { 
  Package, Plus, Search, Filter, MoreHorizontal, 
  Edit2, Trash2, Calendar, MapPin, User, Mail,
  ExternalLink, ArrowRight, Loader2, Check, X,
  ChevronRight, ArrowUpRight, DollarSign
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient, getStoragePathFromUrl } from "@/lib/supabase-client";
import { motion, AnimatePresence } from "framer-motion";
import ShipmentModal from "@/components/admin/ShipmentModal";
import { Sidebar } from "@/components/admin/Sidebar";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const STATUS_MAP: Record<number, { label: string, color: string, bg: string }> = {
  1: { label: "Received", color: "text-blue-600", bg: "bg-blue-50" },
  2: { label: "Processing", color: "text-amber-600", bg: "bg-amber-50" },
  3: { label: "In Transit", color: "text-blue-600", bg: "bg-blue-50" },
  4: { label: "On Hold", color: "text-red-600", bg: "bg-red-50" },
  5: { label: "Out for Delivery", color: "text-indigo-600", bg: "bg-indigo-50" },
  6: { label: "Delivered", color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function ShipmentsPage() {
  const supabase = createClient();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin");
        return;
      }
      fetchData();
    }
    init();
  }, [supabase, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*, shipment_items(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);

      // Auto-open if ID param exists
      const editId = searchParams.get('id');
      if (editId && data) {
        const shipmentToEdit = data.find(s => s.id === editId);
        if (shipmentToEdit) {
          setSelectedShipment(shipmentToEdit);
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (shipment: any) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedShipment(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (shipment: any) => {
    if (confirm(`Delete shipment ${shipment.tracking_id}? This cannot be undone.`)) {
      try {
        if (shipment.image_url) {
          const storageInfo = getStoragePathFromUrl(shipment.image_url);
          if (storageInfo) await supabase.storage.from(storageInfo.bucket).remove([storageInfo.path]);
        }
        const { error } = await supabase.from('shipments').delete().eq('id', shipment.id);
        if (error) throw error;
        fetchData();
      } catch (error: any) {
        alert("Error deleting shipment: " + error.message);
      }
    }
  };

  const filteredShipments = shipments
    .filter(s => {
      if (activeTab === "transit") return s.status === 3 || s.status === 5;
      if (activeTab === "pending") return s.status === 1 || s.status === 2 || s.status === 4;
      if (activeTab === "delivered") return s.status === 6;
      return true;
    })
    .filter(s => 
      s.tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.customer_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (s.receiver_name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

  if (loading && shipments.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#0081C9] animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Shipments...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#F8FAFB] text-slate-900 font-sans">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Header */}
          <header className="px-8 sm:px-12 py-10 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#1E293B]">Shipments</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Manage all active cargo</p>
            </div>
            <button 
              onClick={handleAddNew}
              className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all text-slate-900"
            >
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </button>
          </header>

          {/* Search & Filter Bar */}
          <div className="px-8 sm:px-12 mb-8 space-y-6 shrink-0">
            <div className="relative group max-w-4xl">
              <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
              <Input 
                placeholder="Search tracking ID or recipient..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-14 bg-white border-none rounded-[20px] font-bold text-base text-slate-900 shadow-sm placeholder:text-slate-300 focus-visible:ring-[#0081C9]"
              />
            </div>

            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
              {["all", "pending", "transit", "delivered"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap capitalize ${
                    activeTab === tab 
                      ? "bg-[#0081C9] text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List Area */}
          <div className="flex-1 overflow-y-auto px-8 sm:px-12 pb-10 space-y-6">
            <div className="max-w-4xl space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((s, i) => {
                    const statusColors: Record<number, { label: string, color: string }> = {
                      1: { label: "Received", color: "bg-[#F59E0B]" },
                      2: { label: "Processing", color: "bg-[#0081C9]" },
                      3: { label: "In Transit", color: "bg-[#0081C9]" },
                      4: { label: "On Hold", color: "bg-[#F43F5E]" },
                      5: { label: "Out for Delivery", color: "bg-[#0081C9]" },
                      6: { label: "Delivered", color: "bg-[#10B981]" }
                    };
                    const status = statusColors[s.status] || { label: "Unknown", color: "bg-slate-400" };

                    return (
                      <motion.div 
                        key={s.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                        onClick={() => handleEdit(s)}
                        className="group relative bg-white rounded-[24px] border border-slate-50 p-8 pl-10 flex items-center justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
                      >
                        {/* Status Strip */}
                        <div className={`absolute left-0 top-0 bottom-0 w-3 ${status.color}`} />
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-extrabold text-[#1E293B]">
                              {s.receiver_name || "Unknown Recipient"}
                            </h3>
                            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">ID: {s.tracking_id.slice(0, 8)}</span>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-[#0081C9] font-bold">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs">
                                {new Date(s.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold">
                              <MapPin className="w-4 h-4" />
                              <span className="text-xs truncate max-w-[200px]">{s.receiver_address || "No Address"}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className={`${status.color} text-white px-6 py-2 rounded-xl text-[12px] font-black uppercase tracking-wider`}>
                            {status.label}
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Value</p>
                            <p className="text-sm font-black text-[#1E293B]">${s.shipment_items?.[0]?.price?.toLocaleString() || "0.00"}</p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(s);
                          }}
                          className="absolute -right-3 -top-3 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-32 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1E293B]">No results found</h3>
                    <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-[10px]">Try searching something else</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      <ShipmentModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedShipment(null);
        }} 
        onSuccess={fetchData} 
        shipment={selectedShipment}
      />
    </TooltipProvider>
  );
}
