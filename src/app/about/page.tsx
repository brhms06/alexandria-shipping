"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, TrendingUp, Globe, Users, ArrowRight, Award, Anchor, Landmark, Zap, ShieldCheck 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-navy font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-logistics.jpg"
            alt="Maritime Logistics Operations"
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
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Our Heritage</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-[1] mb-8 tracking-tight">
              Legacy in <br />
              <span className="text-white/90">Motion.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed font-light mb-10">
              Alexandria has been at the forefront of maritime logistics for over a decade, connecting markets and delivering trust.
            </p>
            <div className="flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white italic">2013</span>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Established</span>
               </div>
               <div className="w-[1px] h-10 bg-white/20" />
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white italic">150+</span>
                  <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Global Ports</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Heritage - Story Section */}
      <section className="py-32 bg-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-slate-100">
                <Image 
                  src="/about-logistics-2.jpg" 
                  alt="Our Team" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 border-[20px] border-white/5" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-navy p-10 text-white shadow-2xl max-w-[280px]">
                <Award className="text-accent mb-4" size={40} />
                <h4 className="text-xl font-bold italic mb-2">Excellence Awarded</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold">Logistics Innovator of the Year 2025</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold text-accent uppercase tracking-[0.4em] mb-6">Who We Are</h2>
              <h3 className="text-4xl md:text-6xl font-bold text-navy mb-8 leading-tight">
                Engineering the flow of global commerce.
              </h3>
              <div className="space-y-8 text-slate-600 leading-relaxed text-lg font-light">
                <p>
                  Founded in the heart of the maritime corridor, Alexandria was born from a vision to bring precision, transparency, and personal accountability to the complex world of global freight. 
                </p>
                <p>
                  We recognize that in logistics, "standard" is never enough. Our team combines deep industry heritage with cutting-edge digital infrastructure to manage every manifest as if it were our own.
                </p>
                <p>
                  From our regional headquarters in the Netherlands to our expanding network across Asia and the Americas, we provide the stability and reach your business demands in an ever-changing world.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-12 mt-12 border-t border-slate-100">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-navy text-white flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-sm">Security First</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Advanced asset protection and verified carrier protocols.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-navy text-white flex items-center justify-center shrink-0 shadow-lg">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1 uppercase tracking-wider text-sm">Global Reach</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Direct connections to 150+ ports and inland terminals.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-navy">
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
           <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-6">Our Values</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Guided by precision, <br />defined by trust.</h3>
              <div className="h-1 w-20 bg-accent" />
           </div>

           <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {[
                { title: "INTEGRITY", icon: Landmark, desc: "We operate with radical transparency, ensuring our clients have full visibility into every operational stage." },
                { title: "INNOVATION", icon: Zap, desc: "Leveraging real-time GPS positioning and AI-driven route optimization to stay ahead of market shifts." },
                { title: "RELIABILITY", icon: Anchor, desc: "A decade-long track record of 99.8% on-time delivery across the most challenging shipping lanes." }
              ].map((value, i) => (
                <div key={i} className="bg-navy p-12 hover:bg-navy/50 transition-colors duration-500 group">
                   <value.icon className="text-accent mb-8 group-hover:scale-110 transition-transform" size={40} />
                   <h4 className="text-xl font-bold mb-6 tracking-widest">{value.title}</h4>
                   <p className="text-white/50 text-sm leading-relaxed font-light">{value.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                 <h2 className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-6">Our Experts</h2>
                 <h3 className="text-4xl md:text-5xl font-bold text-navy leading-tight">Mastering the art of logistics.</h3>
              </div>
              <button className="bg-navy text-white px-10 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-all shadow-xl">
                 Join Our Team
              </button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                { name: "Alice Smith", role: "CEO & Founder", img: "/team-1.png" },
                { name: "Andre Pieter", role: "Operational Manager", img: "/team-2.png" },
                { name: "Carly Berkef", role: "Technical Director", img: "/team-3.png" },
                { name: "Trent Potter", role: "Compliance Lead", img: "/team-4.jpg" }
              ].map((member, i) => (
                <div key={i} className="group cursor-default">
                   <div className="relative aspect-[3/4] overflow-hidden mb-6 shadow-xl bg-slate-100">
                      <Image 
                        src={member.img} 
                        alt={member.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                   </div>
                   <h4 className="text-lg font-bold text-navy mb-1 tracking-tight">{member.name}</h4>
                   <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Call to Action - Professional Finish */}
      <section className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <div className="inline-block p-4 bg-navy text-white mb-10 shadow-2xl">
             <Anchor size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 tracking-tight">Your vision, our mission.</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Let Alexandria be the foundation of your global supply chain. Discover how our professional logistics management can transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-navy text-white px-12 py-6 font-black uppercase tracking-widest text-[10px] hover:bg-accent transition-all shadow-2xl group flex items-center gap-3">
              Consult an Expert <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Or</span>
            <a href="/contact" className="text-navy font-bold uppercase tracking-widest text-[10px] border-b-2 border-navy hover:text-accent hover:border-accent transition-all">
              Send a Direct Message
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

