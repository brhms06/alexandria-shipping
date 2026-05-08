"use client";

import { useState } from "react";
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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
    <div className="min-h-screen flex font-sans selection:bg-navy selection:text-white">
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Maritime Operations"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/80 to-navy/95" />
        </div>

        <div className="relative z-10 max-w-lg px-16">
          <div className="relative w-64 h-20 mb-12">
            <Image
              src="/alexandria-shipping-logo.png"
              alt="Alexandria Shipping Logo"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-6 tracking-tight">
            Command Center<br />
            <span className="text-white/60">Administrative Portal</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-12">
            Manage shipments, track logistics operations, and oversee the entire Alexandria Maritime network from one centralized dashboard.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Monitoring</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">150+</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Global Ports</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">99.8%</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Uptime</span>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#050B14] p-6 sm:p-12 relative overflow-hidden">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #FFBE00 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />

        <div className="w-full max-w-md relative z-10">
          
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <div className="relative w-52 h-14 mb-4">
              <Image
                src="/alexandria-shipping-logo.png"
                alt="Alexandria Shipping Logo"
                fill
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-10 bg-accent" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Secure Access</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 italic">
              Admin Login
            </h1>
            <p className="text-white/30 text-sm font-medium tracking-wide">
              Sign in to access the Alexandria command console.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-widest flex items-center gap-3 rounded-sm">
              <ShieldCheck size={18} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@alexandriashipping.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 pl-12 bg-white/5 border-white/10 rounded-sm text-white font-bold text-sm focus-visible:ring-accent placeholder:text-white/10"
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 pl-12 bg-white/5 border-white/10 rounded-sm text-white font-bold text-sm focus-visible:ring-accent placeholder:text-white/10"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-accent hover:bg-accent/90 text-navy font-bold uppercase tracking-[0.3em] text-[11px] rounded-sm shadow-2xl shadow-accent/10 transition-all group overflow-hidden relative"
            >
              {loading ? (
                <span className="flex items-center gap-3 relative z-10">
                  {loading ? <Loader2 size={18} className="animate-spin" /> : null} 
                  {loading ? 'Authenticating...' : 'Establish Secure Connection'}
                  {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
              Encrypted Tunnel • Station 01
            </p>
            <div className="flex items-center gap-2 text-emerald-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
