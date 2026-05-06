"use client";

import { useState } from "react";
import { 
  Ship, ArrowRight, Package, Globe, Clock, Check, Search, Phone, 
  Navigation, ArrowUpRight, CheckCircle2, Building2, TrendingUp, 
  Users, Mail, MapPin, Truck, Plane, Anchor, Info, FileText, Shield
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[#0A2F6E] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ─── 1. OFFICIAL HERO ═══ */}
      <section className="relative bg-white text-black min-h-[85svh] flex flex-col border-b-[8px] border-black overflow-hidden">
        
        {/* Warm Sunset Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0A2F6E] via-[#2B7FFF]/10 to-[#FF8C42]/10 opacity-60" />
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
           <Image src="/hero-bg.png" alt="Logistics Network" fill className="object-cover grayscale" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF8C42]/5 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2B7FFF]/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 flex-1 flex items-center pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 w-full items-center">
            
            {/* Hero Left Content */}
            <div className="max-w-3xl w-full">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A2F6E] to-[#2B7FFF] text-white px-4 py-2 mb-6 sm:mb-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#0A2F6E]/20">
                <Globe size={14} className="text-blue-300" /> Global Logistics Standard v4.0
              </div>
              
              <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6 sm:mb-8 text-[#0A2F6E] uppercase">
                RELIABLE<br />
                TRANSPORT.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">ON TIME.</span>
              </h1>
              
              <p className="text-lg md:text-xl font-bold text-gray-500 mb-8 sm:mb-10 max-w-lg leading-tight uppercase tracking-tight">
                High-performance freight solutions for complex global supply chains. Your cargo, our <span className="text-[#0A2F6E] underline decoration-4 decoration-[#FF8C42]/30">institutional commitment</span>.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#0A2F6E] to-[#061B3D] hover:from-[#2B7FFF] hover:to-[#0A2F6E] text-white rounded-none px-12 h-16 font-black uppercase text-xs tracking-widest shadow-[8px_8px_0px_rgba(10,47,110,0.2)] transition-all duration-500">
                  Request Manifest <ArrowRight size={18} className="ml-3" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-4 border-black rounded-none px-12 h-16 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all bg-white">
                  Our Fleet
                </Button>
              </div>
            </div>

            {/* Hero Right / Tracking Entry */}
            <div className="relative w-full">
              {/* Subtle backglow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0A2F6E]/20 via-[#FF8C42]/10 to-[#2B7FFF]/20 blur-[60px] animate-pulse" />
              
              <div className="bg-white border-4 sm:border-[6px] border-black p-6 sm:p-10 shadow-[10px_10px_0px_#0A2F6E] sm:shadow-[20px_20px_0px_#0A2F6E] relative z-20 group">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A2F6E] mb-2 uppercase tracking-tighter italic">Locate Asset</h3>
                <p className="text-[10px] font-bold text-gray-400 mb-6 sm:mb-8 uppercase tracking-widest">Global GPS Synchronization Active</p>
                
                <form onSubmit={handleSearch} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-black uppercase tracking-widest mb-3 block">Enter Tracking ID</label>
                    <Input 
                      placeholder="e.g. ALX-71798233-ALTS" 
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="h-14 sm:h-16 bg-gray-50 border-4 border-black rounded-none focus-visible:ring-0 text-sm sm:text-lg font-black uppercase transition-all focus:border-[#2B7FFF] focus:bg-white"
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 sm:h-16 bg-[#0A2F6E] hover:bg-[#061B3D] text-white font-black uppercase tracking-widest text-xs rounded-none transition-all relative overflow-hidden group/btn">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
                    <span className="relative z-10 flex items-center justify-center">
                      Initialize Tracking <Search size={18} className="ml-3" />
                    </span>
                  </Button>
                </form>

                <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t-2 border-dashed border-gray-200">
                  <p className="text-[10px] font-black text-gray-400 mb-2 uppercase text-center tracking-widest">Operations Hotline</p>
                  <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0A2F6E] to-[#2B7FFF] text-center tracking-tighter italic">
                    +0800 123 456
                  </p>
                </div>
              </div>
              {/* Decorative block */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-full h-full border-4 border-dashed border-[#FF8C42]/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. PERFORMANCE STATS (Structured) ═══ */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-10 -mt-12 mb-32">
        <div className="bg-white border-4 border-black grid grid-cols-2 md:grid-cols-4 divide-x-4 divide-black overflow-hidden shadow-2xl">
          {[
            { num: "50+", label: "Port Branches", icon: <Globe size={24} /> },
            { num: "1M+", label: "Units Delivered", icon: <Package size={24} /> },
            { num: "2.5K", label: "Active Clients", icon: <Users size={24} /> },
            { num: "99%", label: "SLA Compliance", icon: <CheckCircle2 size={24} /> }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white hover:bg-gray-50 transition-colors">
              <div className="text-[#0A2F6E] mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-black mb-1 italic tracking-tighter">{stat.num}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 3. INSTITUTIONAL EXPERTISE ═══ */}
      <section className="py-32 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Images - Structured Frames */}
            <div className="relative flex justify-center w-full">
              <div className="absolute -inset-10 bg-[#FF8C42]/5 blur-[80px] rounded-full -z-10" />
              <div className="relative border-4 sm:border-[6px] border-black w-full max-w-[450px] aspect-[4/5] z-10 bg-gray-100 overflow-hidden shadow-[10px_10px_0px_#0A2F6E] sm:shadow-[20px_20px_0px_#0A2F6E]">
                <Image src="/about-logistics.jpg" alt="Operations" fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="absolute -bottom-8 sm:-bottom-12 -left-2 sm:-left-4 w-2/3 aspect-square border-4 sm:border-[6px] border-black bg-white z-20 overflow-hidden shadow-2xl">
                <Image src="/about-logistics-2.jpg" alt="Coordination" fill className="object-cover" />
              </div>
              
              {/* Official Stamp */}
              <div className="absolute -top-6 sm:-top-10 -right-2 sm:-right-4 z-30 bg-white border-2 sm:border-4 border-[#FF8C42] p-3 sm:p-6 -rotate-6 shadow-xl">
                <div className="text-[#FF8C42] border border-[#FF8C42] p-1 sm:p-2 text-center">
                  <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Verified Since</p>
                  <p className="text-2xl sm:text-4xl font-black tracking-tighter italic">2013</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <Badge className="bg-[#0A2F6E] text-white rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
                Operational Profile
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-black mb-10 leading-none uppercase tracking-tighter">
                DRIVEN BY DATA.<br />
                BUILT FOR <span className="text-[#0A2F6E]">LOGISTICS.</span>
              </h2>
              <p className="text-xl font-bold text-gray-500 mb-12 leading-tight uppercase tracking-tight">
                Alexandria provides a critical link in the global supply chain, merging legacy reliability with advanced predictive telemetry.
              </p>

              <div className="space-y-10 mb-16">
                <div className="flex gap-8">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center shrink-0 bg-gray-50 text-[#0A2F6E]">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black mb-1 uppercase tracking-tight">Continental Network</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Seamless multi-port coordination across 150+ economic zones.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center shrink-0 bg-gray-50 text-[#0A2F6E]">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-black mb-1 uppercase tracking-tight">Security Protocol</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">Highest-tier cargo protection and verified chain of custody.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-black hover:bg-gray-900 text-white rounded-none px-12 h-16 font-black uppercase text-xs tracking-widest">
                Manifest Details <ArrowRight size={18} className="ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. CORE CAPABILITIES ═══ */}
      <section className="py-32 bg-gray-50 border-y-4 border-black" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-3xl">
              <Badge className="bg-white border-2 border-black text-black rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
                Service Catalog
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black text-black leading-none uppercase tracking-tighter">
                UNCOMPROMISED<br />OPERATIONAL FLOW.
              </h2>
            </div>
            <Button variant="outline" className="border-4 border-black bg-white hover:bg-black hover:text-white text-black font-black uppercase px-8 h-16 rounded-none tracking-widest text-xs transition-all">
              All Capabilities <ArrowRight size={18} className="ml-3" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black border-4 border-black shadow-2xl">
            {[
              { title: "Road Transport", image: "/road-transport.jpg", desc: "Heavy-duty road transport optimized for trans-continental heavy haulage.", icon: <Truck size={32} /> },
              { title: "Air Freight", image: "/air-freight.png", desc: "Strategic air-bridge solutions for high-priority, time-sensitive cargo.", icon: <Plane size={32} /> },
              { title: "Ocean Freight", image: "/ocean-freight.png", desc: "Global maritime forwarding with direct access to major economic ports.", icon: <Ship size={32} /> }
            ].map((service, i) => (
              <div key={i} className="group bg-white flex flex-col h-full hover:bg-gradient-to-br hover:from-[#0A2F6E] hover:to-[#1a4b9c] transition-all duration-500 relative overflow-hidden">
                {/* Hover Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                
                <div className="relative h-72 overflow-hidden border-b-4 border-black">
                  <Image src={service.image} alt={service.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white border-4 border-black flex items-center justify-center text-[#0A2F6E] shadow-xl group-hover:bg-[#FF8C42] group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <div className="p-10 flex-1 flex flex-col group-hover:text-white relative z-10">
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">{service.title}</h3>
                  <p className="text-sm font-bold opacity-60 mb-10 leading-tight uppercase tracking-tight group-hover:opacity-80">{service.desc}</p>
                  <div className="mt-auto flex items-center gap-2 font-black uppercase text-[10px] tracking-widest border-t border-black/10 group-hover:border-white/10 pt-6">
                    Operational Status: Active <Check size={12} className="text-green-500 group-hover:text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. DEPLOYMENT LOGIC ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 text-center">
          <Badge className="bg-[#0A2F6E] text-white rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
            Logistics Pipeline
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-black mb-24 uppercase tracking-tighter">THE DELIVERY CYCLE.</h2>

          <div className="grid md:grid-cols-3 gap-0 relative">
            {[
              { step: "01", title: "Manifest Entry", img: "/step-receive.jpg", desc: "Systematic data ingestion and cargo verification at origin point." },
              { step: "02", title: "Active Transit", img: "/step-transport.jpeg", desc: "Autonomous routing and secure transit across optimized lanes." },
              { step: "03", title: "Final Validation", img: "/step-deliver.jpeg", desc: "Last-mile deployment and institutional confirmation of receipt." }
            ].map((process, i) => (
              <div key={i} className="flex flex-col items-center group bg-white border-4 border-black p-12 hover:bg-gray-50 transition-all">
                <div className="relative w-40 h-40 border-4 border-black overflow-hidden mb-10 rotate-3 group-hover:rotate-0 transition-transform">
                  <Image src={process.img} alt={process.title} fill className="object-cover grayscale" />
                </div>
                <div className="text-[10px] font-black text-gray-300 mb-2 uppercase tracking-[0.4em]">Checkpoint {process.step}</div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter">{process.title}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase leading-tight">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. OPERATIONS TEAM ═══ */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-24">
            <Badge className="bg-white text-black rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
              Directorship
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase">THE EXPERTS.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/20 border-4 border-white">
            {[
              { name: "Alisa Smith", role: "Chief Executive", img: "/team-1.png" },
              { name: "Andre Midas", role: "Head of Transit", img: "/team-2.png" },
              { name: "Cody Belicel", role: "Port Director", img: "/team-3.png" },
              { name: "Tom Potter", role: "Ground Ops", img: "/team-4.jpg" }
            ].map((member, i) => (
              <div key={i} className="bg-black p-8 group">
                <div className="relative aspect-square border-2 border-white/20 overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{member.name}</h3>
                <p className="text-[#2B7FFF] text-[10px] font-black uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
