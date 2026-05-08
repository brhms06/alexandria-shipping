"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Ship, Plane, Truck, Building2, FileCheck, ArrowRight, Anchor, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    title: "Ocean Freight",
    icon: <Ship size={28} />,
    image: "/transport-sea.jpg",
    desc: "Our ocean freight solutions offer the most cost-effective method for moving large volumes of cargo globally. We partner with top-tier shipping lines to guarantee space, reliable transit times, and careful handling of your containers from port to port.",
    features: ["FCL & LCL Services", "Port-to-Port Tracking", "Hazardous Material Handling"]
  },
  {
    title: "Air Freight",
    icon: <Plane size={28} />,
    image: "/transport-air.jpg",
    desc: "When time is of the essence, our air freight services ensure your goods reach their destination rapidly. Ideal for high-value or time-sensitive shipments, we provide priority boarding and expedited handling across international borders.",
    features: ["Express Door-to-Door", "Charter Services", "Global Network Reach"]
  },
  {
    title: "Road Transport",
    icon: <Truck size={28} />,
    image: "/transport-land.jpeg",
    desc: "Our robust road transport network provides seamless door-to-door delivery. Whether it's full truckload (FTL) or less than truckload (LTL), our modern fleet ensures your goods are transported safely and efficiently across domestic and regional routes.",
    features: ["FTL & LTL Solutions", "Last-Mile Delivery", "Real-Time GPS Tracking"]
  },
  {
    title: "Warehousing",
    icon: <Building2 size={28} />,
    image: "/hero-bg.png",
    desc: "Store your inventory securely in our modern facilities. We offer scalable warehousing solutions, inventory management, and order fulfillment services to help streamline your supply chain and reduce overhead costs.",
    features: ["Climate Controlled Storage", "Inventory Management", "Distribution Hubs"]
  },
  {
    title: "Customs Clearance",
    icon: <FileCheck size={28} />,
    image: "/hero-bg.png",
    desc: "Navigate complex international trade regulations with ease. Our dedicated customs brokers handle all necessary documentation, duties, and compliance checks to ensure your shipments clear borders smoothly without costly delays.",
    features: ["Duty & Tax Consultation", "Compliance Auditing", "Digital Documentation"]
  },
  {
    title: "Project Logistics",
    icon: <Anchor size={28} />,
    image: "/hero-bg.png",
    desc: "Handling oversized, heavy, or complex shipments requires specialized expertise. Our project logistics team manages everything from heavy lift transportation to complex multi-modal movements for industrial projects.",
    features: ["Heavy Lift Operations", "Site Surveys", "Route Optimization"]
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen text-navy font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Global Logistics Services"
            fill
            priority
            className="object-cover object-center opacity-30 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Our Expertise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
              Logistics Solutions for a <span className="text-white/80">Global Marketplace.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed font-light mb-10">
              From deep-sea shipping to expedited air freight, Alexandria provides the infrastructure and expertise to move your business forward.
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="bg-accent hover:bg-accent/90 text-white px-10 py-5 font-bold uppercase tracking-widest text-[10px] shadow-2xl transition-all">
                 Request a Quote
               </button>
               <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-10 py-5 font-bold uppercase tracking-widest text-[10px] border border-white/20 transition-all">
                 View Network
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-slate-50 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Core Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-navy leading-tight">Comprehensive solutions for every shipment.</h3>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              We leverage a world-class network of partners and proprietary technology to ensure your cargo moves seamlessly across borders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-2xl hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/0 transition-colors duration-500" />
                    <div className="absolute bottom-6 left-6 z-10">
                       <div className="w-16 h-16 bg-white text-navy flex items-center justify-center shadow-xl group-hover:bg-accent group-hover:text-white transition-all duration-500">
                         {service.icon}
                       </div>
                    </div>
                  </div>
                  <CardContent className="p-10">
                    <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 h-20 overflow-hidden">
                      {service.desc}
                    </p>
                    <ul className="space-y-3 mb-10">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-xs font-bold text-navy/70 uppercase tracking-wider">
                          <ShieldCheck size={14} className="text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                      Explore Service <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Solutions - Dark Section */}
      <section className="py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
               <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Strategic Partnership</h2>
               <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Beyond Transportation: <br /><span className="text-white/60 text-3xl md:text-5xl italic">A Partner in Growth.</span></h3>
               <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
                 We don't just move boxes. We design supply chain strategies that reduce costs, improve speed to market, and provide the visibility you need to make critical business decisions.
               </p>
               <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                     <div className="text-3xl font-bold text-accent">99.8%</div>
                     <p className="text-xs text-white/50 uppercase tracking-widest font-bold">On-Time Reliability</p>
                  </div>
                  <div className="space-y-2">
                     <div className="text-3xl font-bold text-accent">24/7</div>
                     <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Global Support</p>
                  </div>
               </div>
               <button className="bg-white text-navy px-12 py-5 font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white transition-all shadow-2xl">
                 Contact Our Strategists
               </button>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="relative z-10 aspect-video overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                 <Image 
                   src="/hero-bg.png" 
                   alt="Logistics Technology" 
                   fill 
                   className="object-cover grayscale" 
                 />
                 <div className="absolute inset-0 bg-navy/40 mix-blend-multiply" />
               </div>
               <div className="absolute -top-10 -left-10 w-40 h-40 border-8 border-accent/20 -z-10" />
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">Our Network</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-navy mb-6">Connecting every major trade lane.</h3>
            <p className="text-slate-500 leading-relaxed">
              With strategically located hubs in Rotterdam, Singapore, and Houston, we provide a truly global reach for your cargo.
            </p>
          </div>
          <div className="relative aspect-[21/9] w-full max-w-5xl mx-auto grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 cursor-crosshair">
             <Image 
               src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop" 
               alt="Global Map" 
               fill 
               className="object-contain" 
             />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

