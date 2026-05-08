"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Ship, Plane, Truck, Building2, FileCheck, Anchor, Zap, ShieldCheck, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Ocean Freight",
    icon: <Ship size={32} />,
    image: "/transport-sea.jpg",
    desc: "Comprehensive deep-sea logistics solutions. We coordinate high-capacity shipments across primary global trade routes with precision tracking.",
    features: ["FCL & LCL Services", "Port-to-Port Tracking", "Hazardous Cargo Handling"]
  },
  {
    title: "Air Freight",
    icon: <Plane size={32} />,
    image: "/transport-air.jpg",
    desc: "Rapid transport solutions for time-critical cargo. Priority handling for expedited transit across all international regulatory perimeters.",
    features: ["Express Global Routing", "Charter Operations", "Real-time Tracking"]
  },
  {
    title: "Road Transport",
    icon: <Truck size={32} />,
    image: "/transport-land.jpeg",
    desc: "Versatile ground transport network. Real-time GPS tracking and efficient last-mile delivery for regional distribution.",
    features: ["Heavy Load Solutions", "Door-to-Door Delivery", "Secure Transit Documentation"]
  },
  {
    title: "Warehousing",
    icon: <Building2 size={32} />,
    image: "/hero-bg.png",
    desc: "Secure cargo storage within modern facilities. Climate-controlled storage with real-time inventory management and fulfillment services.",
    features: ["Modern Storage Facilities", "Inventory Management", "Automated Loading"]
  },
  {
    title: "Customs Clearing",
    icon: <FileCheck size={32} />,
    image: "/hero-bg.png",
    desc: "Efficient regulatory compliance. Our experienced brokers manage manifest clearing to ensure seamless border transitions for your cargo.",
    features: ["Compliance Auditing", "Digital Documentation", "Seamless Clearing"]
  },
  {
    title: "Project Logistics",
    icon: <Anchor size={32} />,
    image: "/hero-bg.png",
    desc: "Specialized handling of oversized and heavy cargo. Complex multi-modal coordination for large-scale industrial projects.",
    features: ["Heavy Lift Solutions", "Route Optimization", "Project Management"]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-[#00458B] selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[#00458B] transform skew-x-12 translate-x-20" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#00458B]/10 text-[#00458B] text-xs font-bold uppercase tracking-wider mb-6">
                Our Capabilities
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#00458B] mb-8 leading-tight tracking-tight">
                Global Logistics <br />
                <span className="text-slate-400">Excellence.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                From ocean routing to expedited air transport, Alexandria provides the infrastructure for a seamless global supply chain.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button className="bg-[#00458B] hover:bg-[#003366] text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center gap-2">
                   Request a Quote <ArrowRight size={18} />
                 </button>
                 <button className="bg-white hover:bg-slate-50 text-[#00458B] border border-slate-200 px-8 py-4 rounded-lg font-bold transition-all">
                   Contact Sales
                 </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#00458B]/5 hover:border-[#00458B]/20 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center text-[#00458B] mb-8 group-hover:bg-[#00458B] group-hover:text-white transition-all duration-300">
                    {svc.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#00458B] transition-colors">{svc.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 min-h-[80px]">
                    {svc.desc}
                  </p>
                  
                  <div className="space-y-3">
                    {svc.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00458B]/40" />
                        <span className="text-sm font-medium text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-slate-100 group-hover:border-[#00458B]/10 transition-colors">
                    <button className="text-sm font-bold text-[#00458B] flex items-center gap-2 group/btn">
                      Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-32 bg-[#00458B] text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full border-[40px] border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <Zap className="text-white/40 mx-auto mb-8" size={48} />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Professional Logistics <br />
              <span className="text-white/60">Support Center.</span>
            </h2>
            <p className="text-xl text-white/70 mb-16 max-w-2xl mx-auto leading-relaxed">
              Our global team is available 24/7 to provide expert assistance for your shipping and logistics requirements.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Email Inquiries</p>
                  <p className="text-2xl font-bold tracking-tight">info@alexandria-shipping.com</p>
               </div>
               <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-left">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Phone Support</p>
                  <p className="text-2xl font-bold tracking-tight">+1 (800) 555-0123</p>
               </div>
            </div>
          </div>
        </section>

        {/* Global Network Section */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1">
                <span className="inline-block py-1 px-3 rounded-full bg-[#00458B]/10 text-[#00458B] text-xs font-bold uppercase tracking-wider mb-6">
                  Global Reach
                </span>
                <h2 className="text-4xl font-bold text-[#00458B] mb-8 leading-tight">
                  Connecting the World's Primary Shipping Hubs.
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[#00458B]">
                      <Globe size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900">Global Network</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Over 150 port terminals integrated within our global logistics network.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[#00458B]">
                      <ShieldCheck size={24} />
                    </div>
                    <h4 className="font-bold text-slate-900">Verified Carriers</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Rigorous vetting process for all transport partners to ensure cargo safety.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden relative">
                  <Image 
                    src="/transport-sea.jpg" 
                    alt="Network" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00458B]/20" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 max-w-[240px]">
                  <p className="text-3xl font-black text-[#00458B] mb-1 tracking-tight">99.8%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reliability Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
