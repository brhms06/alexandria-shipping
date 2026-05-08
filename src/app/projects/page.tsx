"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Shield, Zap, Box, Target, Anchor, Globe, Ship, Truck, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Humanitarian Relief Logistics",
      category: "Specialized Transport",
      route: "North America → Central America",
      desc: "Coordinated the transportation of over 450 units of essential supplies to regional facilities in Mexico. Our logistics experts optimized multimodal routes to ensure timely delivery within critical windows, maintaining full temperature-controlled integrity throughout the journey.",
      stats: [
        { label: "Cargo Volume", value: "450+ Units" },
        { label: "Efficiency", value: "98% On-Time" }
      ],
      image: "/hero-bg.png"
    },
    {
      title: "Automotive Supply Chain Solution",
      category: "Heavy Freight Operations",
      route: "East Asia → West Africa",
      desc: "Managed the large-scale shipment of 400 vehicle units from manufacturing centers in Shanghai to distribution hubs in Nigeria. Utilizing specialized RoRo carriers and meticulous documentation to streamline customs clearance and final-mile delivery.",
      stats: [
        { label: "Fleet Volume", value: "400+ Vehicles" },
        { label: "Transport Mode", value: "RoRo Carrier" }
      ],
      image: "/hero-bg.png"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-slate-900 text-white pt-48 pb-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="maritime-grid absolute inset-0" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-blue-400/30" />
                <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[11px]">Strategic Operations & Case Studies</span>
                <div className="w-12 h-px bg-blue-400/30" />
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold leading-none mb-10 tracking-tight uppercase">
                GLOBAL <span className="text-blue-500">OPERATIONS.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                A track record of excellence in complex logistics and high-volume freight management across international trade lanes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects List */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-40">
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 group">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-2 shadow-xl transition-all group-hover:shadow-2xl group-hover:border-blue-100">
                    <div className="aspect-[4/3] w-full relative overflow-hidden rounded-xl">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-all duration-1000 group-hover:scale-105" 
                      />
                    </div>
                    
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/20 font-bold text-slate-900 text-[10px] uppercase tracking-widest flex items-center gap-3">
                      {project.route} <ArrowUpRight size={14} className="text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="w-1 h-6 bg-blue-600 rounded-full" />
                       <h4 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[11px]">
                         {project.category}
                       </h4>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                      {project.title}
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 leading-relaxed text-lg">
                    {project.desc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                    {project.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                     <button className="flex items-center gap-3 text-sm font-bold text-blue-600 uppercase tracking-wider group">
                        Download Case Study <ClipboardCheck size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Performance Banner */}
        <section className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                 {[
                   { l: "Completed Deliveries", v: "15,280+", i: <Globe className="text-blue-500" size={24} /> },
                   { l: "Global Ports Served", v: "1,200+", i: <Ship className="text-blue-500" size={24} /> },
                   { l: "Cargo Safety Rating", v: "99.9%", i: <Shield className="text-blue-500" size={24} /> },
                   { l: "Operational Excellence", v: "Class-A", i: <ClipboardCheck className="text-blue-500" size={24} /> }
                 ].map((s, i) => (
                   <div key={i} className="text-center flex flex-col items-center lg:items-start lg:text-left space-y-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                        {s.i}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{s.l}</p>
                        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.v}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Call to Action */}
        <section className="py-40 bg-white relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
              <Ship size={600} />
           </div>
           <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/30">
                 <Anchor className="text-white" size={40} />
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 uppercase tracking-tight leading-none">
                 READY TO <br /><span className="text-blue-600">PARTNER?</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                 Alexandria Shipping provides end-to-end logistics solutions through a reliable global network. Connect with our experts to optimize your supply chain.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 h-16 text-sm font-bold uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20">
                   Get a Custom Quote
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-600 px-12 h-16 text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50">
                   Speak with an Expert
                </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

