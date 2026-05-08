"use client";

import { useState } from "react";
import { 
  ArrowRight, ShieldCheck, Globe, Zap, AlertCircle, Search, 
  MapPin, Clock, Package, ChevronRight, Truck, Plane, Ship,
  Phone, Mail
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
      setError("Please enter a valid tracking number.");
      return;
    }
    setError("");
    router.push(`/tracking/${trackingId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/hero-bg.png"
              alt="Global Tracking"
              fill
              priority
              className="object-cover object-center grayscale"
            />
            <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Track Your <span className="text-blue-400">Shipment</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Enter your tracking number below to get real-time updates on your cargo's journey, 
                wherever it is in the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tracking Console */}
        <section className="relative z-20 -mt-16 px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Shipment Reference Number</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <Input
                        type="text"
                        placeholder="e.g. ALEX-7179-X90"
                        value={trackingId}
                        onChange={(e) => { setTrackingId(e.target.value); setError(""); }}
                        className="h-16 pl-12 bg-slate-50 border-slate-200 rounded-xl text-lg font-medium text-slate-900 focus:ring-primary focus:border-primary w-full transition-all"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                      Track Now <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </div>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-red-600 text-sm font-bold"
                    >
                      <AlertCircle size={16} /> {error}
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
                   {[
                     { i: Globe, t: "Global Coverage", d: "Track cargo across all major trade lanes." },
                     { i: Clock, t: "Real-time Updates", d: "Instant status notifications for every milestone." },
                     { i: ShieldCheck, t: "Secure Access", d: "Protected shipment data and manifest logs." }
                   ].map((f, i) => (
                     <div key={i} className="flex flex-col items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                           <f.i size={20} className="text-primary" />
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-slate-900 mb-1">{f.t}</h4>
                           <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </form>
            </motion.div>

            {/* Additional Info / Help */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                     <Mail size={24} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Need Assistance?</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">Our customer support team is available 24/7 to help you with your shipment queries.</p>
                  <Button variant="link" className="p-0 text-primary font-bold h-auto hover:no-underline flex items-center gap-2">
                    Contact Support <ChevronRight size={16} />
                  </Button>
               </div>
               <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                     <ShieldCheck size={24} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Partner Portal</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">Log in to our partner portal for bulk tracking, document management, and more.</p>
                  <Button onClick={() => router.push('/admin')} variant="link" className="p-0 text-primary font-bold h-auto hover:no-underline flex items-center gap-2">
                    Partner Login <ChevronRight size={16} />
                  </Button>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
