"use client";

import { useState } from "react";
import { 
  Ship, ArrowRight, Package, Globe, Clock, Search, 
  Building2, Users, Mail, MapPin, Truck, Plane, Anchor, 
  FileText, ShieldCheck, DollarSign, Star, Quote, ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
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
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-navy selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ─── 1. HERO SECTION ═══ */}
      <section className="relative min-h-[90svh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Maritime Logistics" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-white">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-12 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Delivering Smarter Logistics Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Reliable Transport.<br />On Time. Every Time.
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Alexandria Maritime provides integrated shipping and logistics services connecting major global ports with precision and reliability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent-hover text-white rounded-none px-10 h-16 font-bold uppercase text-xs tracking-widest shadow-2xl transition-all"
                  onClick={() => router.push("/tracking")}
                >
                  Track Package <ArrowRight size={18} className="ml-3" />
                </Button>
                <div className="flex items-center gap-4 px-6 h-16 border border-white/20 backdrop-blur-sm">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-navy overflow-hidden bg-slate-200">
                           <Image src={`/team-${i}.png`} alt="Trusted" width={32} height={32} />
                        </div>
                      ))}
                   </div>
                   <div className="text-xs font-bold uppercase tracking-widest text-white/70">
                      Trusted by <span className="text-white">500+ Clients</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Form - Inspired by Herfurth Maritime / Transload */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md bg-white p-8 shadow-2xl relative"
          >
            <h3 className="text-xl font-bold text-navy mb-6 uppercase tracking-tight flex items-center gap-3">
               <FileText className="text-accent" size={20} /> Request Quote Form
            </h3>
            <form className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="FULL NAME" className="rounded-none border-slate-200 h-12 text-[10px] font-bold uppercase tracking-widest" />
                  <Input placeholder="EMAIL ADDRESS" className="rounded-none border-slate-200 h-12 text-[10px] font-bold uppercase tracking-widest" />
               </div>
               <Input placeholder="PHONE NUMBER" className="rounded-none border-slate-200 h-12 text-[10px] font-bold uppercase tracking-widest" />
               <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                     <select className="w-full h-12 border border-slate-200 rounded-none px-4 text-[10px] font-bold uppercase tracking-widest appearance-none bg-white">
                        <option>FREIGHT TYPE</option>
                        <option>OCEAN FREIGHT</option>
                        <option>AIR FREIGHT</option>
                        <option>ROAD TRANSPORT</option>
                     </select>
                     <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                  </div>
                  <Input placeholder="CARGO WEIGHT" className="rounded-none border-slate-200 h-12 text-[10px] font-bold uppercase tracking-widest" />
               </div>
               <Button className="w-full h-14 bg-navy hover:bg-navy-dark text-white rounded-none font-bold uppercase text-xs tracking-[0.2em]">
                  Submit Request
               </Button>
               <div className="text-center pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Or give us a call</p>
                  <p className="text-xl font-bold text-navy tracking-tight">+0800 123 456</p>
               </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. KEY STATS / FEATURES ═══ */}
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Globe className="text-accent" />, val: "150+", label: "Worldwide Branches" },
              { icon: <Package className="text-accent" />, val: "1.2M", label: "Tons Cleared yearly" },
              { icon: <Users className="text-accent" />, val: "2.5K", label: "Satisfied Customers" },
              { icon: <Ship className="text-accent" />, val: "99%", label: "Successful Delivery" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white shadow-lg flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy leading-none mb-1">{stat.val}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT SECTION ═══ */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="aspect-[4/5] relative z-10 overflow-hidden">
                <Image src="/hero-bg.png" alt="Operations" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-navy z-0 hidden xl:block" />
              <div className="absolute -top-10 -left-10 w-32 h-32 border-8 border-accent z-0 hidden xl:block" />
              
              <div className="absolute bottom-8 left-8 z-20 bg-white p-6 shadow-2xl max-w-[200px]">
                 <div className="text-4xl font-black text-navy mb-1">10+</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Years of Operational Excellence</div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">About Alexandria</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 tracking-tight">
                Driven by Expertise Built for Logistics
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Alexandria Maritime represents the pinnacle of modern shipping coordination. Based in the logistics heart of Europe, we leverage decades of maritime heritage to solve the most complex supply chain challenges.
              </p>
              
              <div className="space-y-6 mb-10">
                 {[
                   { t: "Worldwide Service", d: "Connecting major economic hubs across all continents." },
                   { t: "24/7 Online Support", d: "Dedicated operational team monitors your assets around the clock." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                         <div className="w-2 h-2 bg-accent rounded-full" />
                      </div>
                      <div>
                         <h4 className="font-bold text-navy uppercase text-xs tracking-widest mb-1">{item.t}</h4>
                         <p className="text-sm text-slate-500">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex items-center gap-6">
                 <Button className="bg-navy hover:bg-navy-dark text-white rounded-none px-8 h-14 font-bold uppercase text-[10px] tracking-widest">
                    Read More
                 </Button>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                       <Image src="/team-1.png" alt="CEO" width={40} height={40} />
                    </div>
                    <div>
                       <div className="text-xs font-bold text-navy uppercase tracking-widest">Chris Havik</div>
                       <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Co-Founder</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SERVICES GRID ═══ */}
      <section className="py-24 bg-slate-50 border-y border-slate-200" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight">
                Moving Your Business Forward,<br />Anywhere in the World
              </h2>
            </div>
            <Button onClick={() => router.push("/tracking")} variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white rounded-none px-8 h-12 font-bold uppercase text-[10px] tracking-widest transition-all">
               Track Package
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { title: "Road Transport", img: "/transport-land.jpeg", icon: <Truck size={24} /> },
              { title: "Air Freight Transport", img: "/transport-air.jpg", icon: <Plane size={24} /> },
              { title: "Ocean Transport", img: "/transport-sea.jpg", icon: <Ship size={24} /> },
            ].map((service, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden group cursor-pointer bg-navy">
                 <Image src={service.img} alt={service.title} fill className="object-cover opacity-80 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end text-white z-10">
                    <div className="w-12 h-12 bg-accent/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                       {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">{service.title}</h3>
                    <div className="overflow-hidden">
                       <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                          Read More <ArrowRight size={14} />
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. HOW WE DELIVER (Process) ═══ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-20">
             <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Work Process</span>
                <div className="h-0.5 w-8 bg-accent" />
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight uppercase">How We Deliver With Ease</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
             {/* Connector lines (Desktop) */}
             <div className="hidden lg:block absolute top-24 left-[20%] right-[20%] h-px bg-slate-100 z-0" />
             
             {[
               { step: "01", t: "Step 1: Receive Package", img: "/step-receive.jpg", d: "We coordinate the initial pickup and manifest verification." },
               { step: "02", t: "Step 2: Transport Packages", img: "/step-transport.jpeg", d: "Secure transit through our verified global shipping routes." },
               { step: "03", t: "Step 3: Deliver Packages", img: "/step-deliver.jpeg", d: "Final mile delivery and documentation completion." }
             ].map((item, i) => (
               <div key={i} className="text-center relative z-10">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8 border-8 border-slate-50 group">
                     <Image src={item.img} alt={item.t} width={200} height={200} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative inline-block mb-4">
                     <div className="text-6xl font-black text-slate-100 absolute -top-8 left-1/2 -translate-x-1/2 -z-10">{item.step}</div>
                     <h4 className="text-lg font-bold text-navy uppercase tracking-tight relative">{item.t}</h4>
                  </div>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TESTIMONIALS (Dark Section) ═══ */}
      <section className="bg-navy py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 opacity-5">
            <Quote size={300} className="text-white" />
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="flex items-center gap-3 mb-6 text-white">
                     <div className="h-0.5 w-8 bg-accent" />
                     <span className="text-xs font-bold uppercase tracking-[0.3em]">Client Testimonials</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">What Our Clients Say About Alexandria</h2>
                  <p className="text-lg text-white/60 mb-10 leading-relaxed">
                     We pride ourselves on building long-term partnerships through consistent performance and transparent communication.
                  </p>
                  <div className="flex gap-4">
                     <Button className="w-12 h-12 rounded-full border border-white/20 bg-transparent hover:bg-white/10 flex items-center justify-center p-0">
                        <ArrowRight size={20} className="rotate-180" />
                     </Button>
                     <Button className="w-12 h-12 rounded-full bg-accent hover:bg-accent-hover flex items-center justify-center p-0">
                        <ArrowRight size={20} />
                     </Button>
                  </div>
               </div>

               <div className="bg-white p-12 shadow-2xl relative">
                  <div className="flex gap-1 text-accent mb-8">
                     {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-xl text-navy italic leading-relaxed mb-10 font-medium">
                     "Alexandria Maritime has transformed our supply chain reliability. Their Dutch-hub efficiency and real-time tracking give us a competitive edge we never had before."
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden">
                        <Image src="/team-4.jpg" alt="Client" width={56} height={56} className="object-cover" />
                     </div>
                     <div>
                        <h4 className="text-lg font-bold text-navy tracking-tight">Albert Smits</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logistics Director, Berlin</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ─── 7. TRACKING SECTION (Clean) ═══ */}
      <section className="py-24 bg-white" id="tracking">
        <div className="max-w-4xl mx-auto px-4 sm:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="h-0.5 w-8 bg-accent" />
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Global Tracking</span>
             <div className="h-0.5 w-8 bg-accent" />
          </div>
          <h2 className="text-4xl font-bold text-navy mb-4 tracking-tight uppercase">Trace Your Cargo</h2>
          <p className="text-slate-500 mb-12 text-lg font-medium">
            Enter your official manifest ID for real-time positional updates.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Input 
              placeholder="ENTER TRACKING NUMBER (E.G. ALX-71798233)" 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="h-20 bg-white border-2 border-slate-100 rounded-none focus-visible:ring-0 text-lg font-bold uppercase px-8 transition-all focus:border-navy shadow-xl placeholder:text-slate-200"
            />
            <Button type="submit" className="absolute right-2 top-2 bottom-2 bg-navy hover:bg-navy-dark text-white font-bold uppercase tracking-widest text-xs rounded-none px-10 transition-all">
               Search <Search size={18} className="ml-2" />
            </Button>
          </form>
        </div>
      </section>

      {/* ─── 8. EXPERTS SECTION ═══ */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-20">
             <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-0.5 w-8 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Team</span>
                <div className="h-0.5 w-8 bg-accent" />
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight uppercase">Meet The Experts Behind Alexandria</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { name: "Alice Smith", role: "CEO & Founder", img: "/team-1.png" },
               { name: "Andre Pieter", role: "Manager", img: "/team-2.png" },
               { name: "Carly Berkef", role: "Founder", img: "/team-3.png" },
               { name: "Trent Potter", role: "Founder", img: "/team-4.jpg" }
             ].map((member, i) => (
               <div key={i} className="bg-white group overflow-hidden shadow-md">
                  <div className="aspect-[4/5] relative">
                     <Image src={member.img} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                     <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-500" />
                  </div>
                  <div className="p-6 text-center">
                     <h4 className="text-lg font-bold text-navy mb-1 tracking-tight">{member.name}</h4>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{member.role}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── 9. BLOG / NEWS SECTION ═══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-0.5 w-8 bg-accent" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Latest Insights</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-navy tracking-tight uppercase">From Our Blog</h2>
              </div>
              <Button variant="link" className="text-navy font-bold uppercase tracking-widest text-[10px] p-0 h-auto hover:text-accent">
                 View All Posts <ChevronRight size={14} className="ml-1" />
              </Button>
           </div>

           <div className="grid md:grid-cols-3 gap-10">
              {[
                { t: "Mastering Last Mile Delivery Strategies for Success", date: "May 15, 2026", img: "/hero-bg.png", cat: "Logistics" },
                { t: "Logistics Announces Launch of Greenhouse Gas Report", date: "May 12, 2026", img: "/hero-bg.png", cat: "Industry" },
                { t: "We Ensure You The Best Quality Services For Your Cargo", date: "May 10, 2026", img: "/hero-bg.png", cat: "Safety" }
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className="aspect-video relative overflow-hidden mb-6">
                      <Image src={post.img} alt={post.t} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-accent text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1">
                         {post.cat}
                      </div>
                   </div>
                   <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                      <span>{post.date}</span>
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>By Admin</span>
                   </div>
                   <h3 className="text-xl font-bold text-navy group-hover:text-accent transition-colors tracking-tight leading-tight mb-4">
                      {post.t}
                   </h3>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-navy group-hover:translate-x-2 transition-transform">
                      Read More <ArrowRight size={12} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ─── 10. FINAL CTA ═══ */}
      <section className="relative py-32 bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image src="/hero-bg.png" alt="Cargo" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight uppercase">Ready to optimize your global logistics?</h2>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Contact our maritime experts today to discuss your specific requirements and experience the Alexandria difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-hover text-white rounded-none px-12 h-20 font-bold uppercase text-xs tracking-[0.2em] shadow-2xl transition-all w-full sm:w-auto"
              onClick={() => router.push("/contact")}
            >
              Get a Free Quote
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-navy rounded-none px-12 h-20 font-bold uppercase text-xs tracking-[0.2em] transition-all bg-transparent w-full sm:w-auto"
              onClick={() => router.push("/contact")}
            >
              Our Locations
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
