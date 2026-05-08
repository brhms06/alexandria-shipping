"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { Ship, Lock, User, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] text-slate-900 relative overflow-hidden p-4 font-sans">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-[#B8860B]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 rounded-2xl relative">
          
          <div className="text-center mb-12">
            <div className="mx-auto mb-8 w-24 h-24 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-2xl shadow-sm relative group">
              <Ship className="text-[#002D5B] group-hover:scale-110 transition-transform duration-500" size={48} />
              <div className="absolute -bottom-2 -right-2 bg-[#B8860B] text-white p-1.5 rounded-lg shadow-lg">
                <ShieldCheck size={18} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Admin Dashboard</h1>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-[0.2em]">Alexandria Logistics Group</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Administrator Email</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#B8860B] transition-colors" size={18} />
                <Input 
                  type="email" 
                  placeholder="name@alexandria-shipping.com"
                  required
                  className="h-14 pl-12 pr-4 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 rounded-xl focus-visible:ring-2 focus-visible:ring-[#B8860B]/20 focus-visible:border-[#B8860B] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Access Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#B8860B] transition-colors" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="h-14 pl-12 pr-4 bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 rounded-xl focus-visible:ring-2 focus-visible:ring-[#B8860B]/20 focus-visible:border-[#B8860B] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-[#002D5B] hover:bg-[#003d7a] text-white font-bold uppercase tracking-wider rounded-xl text-sm flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10 group transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"} 
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-50 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck size={14} className="text-[#B8860B]" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Administration Portal</span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium leading-relaxed uppercase tracking-wider">
              Protected access for authorized personnel only. <br />
              Secure management interface for Alexandria Logistics.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Brand Elements */}
      <div className="absolute bottom-12 left-12 hidden lg:block opacity-20">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Alexandria Logistics Group</p>
      </div>
      <div className="absolute bottom-12 right-12 hidden lg:block opacity-20 text-right">
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">v2.5.0-production</p>
      </div>
    </div>
  );
}
