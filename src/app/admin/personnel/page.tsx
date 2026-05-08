"use client";

import { useEffect, useState } from "react";
import { 
  Users, UserPlus, Shield, ShieldCheck, Search, Filter, 
  Menu, MoreVertical, Edit, Trash2, Mail, Phone, Calendar
} from "lucide-react";
import { Sidebar, MobileSidebar } from "@/components/admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const STAFF_DATA = [
  { id: 1, name: "Alexander Vance", role: "Admin", email: "a.vance@alexandria.io", status: "Active", strip: "bg-blue-600" },
  { id: 2, name: "Elena Kovic", role: "Dispatcher", email: "e.kovic@alexandria.io", status: "Active", strip: "bg-blue-600" },
  { id: 3, name: "Marcus Thorne", role: "Security", email: "m.thorne@alexandria.io", status: "Away", strip: "bg-orange-500" },
  { id: 4, name: "Sarah Chen", role: "Analyst", email: "s.chen@alexandria.io", status: "Inactive", strip: "bg-slate-400" },
  { id: 5, name: "Viktor Drago", role: "Supervisor", email: "v.drago@alexandria.io", status: "Active", strip: "bg-blue-600" },
];

export default function PersonnelPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = STAFF_DATA.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] text-slate-900 font-sans">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Header - Matches Dashboard */}
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
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Personnel</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Management Console</p>
              </div>
            </div>

            <button 
              className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all group"
            >
              <UserPlus className="w-5 h-5 text-slate-600 group-hover:text-[#0081C9]" />
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="px-6 sm:px-10 mb-8 shrink-0">
          <div className="flex items-center gap-4 max-w-xl">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0081C9] transition-colors" />
              <Input 
                placeholder="Search employees..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-slate-200 rounded-[18px] font-bold text-sm focus-visible:ring-[#0081C9] shadow-sm"
              />
            </div>
            <Button variant="outline" className="h-12 w-12 rounded-[18px] border-slate-200 bg-white p-0 shrink-0">
              <Filter size={18} className="text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Staff List */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-10 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredStaff.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                <Users size={48} className="mb-4 opacity-20" />
                <p className="font-bold text-sm uppercase tracking-widest">No personnel found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStaff.map((staff, i) => (
                  <motion.div
                    key={staff.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden group relative hover:shadow-md transition-all"
                  >
                    {/* Vertical Status Strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${staff.strip}`} />
                    
                    <div className="p-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-16 h-16 rounded-[22px] bg-slate-50 flex items-center justify-center border border-slate-100 font-black text-[#0081C9] text-xl shadow-inner">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider border-0 text-white ${staff.strip}`}>
                            {staff.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-50 text-slate-300 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                            {staff.name}
                          </h3>
                          <span className="text-[10px] font-black text-[#0081C9] uppercase tracking-[0.15em] mt-1 block">
                            {staff.role}
                          </span>
                        </div>

                        <div className="pt-4 border-t border-slate-50 space-y-2">
                          <div className="flex items-center gap-3 text-slate-400">
                            <Mail size={14} />
                            <span className="text-xs font-bold truncate">{staff.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-slate-400">
                            <Shield size={14} />
                            <span className="text-xs font-bold uppercase tracking-wider">Access Level: {staff.role === 'Admin' ? 'Alpha' : 'Beta'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
