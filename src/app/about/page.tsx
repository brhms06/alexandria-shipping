"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-text-dark font-sans selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] text-white pt-32 pb-40 border-b-8 border-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-logistics.jpg"
            alt="Alexandria Logistics"
            fill
            priority
            className="object-cover object-center opacity-20 grayscale mix-blend-overlay"
          />
        </div>
        {/* Warm glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8C42]/10 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2B7FFF] to-[#0A2F6E] text-white px-4 py-2 mb-8 font-black uppercase tracking-widest text-[10px] shadow-xl">
            Established 2013 • Global Protocol
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
            CONNECTING THE WORLD,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ONE PACKAGE AT A TIME.</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-white/60 max-w-2xl mx-auto leading-relaxed uppercase tracking-tight">
            From humble beginnings to a global logistics powerhouse delivering to 150+ countries.
          </p>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-[#FF8C42]/5 blur-[80px] rounded-full -z-10" />
              <div className="relative border-4 sm:border-[6px] border-black aspect-[4/5] z-10 bg-gray-100 overflow-hidden shadow-[15px_15px_0px_#0A2F6E]">
                <Image src="/team-1.png" alt="Founder" fill className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border-4 border-black bg-[#FF8C42] -z-0 shadow-2xl flex items-center justify-center p-6">
                <div className="border border-white/30 w-full h-full flex flex-col items-center justify-center text-white text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">FOUNDER</p>
                  <p className="text-2xl font-black italic tracking-tighter">ALX-001</p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in lg:pl-10">
              <Badge className="bg-[#0A2F6E] text-white rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
                Operational Origins
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black text-black mb-10 leading-none uppercase tracking-tighter">
                HOW IT ALL <span className="text-[#0A2F6E]">STARTED.</span>
              </h2>
              <p className="text-xl font-bold text-gray-500 mb-8 leading-tight uppercase tracking-tight">
                Alexandria was originally started and managed by Alisa Smith's granddad. What began as a small local operation soon grew into a vision for something much larger.
              </p>
              <p className="text-base font-bold text-gray-400 leading-relaxed mb-12 uppercase tracking-tight">
                Along the way, the business was passed down. During a networking event in Dallas, Texas, three friends joined the mission, bringing new expertise and energy. Today, that combined vision has transformed Alexandria into a global network, operating and delivering to over 150+ countries worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t-4 border-black">
                <div className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-[#0A2F6E] bg-gray-50 shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black mb-1 uppercase tracking-tight">Reliability</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Your cargo arrives safely and on time, every single time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-[#0A2F6E] bg-gray-50 shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black mb-1 uppercase tracking-tight">Sustainability</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Greener logistics, reducing our carbon footprint across all operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-gradient-to-br from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] text-white py-32 relative overflow-hidden border-y-8 border-black">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C42]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-10 relative z-10 text-center">
          <Badge className="bg-white text-black rounded-none px-4 py-1 mb-6 font-black uppercase tracking-widest text-[10px]">
            Our Achievements
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black mb-20 uppercase tracking-tighter">MILESTONES THAT MATTER.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/20 border-4 border-white shadow-2xl">
            {[
              { num: "700+", label: "Weekly Capacity", icon: TrendingUp, desc: "Packages shipped in a single week before Christmas." },
              { num: "150+", label: "Global Reach", icon: Globe, desc: "Countries actively served by our delivery network." },
              { num: "4", label: "Core Foundation", icon: Users, desc: "Partners who built the legacy in Dallas, Texas." }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0A2F6E]/40 backdrop-blur-md p-10 hover:bg-[#2B7FFF]/20 transition-all group border border-white/5">
                <stat.icon size={48} className="text-[#FF8C42] mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <div className="text-6xl font-black mb-2 italic tracking-tighter">{stat.num}</div>
                <div className="text-xs font-black text-blue-300 uppercase tracking-[0.2em] mb-4">{stat.label}</div>
                <p className="text-[10px] font-bold text-white/50 uppercase leading-tight tracking-widest">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
