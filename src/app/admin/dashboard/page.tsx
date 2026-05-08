"use client";

import { useEffect, useState } from "react";
import { 
  Plus, Search, Clock, Calendar, MapPin, 
  ChevronRight, Filter, Package, RefreshCcw, Menu,
  LayoutDashboard, TrendingUp, AlertCircle, CirclePlus,
  Truck, Ship, Plane
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase-client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebar } from "@/components/admin/Sidebar";
import ShipmentModal from "@/components/admin/ShipmentModal";

const STATUS_MAP: Record<number, { label: string, color: string, strip: string, text: string }> = {
  1: { label: "Pending", color: "bg-orange-500", strip: "bg-orange-500", text: "text-orange-500" },
  2: { label: "Processing", color: "bg-blue-500", strip: "bg-blue-500", text: "text-blue-500" },
  3: { label: "In Transit", color: "bg-blue-600", strip: "bg-blue-600", text: "text-blue-600" },
  4: { label: "On Hold", color: "bg-rose-500", strip: "bg-rose-500", text: "text-rose-500" },
  5: { label: "In Transit", color: "bg-blue-600", strip: "bg-blue-600", text: "text-blue-600" },
  6: { label: "Completed", color: "bg-emerald-500", strip: "bg-emerald-500", text: "text-emerald-500" }
};

const TRANSPORT_ICONS: Record<string, any> = {
  land: Truck,
  sea: Ship,
  air: Plane,
  default: Package
};

export default function AdminDashboard() {
  const supabase = createClient();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const router = useRouter();

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*, shipment_items(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin");
        return;
      }
      fetchShipments();
    }
    checkUser();
  }, [supabase, router]);

  const filteredShipments = shipments.filter(s => {
    if (filter === "All") return true;
    if (filter === "Pending") return [1, 2, 4].includes(s.status);
    if (filter === "In Transit") return [3, 5].includes(s.status);
    if (filter === "Completed") return s.status === 6;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCcw className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] text-slate-900">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="px-8 sm:px-12 py-12 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger 
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden h-12 w-12 bg-white border border-slate-200 rounded-2xl">
                    <Menu className="w-5 h-5 text-slate-600" />
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 w-64 bg-white">
                <MobileSidebar isOpen={false} onClose={() => {}} />
              </SheetContent>
            </Sheet>
            <h1 className="text-4xl font-bold text-slate-900">Shipments</h1>
          </div>
          
          <button 
            onClick={() => {
              setSelectedShipment(null);
              setIsModalOpen(true);
            }}
            className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all text-white"
          >
            <Plus className="w-8 h-8 stroke-[2.5]" />
          </button>
        </header>

        <div className="px-8 sm:px-12 mb-10 shrink-0">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
            {["All", "Pending", "In Transit", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === tab 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-500 hover:text-slate-900 bg-white border border-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Shipment List - Simple Cards matching reference image */}
        <div className="flex-1 overflow-y-auto px-8 sm:px-12 pb-10 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredShipments.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-400 gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                  <Package className="w-10 h-10 opacity-20 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-600">No shipments found</p>
                  <p className="text-sm mt-1 text-slate-400">Try changing your filters or add a new shipment.</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5 max-w-5xl">
                {filteredShipments.map((s) => {
                  const status = STATUS_MAP[s.status] || { label: "Unknown", color: "bg-slate-400", strip: "bg-slate-400", text: "text-slate-400" };
                  const statusColors: Record<number, string> = {
                    1: "bg-orange-500", 
                    2: "bg-blue-500", 
                    3: "bg-blue-600", 
                    4: "bg-rose-500", 
                    5: "bg-blue-600", 
                    6: "bg-emerald-500"
                  };
                  const color = statusColors[s.status] || "bg-slate-400";

                  return (
                    <motion.div
                      key={s.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group cursor-pointer hover:shadow-md hover:border-slate-200 transition-all relative flex"
                      onClick={() => {
                        setSelectedShipment(s);
                        setIsModalOpen(true);
                      }}
                    >
                      {/* Vertical Strip - Just like the reference image */}
                      <div className={`w-2.5 shrink-0 ${color}`} />
                      
                      <div className="p-6 sm:p-8 flex-1 flex items-center justify-between gap-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {s.receiver_name || "Untitled Shipment"}
                          </h3>
                          <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {new Date(s.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(s.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                              {(() => {
                                const TransportIcon = TRANSPORT_ICONS[s.transport_type?.toLowerCase()] || TRANSPORT_ICONS.default;
                                return <TransportIcon className="w-4 h-4 text-slate-400" />;
                              })()}
                              {s.tracking_id}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{s.receiver_address}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          <div className={`${color} text-white px-5 py-2 rounded-xl text-xs font-bold`}>
                            {status.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <ShipmentModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedShipment(null);
        }} 
        onSuccess={fetchShipments} 
        shipment={selectedShipment}
      />
    </div>
  );
}
