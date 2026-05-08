"use client";

import { 
  LayoutDashboard, Package, Users, Settings, LogOut, 
  ChevronRight, UserCircle, ShieldCheck
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Shipments", icon: Package, path: "/admin/shipments" },
    { label: "Personnel", icon: Users, path: "/admin/personnel" },
    { label: "Settings", icon: Settings, path: "/admin/network" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-100 shrink-0 sticky top-0 h-screen z-50">
      
      {/* Logo Section */}
      <div className="p-10 pb-14 text-center">
        <Link href="/" className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-[#0081C9] flex items-center justify-center rounded-[24px] shadow-xl shadow-blue-200">
            <Package size={28} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#1E293B] tracking-tighter">ALEXANDRIA</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mt-1">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-3">
        <p className="px-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex items-center justify-between px-6 py-5 rounded-[22px] transition-all duration-300 group relative ${
                isActive 
                  ? "bg-[#0081C9] text-white shadow-2xl shadow-blue-200" 
                  : "text-slate-400 hover:text-[#1E293B] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className="text-sm font-bold tracking-tight">
                  {item.label}
                </span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="w-1.5 h-1.5 rounded-full bg-white" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-4 p-5 bg-slate-50/50 rounded-[24px] border border-slate-100/50">
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-[16px] shadow-sm">
            <UserCircle size={24} className="text-slate-300" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-black text-[#1E293B] truncate uppercase tracking-tight">
              {user?.email?.split('@')[0] || "Operator"}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Now
            </span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full py-5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-[22px] font-bold text-sm transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Shipments", icon: Package, path: "/admin/shipments" },
    { label: "Personnel", icon: Users, path: "/admin/personnel" },
    { label: "Settings", icon: Settings, path: "/admin/network" },
  ];

  return (
    <div className="flex flex-col h-full bg-white p-8">
      <div className="flex items-center gap-4 mb-14 px-2">
        <div className="w-14 h-14 bg-[#0081C9] flex items-center justify-center rounded-[24px]">
          <Package size={28} className="text-white" />
        </div>
        <span className="text-2xl font-black text-[#1E293B] tracking-tighter uppercase">ALEXANDRIA</span>
      </div>
      
      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={onClose}
              className={`flex items-center gap-5 px-8 py-6 rounded-[24px] transition-all duration-200 ${
                isActive 
                  ? "bg-[#0081C9] text-white shadow-xl" 
                  : "text-slate-400 hover:text-[#1E293B] hover:bg-slate-50"
              }`}
            >
              <item.icon size={22} />
              <span className="text-base font-bold tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-slate-50 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">ADMIN v2.5</p>
      </div>
    </div>
  );
}

