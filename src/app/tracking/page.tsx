"use client";

import { useState } from "react";
import { 
  ArrowRight, Shield, Globe, Zap, AlertCircle, Search, 
  MapPin, Clock, Package, ChevronRight 
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-accent selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center bg-navy overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.png"
              alt="Global Tracking"
              fill
              priority
              className="object-cover object-center opacity-30 grayscale brightness-50"
            />
            <div className="absolute inset-0 bg-navy/60" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Real-Time Search</span>
                <div className="w-12 h-[2px] bg-accent" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight uppercase">
                Trace Your Cargo
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
                Access real-time positioning, status updates, and documentation for your global shipments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Console Section */}
        <section className="relative z-20 -mt-10 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,51,102,0.1)] rounded-sm border border-slate-100"
            >
              <form onSubmit={handleSearch} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-navy uppercase tracking-widest block">Enter Tracking Number</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-navy transition-colors" size={20} />
                      <Input
                        type="text"
                        placeholder="E.G. ALX-7179-X90"
                        value={trackingId}
                        onChange={(e) => { setTrackingId(e.target.value); setError(""); }}
                        className="h-16 pl-12 bg-slate-50 border-slate-200 rounded-sm text-lg font-medium focus-visible:ring-1 focus-visible:ring-navy w-full"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="h-16 px-10 bg-accent hover:bg-accent/90 text-white rounded-sm font-bold uppercase tracking-widest text-xs transition-all shadow-lg"
                    >
                      Track Now <ArrowRight size={18} className="ml-3" />
                    </Button>
                  </div>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-600 font-bold text-xs uppercase tracking-tight flex items-center gap-2 mt-2"
                    >
                      <AlertCircle size={14}/> {error}
                    </motion.p>
                  )}
                </div>

                <div className="pt-8 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      <Shield size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure Access</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      <Globe size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Network</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                      <Zap size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Updates</span>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Shipping Insights & Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                    <Image src="/img-1.jpg" alt="Shipping 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                    <Image src="/img-2.png" alt="Shipping 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                    <Image src="/img-3.png" alt="Shipping 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
                    <Image src="/img-4.png" alt="Shipping 4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-accent" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Shipping Excellence</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight leading-tight">
                  How Alexandria Redefines <span className="text-accent italic">Global Shipping</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  At Alexandria, shipping is more than just moving cargo; it's about honoring the trust you place in us. We operate with a core set of values—<b>Reliability, Integrity, and Precision</b>—that ensure your assets are handled with the highest degree of care.
                </p>
                <div className="space-y-6">
                  {[
                    { t: "Unmatched Reliability", d: "We utilize a decentralized logistics network that minimizes delays and ensures 99% on-time delivery across 150+ ports." },
                    { t: "Trustworthy Operations", d: "Every manifest is verified through multi-stage audit processes, providing you with 100% transparency." },
                    { t: "Expert Handling", d: "Our team consists of maritime veterans who specialize in complex freight, from heavy machinery to fragile high-value goods." }
                  ].map((val, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-navy group-hover:text-white transition-all duration-300">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:bg-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy uppercase text-sm tracking-widest mb-1">{val.t}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{val.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="h-14 px-10 bg-navy hover:bg-navy-dark text-white rounded-none font-bold uppercase tracking-widest text-xs transition-all shadow-xl">
                  Explore Our Heritage
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Info Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-16 h-1 w-accent bg-accent" />
              <h3 className="text-xl font-bold text-navy">Manifest Integration</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Our tracking system is directly synchronized with carrier manifests and port authority systems, providing the highest level of accuracy for your data.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Learn About Our API <ChevronRight size={14} />
              </a>
            </div>
            
            <div className="space-y-6">
              <div className="w-16 h-1 w-navy bg-navy" />
              <h3 className="text-xl font-bold text-navy">Multimodal Visibility</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Track your cargo across sea, air, and land. We provide seamless visibility as your shipment transitions between different modes of transport.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Our Capabilities <ChevronRight size={14} />
              </a>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-1 w-accent bg-accent" />
              <h3 className="text-xl font-bold text-navy">Document Management</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Access and download essential shipping documents, including Bills of Lading, Customs Declarations, and Delivery Orders, directly from the tracking portal.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                Download Guide <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Features / Why Track Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  icon: Globe,
                  title: "Global Visibility",
                  desc: "Real-time monitoring across 150+ ports and international trade corridors."
                },
                {
                  icon: Shield,
                  title: "Secure Data",
                  desc: "End-to-end encrypted shipment manifests and secure documentation access."
                },
                {
                  icon: Zap,
                  title: "Instant Updates",
                  desc: "Automatic notifications for every milestone in your cargo's journey."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6 group"
                >
                  <div className="w-16 h-16 bg-navy/5 flex items-center justify-center rounded-none group-hover:bg-navy group-hover:text-white transition-all duration-500">
                    <item.icon size={28} className="text-navy group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-navy uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action for Large Accounts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-12 bg-navy relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 opacity-10 bg-navy">
              </div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Enterprise Logistics Control</h2>
                <p className="text-white/70 text-lg font-light leading-relaxed">
                  Managing a high volume of containers? Access our professional fleet management dashboard with advanced analytics and API integration.
                </p>
                <div className="pt-4">
                  <Button className="h-14 px-10 bg-accent hover:bg-accent/90 text-white rounded-none font-bold uppercase tracking-widest text-xs transition-all shadow-xl">
                    Request Partner Access
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

