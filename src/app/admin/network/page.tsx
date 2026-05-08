"use client";

import { useEffect, useState } from "react";
import { 
  Settings, Globe, Shield, Database, Cpu, Zap, 
  Wifi, Lock, RefreshCcw, Server, Activity, 
  Terminal, Monitor, HardDrive, Key, Menu,
  CheckCircle2, AlertTriangle, Info
} from "lucide-react";
import { Sidebar, MobileSidebar } from "@/components/admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function NetworkPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] text-slate-900 font-sans">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Bar - Matches Dashboard */}
        <header className="px-6 sm:px-10 py-10 shrink-0">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger 
                  render={
                    <Button variant="ghost" size="icon" className="lg:hidden shrink-0 h-10 w-10 border border-slate-200 bg-white rounded-xl">
                      <Menu size={18} className="text-slate-600" />
                    </Button>
                  }
                />
                <SheetContent side="left" className="p-0 bg-white border-none w-72">
                  <MobileSidebar isOpen={false} onClose={() => {}} />
                </SheetContent>
              </Sheet>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Network</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Infrastructure Hub</p>
              </div>
            </div>

            <Button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-[18px] h-12 px-6 font-black text-xs shadow-sm transition-all flex items-center gap-3"
            >
              <RefreshCcw size={16} className={`${isRefreshing ? 'animate-spin text-[#0081C9]' : 'text-slate-300'}`} /> 
              <span>{isRefreshing ? 'Checking...' : 'Refresh Status'}</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 px-6 sm:px-10 pb-20 overflow-y-auto custom-scrollbar">
          <div className="space-y-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Core Infrastructure */}
              <div className="lg:col-span-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-blue-50 text-[#0081C9]">
                            <Database size={24} />
                          </div>
                          <h3 className="font-black text-slate-900 tracking-tight">Database</h3>
                        </div>
                        <Badge className="bg-emerald-500 text-white border-0 rounded-full font-black text-[9px] uppercase tracking-wider px-3 py-1">Stable</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Current Load</span>
                          <span className="text-3xl font-black text-slate-900 tracking-tighter">12.4%</span>
                        </div>
                        <Progress value={12.4} className="h-3 bg-slate-50 rounded-full overflow-hidden" indicatorClassName="bg-[#0081C9]" />
                        <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-wider">Primary cluster: Optimal</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                            <Server size={24} />
                          </div>
                          <h3 className="font-black text-slate-900 tracking-tight">Computing</h3>
                        </div>
                        <Badge className="bg-amber-500 text-white border-0 rounded-full font-black text-[9px] uppercase tracking-wider px-3 py-1">Normal</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">CPU Usage</span>
                          <span className="text-3xl font-black text-slate-900 tracking-tighter">42.8%</span>
                        </div>
                        <Progress value={42.8} className="h-3 bg-slate-50 rounded-full overflow-hidden" indicatorClassName="bg-amber-500" />
                        <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-wider">Nodes: 12 Active</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* System Services - Simplified List */}
                <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Zap size={24} className="text-slate-900" />
                      <h3 className="font-black text-slate-900 tracking-tight">Active Services</h3>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 tracking-tighter">Real-time status</span>
                  </div>
                  <div className="divide-y divide-slate-50">
                     {[
                       { name: "Location API", status: "Connected", latency: "24ms", icon: Globe, color: "text-emerald-500" },
                       { name: "Tracking Hook", status: "Connected", latency: "142ms", icon: Wifi, color: "text-emerald-500" },
                       { name: "Auth Engine", status: "Active", latency: "12ms", icon: Lock, color: "text-emerald-500" },
                       { name: "Media Assets", status: "Connected", latency: "8ms", icon: HardDrive, color: "text-emerald-500" },
                     ].map((svc, i) => (
                       <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                          <div className="flex items-center gap-6">
                             <div className="p-3 rounded-2xl bg-slate-50 text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                              <svc.icon size={20} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-900 tracking-tight">{svc.name}</span>
                                <span className="text-[10px] font-black text-slate-300 mt-1 uppercase tracking-widest">{svc.latency} Response</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">{svc.status}</span>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>

              {/* Security Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-slate-900 rounded-[32px] p-8 shadow-2xl shadow-slate-200 text-white">
                    <div className="flex items-center justify-between mb-10">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-white/10">
                          <Shield size={24} className="text-white" />
                        </div>
                        <h3 className="font-black tracking-tight">Security</h3>
                      </div>
                      <CheckCircle2 size={24} className="text-emerald-400" />
                    </div>
                    
                    <div className="space-y-4">
                       {[
                         { label: "Encryption", status: "Active" },
                         { label: "Firewall", status: "Active" },
                         { label: "Protection", status: "Enabled" },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{item.label}</span>
                            <span className="text-xs font-black text-white">{item.status}</span>
                         </div>
                       ))}
                    </div>

                    <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                       <div className="flex items-center gap-3">
                          <Key size={20} className="text-white/60" />
                          <span className="text-sm font-black tracking-tight">Rotation Policy</span>
                       </div>
                       <p className="text-[10px] text-white/40 font-black leading-relaxed uppercase tracking-wider">
                          Last automatic key rotation occurred 48 hours ago.
                       </p>
                       <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 h-12 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-black/20">
                          Rotate Keys
                       </Button>
                    </div>
                 </div>

                 {/* Logs */}
                 <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-8">Access Logs</h4>
                    <div className="space-y-6">
                      {[
                        { time: "04:12 PM", user: "Alexander", action: "Login" },
                        { time: "02:30 PM", user: "System", action: "Cleanup" },
                        { time: "11:45 AM", user: "Elena", action: "Update" },
                      ].map((log, i) => (
                        <div key={i} className="flex gap-6 items-start">
                          <span className="text-[10px] font-black text-slate-300 w-16 shrink-0 mt-1">{log.time}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-black text-slate-900 tracking-tight">{log.user}</span>
                            <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">{log.action}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
