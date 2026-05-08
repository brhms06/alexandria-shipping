"use client";

import { useState } from "react";
import { 
  Ship, ArrowRight, Package, Globe, Clock, Search, 
  Building2, Users, Mail, MapPin, Truck, Plane, Anchor, 
  FileText, ShieldCheck, DollarSign, Star, Quote, ChevronRight, Zap,
  BarChart3, Globe2, Shield
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/tracking/${trackingId.trim()}`);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Maritime Logistics" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002D5B]/90 via-[#002D5B]/70 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 grid lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">World Class Logistics Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Global Logistics<br />
              <span className="text-blue-400">Simplified.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-xl leading-relaxed">
              Alexandria Shipping provides comprehensive maritime, air, and land freight solutions with real-time tracking and unmatched security.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tracking">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-transparent text-white border-2 border-blue-600 hover:border-white font-bold rounded-md px-8 h-14 transition-all shadow-xl"
                >
                  Track My Package
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-transparent text-white border-2 border-blue-600 hover:border-white font-bold rounded-md px-8 h-14 transition-all shadow-xl"
                >
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Tracking Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-2xl p-8 lg:p-10 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-blue-50 rounded-lg">
                  <Search size={24} className="text-primary" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Track & Trace</h3>
                  <p className="text-sm text-slate-500">Real-time shipment status</p>
               </div>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tracking Number</label>
                <Input 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g. ALEX-123456" 
                  className="bg-slate-50 border-slate-200 rounded-lg h-14 text-lg font-medium focus:ring-primary focus:border-primary transition-all" 
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-14 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Track Shipment
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>Secure System</span>
               </div>
               <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={16} className="text-blue-500" />
                  <span>24/7 Support</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
           <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Strategic Partners & Clients</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {[
                { name: "DHL", src: "/dhl.png" },
                { name: "FedEx", src: "/fedex.png" },
                { name: "MAERSK", src: "/Maserk.png" },
                { name: "UPS", src: "/ups.png" }
              ].map((partner) => (
                <div key={partner.name} className="relative w-32 h-12 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 duration-300">
                  <Image 
                    src={partner.src} 
                    alt={partner.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Expert Logistics Solutions</h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              We offer a wide range of services tailored to meet the complex demands of global shipping and supply chain management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Ocean Freight", 
                image: "/ocean-freight.png", 
                icon: Ship,
                desc: "Reliable and cost-effective sea transport solutions for full and partial container loads." 
              },
              { 
                title: "Air Freight", 
                image: "/air-freight.png", 
                icon: Plane,
                desc: "Time-critical delivery services connecting you to major global hubs with speed and precision." 
              },
              { 
                title: "Road Transport", 
                image: "/road-transport.jpg", 
                icon: Truck,
                desc: "Flexible land logistics and distribution networks ensuring your cargo reaches its final destination." 
              }
            ].map((svc, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden group"
              >
                <div className="relative h-64">
                  <Image 
                    src={svc.image} 
                    alt={svc.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <svc.icon size={32} className="mb-2" />
                    <h4 className="text-2xl font-bold">{svc.title}</h4>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-primary hover:text-white transition-all font-bold">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT / WHY US ─── */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="maritime-grid absolute inset-0" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em]">The Alexandria Advantage</h2>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your Trusted Global Partner</h3>
              </div>
              <p className="text-blue-100/70 text-lg leading-relaxed">
                With over a decade of experience in international logistics, we have built a reputation for reliability, security, and innovation. Our global network ensures that your cargo is always in good hands.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-8">
                {[
                  { icon: Globe2, title: "Global Network", desc: "Access to 500+ secure logistics hubs worldwide." },
                  { icon: Shield, title: "Secure Cargo", desc: "Advanced manifest management and asset protection." },
                  { icon: BarChart3, title: "Live Tracking", desc: "Precision tracking for every step of the journey." },
                  { icon: Users, title: "Expert Support", desc: "Dedicated logistics specialists available 24/7." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg h-fit">
                      <item.icon size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-blue-100/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full" />
               <div className="relative bg-white/5 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/img-1.jpg" 
                    alt="Network" 
                    width={800} 
                    height={600} 
                    className="rounded-xl opacity-90 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-10 left-10 p-8 bg-blue-600 shadow-2xl rounded-xl">
                    <div className="text-5xl font-black text-white mb-1">10+</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-blue-100">Years of Excellence</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="py-40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Ready to Start?</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
            Let's Move Your Cargo<br /> To Its Destination.
          </h2>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with our team today for a personalized quote and logistics plan tailored to your specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md h-16 px-12 font-bold text-lg shadow-xl">
                Get a Quote
             </Button>
             <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md h-16 px-12 font-bold text-lg">
                Contact Sales
             </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
