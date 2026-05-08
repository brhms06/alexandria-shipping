"use client";

import { useState } from "react";
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight, Globe, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans selection:bg-blue-100 selection:text-[#0081C9] bg-[#F8FAFB] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />
      
      {/* Left Panel - Hero Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden border-r border-slate-100 bg-white">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
           <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#0081C9 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-lg"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-[#0081C9] rounded-[22px] flex items-center justify-center shadow-2xl shadow-blue-200">
              <Package size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Alexandria</h2>
              <p className="text-[10px] font-black text-[#0081C9] uppercase tracking-[0.3em]">Logistics Management</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Control<br />
                <span className="text-[#0081C9]">Center</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                The unified platform for global tracking, asset management, and shipment oversight.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900 tracking-tight">24/7</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Operational Support</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900 tracking-tight">SECURED</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">End-to-End Encryption</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-16 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Operator Sign-in
            </h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-4 shadow-sm"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@alexandria.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-16 pl-14 bg-white border-slate-200 rounded-[20px] text-slate-900 font-bold text-base focus-visible:ring-[#0081C9] shadow-sm transition-all group-hover:border-[#0081C9]/30"
                />
                <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0081C9] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Security Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-16 pl-14 bg-white border-slate-200 rounded-[20px] text-slate-900 font-bold text-base focus-visible:ring-[#0081C9] shadow-sm transition-all group-hover:border-[#0081C9]/30"
                />
                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0081C9] transition-colors" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-[#0081C9] hover:bg-[#0081C9]/90 text-white font-black uppercase tracking-widest text-xs rounded-[20px] shadow-xl shadow-blue-200 transition-all active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-4">
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </span>
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                System Status
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Global Network Online</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">v3.4.1</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

