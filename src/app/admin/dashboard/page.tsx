"use client";

import { useEffect, useState } from "react";
import { 
  Ship, LayoutDashboard, Package, Users, Settings, LogOut, 
  Plus, Search, ArrowUpRight, RefreshCcw, Clock, Trash2, 
  Menu, X, Copy, Check, Globe, Shield, Navigation, ExternalLink, Printer 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient, getStoragePathFromUrl } from "@/lib/supabase-client";
import ShipmentModal from "@/components/admin/ShipmentModal";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const STATUS_LABELS: Record<number, string> = {
  1: "Order Received",
  2: "Processed",
  3: "In Transit",
  4: "On Hold",
  5: "Out for Delivery",
  6: "Picked Up"
};

const STATUS_COLORS: Record<number, string> = {
  1: "bg-[#F0F6FF] text-[#0A2F6E] border-[#0A2F6E]/20",
  2: "bg-indigo-50 text-indigo-700 border-indigo-200",
  3: "bg-amber-50 text-amber-700 border-amber-200",
  4: "bg-red-50 text-red-700 border-red-200",
  5: "bg-orange-50 text-orange-700 border-orange-200",
  6: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function AdminDashboard() {
  const supabase = createClient();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/admin");
          return;
        }
        setUser(user);

        const { data, error } = await supabase
          .from('shipments')
          .select('*, shipment_items(*)');

        if (error) throw error;
        setShipments(data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase, router]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*, shipment_items(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: number) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
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

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (shipment: any) => {
    if (confirm(`Are you sure you want to delete shipment ${shipment.tracking_id}? This action cannot be undone.`)) {
      try {
        setLoading(true);
        if (shipment.image_url) {
          const storageInfo = getStoragePathFromUrl(shipment.image_url);
          if (storageInfo) {
            await supabase.storage.from(storageInfo.bucket).remove([storageInfo.path]);
          }
        }
        const { error } = await supabase.from('shipments').delete().eq('id', shipment.id);
        if (error) throw error;
        await fetchData();
      } catch (error: any) {
        alert("Error deleting shipment: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const filteredShipments = shipments
    .filter(s => {
      if (activeTab === "transit") return s.status === 3;
      if (activeTab === "port") return s.status === 1 || s.status === 2;
      if (activeTab === "delivered") return s.status === 6;
      return true;
    })
    .filter(s => 
      s.tracking_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.customer_name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-[8px] border-[#0A2F6E] border-t-transparent rounded-none animate-spin" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0A2F6E]">Initializing Command Console...</p>
        </div>
      </div>
    );
  }

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex flex-col gap-2 flex-1 mt-10">
      <a href="#" onClick={onItemClick} className="flex items-center gap-4 px-6 py-4 bg-white text-[#0A2F6E] font-black uppercase text-[10px] tracking-widest border-r-[6px] border-white">
        <LayoutDashboard size={18} /> <span>Dashboard</span>
      </a>
      <a href="#" onClick={onItemClick} className="flex items-center gap-4 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all">
        <Package size={18} /> <span>Shipments</span>
      </a>
      <a href="#" onClick={onItemClick} className="flex items-center gap-4 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all">
        <Users size={18} /> <span>Personnel</span>
      </a>
      <a href="#" onClick={onItemClick} className="flex items-center gap-4 px-6 py-4 text-white/60 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest transition-all">
        <Settings size={18} /> <span>Network Config</span>
      </a>
    </nav>
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-gray-50 font-sans selection:bg-[#0A2F6E] selection:text-white">
        
        {/* ─── OFFICIAL SIDEBAR ─── */}
        <aside className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] text-white p-0 shrink-0 sticky top-0 h-screen border-r-[6px] border-black relative overflow-hidden">
          {/* Subtle warm glow at top */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FF8C42]/5 to-transparent pointer-events-none" />
          
          <div className="p-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white text-[#0A2F6E] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                <Ship size={24} />
              </div>
              <div>
                <span className="font-black tracking-tighter text-2xl block leading-none">ALEXANDRIA</span>
                <span className="text-[8px] font-black tracking-[0.4em] text-[#2B7FFF] block mt-1 uppercase opacity-80">HQ Command Console</span>
              </div>
            </div>
          </div>

          <SidebarNav />

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-8 border-t border-white/10 text-white/40 hover:text-red-400 hover:bg-red-500/5 font-black uppercase text-[10px] tracking-widest transition-all mt-auto"
          >
            <LogOut size={18} /> <span>Close Station</span>
          </button>
        </aside>

        {/* ─── MAIN COMMAND CONSOLE ─── */}
        <main className="flex-1 min-w-0 flex flex-col">
          
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b-4 border-black px-4 sm:px-10 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <Sheet>
                  <SheetTrigger
                    render={
                      <Button variant="outline" size="icon" className="lg:hidden border-2 border-black rounded-none h-12 w-12 shrink-0">
                        <Menu size={24} />
                      </Button>
                    }
                  />
                  <SheetContent side="left" className="p-0 bg-[#0A2F6E] border-r-[6px] border-black w-72">
                    <div className="p-8 border-b border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white text-[#0A2F6E] flex items-center justify-center">
                          <Ship size={20} />
                        </div>
                        <span className="font-black tracking-tighter text-xl text-white block leading-none uppercase">ALEXANDRIA</span>
                      </div>
                    </div>
                    <SidebarNav />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 p-8 border-t border-white/10 text-white/40 hover:text-red-400 hover:bg-red-500/5 font-black uppercase text-[10px] tracking-widest transition-all mt-auto w-full text-left"
                    >
                      <LogOut size={18} /> <span>Close Station</span>
                    </button>
                  </SheetContent>
                </Sheet>

                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0A2F6E] uppercase tracking-tighter italic leading-none">Manifest Ledger</h1>
                    <Badge className="bg-emerald-500 text-white rounded-none font-black text-[7px] sm:text-[8px] uppercase tracking-widest px-1.5 sm:px-2 py-0.5 sm:py-1">Active</Badge>
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Master Logistics Database</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Button variant="outline" className="flex-1 sm:flex-none border-2 sm:border-4 border-black rounded-none h-10 sm:h-12 px-4 sm:px-6 font-black uppercase text-[9px] sm:text-[10px] tracking-widest hover:bg-black hover:text-white transition-all bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.05)]">
                  <Printer size={14} className="sm:mr-2" /> <span className="hidden sm:inline">Reports</span>
                </Button>
                <Button 
                  className="flex-1 sm:flex-none bg-gradient-to-r from-[#0A2F6E] to-[#061B3D] hover:from-[#2B7FFF] hover:to-[#0A2F6E] text-white rounded-none h-10 sm:h-12 px-4 sm:px-8 font-black uppercase text-[9px] sm:text-[10px] tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,0.1)] sm:shadow-[6px_6px_0px_rgba(10,47,110,0.2)] transition-all duration-500 relative overflow-hidden group/btn"
                  onClick={handleAddNew}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                  <span className="relative z-10 flex items-center justify-center">
                    <Plus size={16} className="sm:mr-2" /> New Entry
                  </span>
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 sm:p-10 space-y-10">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black border-4 border-black shadow-[8px_8px_0px_rgba(10,47,110,0.05)] sm:shadow-[15px_15px_0px_rgba(10,47,110,0.05)]">
              {[
                { label: "Gross Shipments", val: shipments.length, icon: Package, color: "text-[#2B7FFF]" },
                { label: "Active Network", val: shipments.filter(s => s.status < 6).length, icon: Globe, color: "text-[#FF8C42]" },
                { label: "System Revenue", val: `$${shipments.reduce((acc, s) => acc + (s.shipment_items?.reduce((iAcc: number, item: any) => iAcc + (item.price * item.quantity), 0) || 0), 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" }
              ].map((stat, i) => (
                <div key={i} className="p-8 sm:p-10 bg-white hover:bg-gray-50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity -rotate-12 translate-x-8 -translate-y-8" />
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                    <div className={`${stat.color} p-2 bg-gray-50 border-2 border-black group-hover:bg-white transition-colors`}>
                      <stat.icon size={18} />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-black italic tracking-tighter relative z-10">{stat.val}</div>
                  <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest relative z-10">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" /> Synchronized
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                <TabsList className="bg-white border-4 border-black h-14 p-0 rounded-none w-full lg:w-auto grid grid-cols-4 lg:flex overflow-hidden">
                  <TabsTrigger value="all" className="rounded-none font-black uppercase text-[10px] tracking-widest h-full data-[state=active]:bg-[#0A2F6E] data-[state=active]:text-white transition-all px-8 border-r-2 border-black last:border-r-0">
                    All Records
                  </TabsTrigger>
                  <TabsTrigger value="transit" className="rounded-none font-black uppercase text-[10px] tracking-widest h-full data-[state=active]:bg-[#0A2F6E] data-[state=active]:text-white transition-all px-8 border-r-2 border-black last:border-r-0">
                    In Transit
                  </TabsTrigger>
                  <TabsTrigger value="port" className="rounded-none font-black uppercase text-[10px] tracking-widest h-full data-[state=active]:bg-[#0A2F6E] data-[state=active]:text-white transition-all px-8 border-r-2 border-black last:border-r-0">
                    Processing
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="rounded-none font-black uppercase text-[10px] tracking-widest h-full data-[state=active]:bg-[#0A2F6E] data-[state=active]:text-white transition-all px-8 border-r-2 border-black last:border-r-0">
                    Finalized
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full lg:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="SEARCH BY MANIFEST ID OR CUSTOMER..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white border-4 border-black rounded-none font-black uppercase tracking-widest text-[10px] focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Ledger Table */}
            <Card className="bg-white border-4 border-black rounded-none shadow-[20px_20px_0px_rgba(10,47,110,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50 border-b-4 border-black">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0">Manifest ID</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0">Client Profile</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0">Asset Type</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0">Status Profile</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0 text-right">Valuation</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-[#0A2F6E] h-16 py-0 px-8 border-r-2 border-black last:border-r-0 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((s) => (
                      <TableRow key={s.id} className="hover:bg-gray-50/50 border-b-2 border-gray-100 last:border-b-0">
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center gap-3 group/id">
                            <span 
                              className="text-[#0A2F6E] font-black text-sm tracking-tighter cursor-pointer hover:underline underline-offset-4" 
                              onClick={() => handleCopy(s.tracking_id)}
                            >
                              {s.tracking_id}
                            </span>
                            {copiedId === s.tracking_id ? (
                              <Check size={14} className="text-emerald-500" />
                            ) : (
                              <Copy 
                                size={14} 
                                className="text-gray-300 opacity-0 group-hover/id:opacity-100 cursor-pointer transition-opacity" 
                                onClick={() => handleCopy(s.tracking_id)}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6 border-l-2 border-gray-100">
                          <div className="flex flex-col">
                            <span className="font-black text-xs text-black uppercase tracking-tight">{s.customer_name || "N/A"}</span>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">{s.sender_city} &rarr; {s.receiver_city}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6 border-l-2 border-gray-100">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-50 border-2 border-black flex items-center justify-center text-[#0A2F6E]">
                                 {s.transport_type === 'Sea' ? <Ship size={14} /> : s.transport_type === 'Air' ? <Plane size={14} /> : <Truck size={14} />}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{s.transport_type} Freight</span>
                           </div>
                        </TableCell>
                        <TableCell className="px-8 py-6 border-l-2 border-gray-100">
                           <Select
                             value={String(s.status)}
                             onValueChange={(val) => val && handleUpdateStatus(s.id, parseInt(val))}
                           >
                             <SelectTrigger className={`h-10 w-[180px] text-[9px] font-black uppercase tracking-widest border-2 rounded-none px-4 ${STATUS_COLORS[s.status] || 'bg-gray-100'}`}>
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent className="rounded-none bg-white border-2 border-black text-black shadow-2xl">
                               {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                 <SelectItem key={val} value={val} className="text-[9px] font-black uppercase tracking-widest text-black focus:bg-[#0A2F6E] focus:text-white cursor-pointer py-3">
                                   {label}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                        </TableCell>
                        <TableCell className="px-8 py-6 border-l-2 border-gray-100 text-right">
                           <span className="font-black text-lg text-black italic italic tracking-tighter">
                             ${s.shipment_items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0).toLocaleString()}
                           </span>
                        </TableCell>
                        <TableCell className="px-8 py-6 border-l-2 border-gray-100">
                          <div className="flex justify-center gap-3">
                            <Button 
                               variant="outline" 
                               size="icon" 
                               className="h-10 w-10 rounded-none border-2 border-black hover:bg-black hover:text-white transition-all" 
                               onClick={() => handleEdit(s)}
                            >
                               <Settings size={16} />
                            </Button>
                            <Button 
                               variant="outline" 
                               size="icon" 
                               className="h-10 w-10 rounded-none border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all" 
                               onClick={() => handleDelete(s)}
                            >
                               <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredShipments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-24 text-gray-300 font-black uppercase text-xs tracking-widest italic">No Records Found in Archive</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Ledger Pagination */}
              <div className="px-8 py-6 bg-gray-50 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Ledger Report • Records 1-{filteredShipments.length} of {shipments.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-10 px-4 font-black text-[10px] bg-[#0A2F6E] text-white border-black rounded-none">01</Button>
                  <Button variant="outline" size="sm" className="h-10 px-4 font-black text-[10px] border-2 border-black rounded-none hover:bg-black hover:text-white">02</Button>
                  <Button variant="outline" size="sm" className="h-10 px-4 font-black text-[10px] border-2 border-black rounded-none hover:bg-black hover:text-white">Next &rarr;</Button>
                </div>
              </div>
            </Card>
          </div>
        </main>

        <ShipmentModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedShipment(null);
          }} 
          onSuccess={fetchData} 
          shipment={selectedShipment}
        />
      </div>
    </TooltipProvider>
  );
}

// Internal icons needed for the redesign
function TrendingUp(props: any) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function Plane(props: any) {
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  )
}

function Truck(props: any) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-3v10" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  )
}
