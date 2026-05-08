"use client";

import { useEffect, useState } from "react";
import { 
  Ship, LayoutDashboard, Package, Users, Settings, LogOut, 
  Plus, Search, ArrowUpRight, RefreshCcw, Clock, Trash2, 
  Menu, X, Copy, Check, Globe, Shield, Navigation, ExternalLink, Printer,
  Plane, Truck, Monitor
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient, getStoragePathFromUrl } from "@/lib/supabase-client";
import ShipmentModal from "@/components/admin/ShipmentModal";
import Image from "next/image";
import Link from "next/link";

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
  1: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  2: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  3: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  4: "bg-red-500/10 text-red-400 border border-red-500/20",
  5: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  6: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
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
      <div className="min-h-screen flex items-center justify-center bg-[#050B14]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-[2px] border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent animate-pulse">Initializing Command Console...</p>
        </div>
      </div>
    );
  }

  const SidebarNav = ({ onItemClick }: { onItemClick?: () => void }) => {
    const menuItems = [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Shipments", icon: Package, active: false },
      { label: "Personnel", icon: Users, active: false },
      { label: "Network Config", icon: Settings, active: false },
    ];

    return (
      <nav className="flex flex-col gap-2 flex-1 mt-10 px-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onItemClick?.();
            }}
            className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 group relative overflow-hidden ${
              item.active 
                ? "bg-accent text-navy font-bold shadow-[0_0_25px_rgba(255,190,0,0.4)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.active && (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
            )}
            <item.icon size={18} className={item.active ? "text-navy" : "group-hover:scale-110 group-hover:text-accent transition-all duration-300"} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${item.active ? "" : "group-hover:glow-text transition-all"}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    );
  };

    <TooltipProvider>
      <div className="flex min-h-screen bg-[#050B14] font-sans selection:bg-accent selection:text-navy cyber-scanlines relative">
        <div className="absolute inset-0 bg-[#050B14] z-[-1]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay z-0" />
        
        {/* ─── PREMIUM SIDEBAR ─── */}
        <aside className="hidden lg:flex flex-col w-72 bg-navy text-white p-0 shrink-0 sticky top-0 h-screen relative overflow-hidden">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
             <Image src="/hero-bg.png" alt="BG" fill className="object-cover grayscale" />
          </div>
          <div className="absolute inset-0 bg-navy/95 z-0" />
          
          <div className="p-8 border-b border-white/5 relative z-10">
            <Link href="/" className="block group">
              <div className="relative w-48 h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/alexandria-shipping-logo.png"
                  alt="Alexandria Shipping Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-0.5 w-4 bg-accent" />
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Command Console</span>
              </div>
            </Link>
          </div>

          <SidebarNav />

          <div className="p-8 mt-auto relative z-10 border-t border-white/5">
            <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Shield size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white truncate max-w-[140px]">{user?.email?.split('@')[0]}</span>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Admin Level 4</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-2 text-white/40 hover:text-red-400 font-bold uppercase text-[10px] tracking-widest transition-all group"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> <span>Terminate Session</span>
            </button>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 min-w-0 flex flex-col">
          
          {/* Refined Header */}
          <header className="sticky top-0 z-30 bg-navy/50 backdrop-blur-md border-b border-white/5 px-6 sm:px-10 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
                      <Menu size={24} className="text-white" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 bg-navy border-none w-72 text-white">
                    <div className="p-8 border-b border-white/5">
                      <div className="relative w-40 h-12">
                        <Image
                          src="/alexandria-shipping-logo.png"
                          alt="Alexandria Shipping Logo"
                          fill
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                    </div>
                    <SidebarNav />
                  </SheetContent>
                </Sheet>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight italic glow-text">Manifest Ledger</h1>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold text-[8px] uppercase tracking-widest px-3 py-1 animate-pulse">System Active</Badge>
                  </div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Master Logistics Database • Terminal 01 • <span className="text-accent/50 animate-pulse">Live Feed</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="h-11 px-6 border-white/10 bg-white/5 rounded-sm font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-white/60">
                  <Printer size={16} className="mr-2" /> Reports
                </Button>
                <Button 
                  className="bg-accent hover:bg-accent/90 text-navy rounded-sm h-11 px-8 font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-accent/10 transition-all group"
                  onClick={handleAddNew}
                >
                  <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" /> New Entry
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 sm:p-10 space-y-8">
            
            {/* Stats Grid - Editorial Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Gross Shipments", val: shipments.length, icon: Package, color: "text-accent", bg: "bg-accent/10" },
                { label: "Active Network", val: shipments.filter(s => s.status < 6).length, icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10" },
                { label: "System Revenue", val: `$${shipments.reduce((acc, s) => acc + (s.shipment_items?.reduce((iAcc: number, item: any) => iAcc + (item.price * item.quantity), 0) || 0), 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" }
              ].map((stat, i) => (
                <Card key={i} className="border border-white/5 bg-white/5 backdrop-blur-sm shadow-none hover:bg-white/[0.08] transition-all group overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} -mr-16 -mt-16 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500`} />
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{stat.label}</p>
                      <stat.icon size={20} className={`${stat.color} opacity-60 group-hover:opacity-100 transition-all`} />
                    </div>
                    <div className="text-4xl font-bold text-white tracking-tighter italic relative z-10 group-hover:scale-105 transition-transform duration-500 origin-left">{stat.val}</div>
                    <div className="mt-4 flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-widest relative z-10">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Sync 01
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-end lg:items-center">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                <TabsList className="bg-white/5 p-1 rounded-sm h-12 border border-white/10 backdrop-blur-sm">
                  <TabsTrigger value="all" className="rounded-sm font-bold uppercase text-[10px] tracking-widest h-full px-6 data-[state=active]:bg-accent data-[state=active]:text-navy data-[state=active]:shadow-lg transition-all text-white/40">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="transit" className="rounded-sm font-bold uppercase text-[10px] tracking-widest h-full px-6 data-[state=active]:bg-accent data-[state=active]:text-navy data-[state=active]:shadow-lg transition-all text-white/40">
                    Transit
                  </TabsTrigger>
                  <TabsTrigger value="port" className="rounded-sm font-bold uppercase text-[10px] tracking-widest h-full px-6 data-[state=active]:bg-accent data-[state=active]:text-navy data-[state=active]:shadow-lg transition-all text-white/40">
                    Port
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="rounded-sm font-bold uppercase text-[10px] tracking-widest h-full px-6 data-[state=active]:bg-accent data-[state=active]:text-navy data-[state=active]:shadow-lg transition-all text-white/40">
                    Finalized
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full lg:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <Input 
                  placeholder="Search manifest..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/5 border-white/10 rounded-sm font-medium text-sm text-white focus-visible:ring-accent placeholder:text-white/20"
                />
              </div>
            </div>

            {/* Refined Ledger Table */}
            <Card className="bg-white/5 border border-white/5 backdrop-blur-sm shadow-none rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/5 border-b border-white/5">
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8">Manifest</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8">Client</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8">Mode</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8">Status</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8 text-right">Valuation</TableHead>
                      <TableHead className="font-bold text-[10px] uppercase tracking-widest text-white/30 h-14 px-8 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((s) => (
                      <TableRow key={s.id} className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                        <TableCell className="px-8 py-5">
                          <div className="flex items-center gap-2 group/id">
                            <span 
                              className="text-white font-bold text-sm tracking-tight cursor-pointer hover:text-accent transition-colors" 
                              onClick={() => handleCopy(s.tracking_id)}
                            >
                              {s.tracking_id}
                            </span>
                            <Copy 
                              size={12} 
                              className={`cursor-pointer transition-all ${copiedId === s.tracking_id ? 'text-emerald-500' : 'text-white/20 opacity-0 group-hover/id:opacity-100'}`}
                              onClick={() => handleCopy(s.tracking_id)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-xs text-white uppercase">{s.customer_name || "N/A"}</span>
                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-1">{s.sender_city} &rarr; {s.receiver_city}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 border border-white/5">
                                 {s.transport_type === 'Sea' ? <Ship size={14} /> : s.transport_type === 'Air' ? <Plane size={14} /> : <Truck size={14} />}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{s.transport_type}</span>
                           </div>
                        </TableCell>
                        <TableCell className="px-8 py-5">
                           <Select
                             value={String(s.status)}
                             onValueChange={(val) => val && handleUpdateStatus(s.id, parseInt(val))}
                           >
                             <SelectTrigger className={`h-9 w-[160px] text-[9px] font-bold uppercase tracking-widest border-none rounded-full px-4 shadow-none ${STATUS_COLORS[s.status] || 'bg-white/5 text-white/40'}`}>
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent className="rounded-sm bg-navy border-white/10 text-white shadow-2xl backdrop-blur-xl">
                               {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                 <SelectItem key={val} value={val} className="text-[9px] font-bold uppercase tracking-widest py-3 focus:bg-accent focus:text-navy cursor-pointer">
                                   {label}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                        </TableCell>
                        <TableCell className="px-8 py-5 text-right font-bold text-accent italic">
                          ${s.shipment_items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-9 w-9 rounded-full text-white/20 hover:text-white hover:bg-white/10 transition-all" 
                               onClick={() => handleEdit(s)}
                            >
                               <Settings size={16} />
                            </Button>
                            <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-9 w-9 rounded-full text-white/10 hover:text-red-500 hover:bg-red-500/10 transition-all" 
                               onClick={() => handleDelete(s)}
                            >
                               <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
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
