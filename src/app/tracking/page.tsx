"use client";

import { useState } from "react";
import { 
  Ship, ArrowRight, Package, MapPin, Clock, Shield, 
  Search, Globe, Zap, CheckCircle, Navigation, Info, AlertCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrackingSearch() {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter a valid manifest tracking ID.");
      return;
    }
    setError("");
    router.push(`/tracking/${trackingId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#0A2F6E] selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-32 relative overflow-hidden">
        
        {/* Background Ticker Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-[60px] md:text-[120px] font-black uppercase whitespace-nowrap tracking-tighter leading-none -ml-20">
              ALEXANDRIA LOGISTICS NETWORK SYSTEM {i}
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* LEFT: THE SEARCH CONSOLE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 md:space-y-12 w-full"
            >
              <div className="space-y-4 md:space-y-6">
                <div className="bg-[#0A2F6E] text-white px-4 py-2 inline-flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                  <Shield size={14} /> Operational Asset Location System
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#0A2F6E] uppercase italic">
                  LOCATE <br />
                  <span className="text-black not-italic">CARGO.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-500 max-w-sm leading-tight uppercase tracking-tight">
                  High-resolution manifest synchronization. Access real-time positioning and chain of custody.
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-6 w-full">
                <div className="relative group w-full">
                  <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-full h-full border-4 border-dashed border-gray-200 -z-10 group-focus-within:border-[#0A2F6E] transition-colors" />
                  <div className="bg-white border-4 border-black p-5 sm:p-6 md:p-8 shadow-[8px_8px_0px_#0A2F6E] md:shadow-[12px_12px_0px_#0A2F6E]">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Manifest ID Input</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="text"
                        placeholder="ENTER ID (E.G. ALX-7179...)"
                        value={trackingId}
                        onChange={(e) => { setTrackingId(e.target.value); setError(""); }}
                        className="h-14 sm:h-16 bg-gray-50 border-4 border-black rounded-none px-4 sm:px-6 text-sm sm:text-lg font-black tracking-widest uppercase focus-visible:ring-0 w-full"
                      />
                      <Button 
                        type="submit" 
                        className="h-14 sm:h-16 px-8 sm:px-12 bg-[#0A2F6E] hover:bg-[#061B3D] text-white rounded-none font-black uppercase tracking-widest text-xs shadow-lg w-full sm:w-auto"
                      >
                        Search <ArrowRight size={18} className="ml-3" />
                      </Button>
                    </div>
                    {error && <p className="text-red-600 font-black uppercase tracking-widest text-[10px] mt-4 flex items-center gap-2"><AlertCircle size={12}/> {error}</p>}
                  </div>
                </div>
              </form>

              {/* System Compliance */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 sm:pt-6">
                {[
                  { label: "Encrypted Feed", icon: Shield },
                  { label: "150+ Hubs Active", icon: Globe },
                  { label: "Real-Time Sync", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <item.icon size={16} className="text-[#0A2F6E]" /> {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: THE VISUAL PROOF */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative hidden lg:block"
            >
              <div className="border-[8px] border-black aspect-[4/5] relative overflow-hidden shadow-[30px_30px_0px_rgba(10,47,110,0.1)]">
                 <Image src="/transport-air.jpg" alt="Aviation Logistics" fill className="object-cover grayscale" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A2F6E]/40 to-transparent" />
                 
                 {/* Data Overlay */}
                 <div className="absolute bottom-10 left-10 right-10 bg-white border-4 border-black p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Live Network Statistics</p>
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                          <p className="text-xs font-black uppercase text-[#0A2F6E]">Signal Stability</p>
                          <p className="text-2xl font-black">99.98%</p>
                       </div>
                       <div>
                          <p className="text-xs font-black uppercase text-[#0A2F6E]">Uptime Rating</p>
                          <p className="text-2xl font-black">Grade A+</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 border-4 border-black border-dashed rounded-full animate-spin-slow opacity-20" />
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
