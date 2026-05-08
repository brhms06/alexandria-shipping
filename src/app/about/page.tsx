"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Globe, Users, Award, Anchor, Zap, ShieldCheck, Database, ArrowRight, CheckCircle2 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-[#00458B] selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[#00458B] transform skew-x-12 translate-x-40" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#00458B]/10 text-[#00458B] text-xs font-bold uppercase tracking-wider mb-6">
                Our Story
              </span>
              <h1 className="text-5xl md:text-8xl font-extrabold text-[#00458B] mb-10 leading-[1.1] tracking-tight">
                A Legacy of <br />
                <span className="text-slate-400 font-light">Global Logistics.</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-12">
                Alexandria has served as a primary logistical partner for global commerce for over a decade, providing absolute precision in maritime cargo delivery and supply chain management.
              </p>
              <div className="flex items-center gap-12">
                 <div className="flex flex-col">
                    <span className="text-4xl font-black text-[#00458B] tracking-tighter">2013</span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Established</span>
                 </div>
                 <div className="w-px h-12 bg-slate-200" />
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-[#00458B] tracking-tighter">150+</span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Shipping Hubs</span>
                  </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
                  <Image 
                    src="/about-logistics.jpg" 
                    alt="Logistics Operations" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-[#00458B]/10" />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-[#00458B] p-10 rounded-2xl text-white shadow-xl max-w-[300px]">
                  <Award className="mb-6 text-white/50" size={40} />
                  <h4 className="text-xl font-bold mb-2 leading-tight">Industry Leader</h4>
                  <p className="text-xs text-white/70 uppercase tracking-widest font-medium">Logistics Partner of the Year 2025</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-[#00458B] text-xs font-bold uppercase tracking-widest mb-4">Our Mission</h2>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    Optimizing the Global <br /><span className="text-[#00458B]">Supply Chain.</span>
                  </h3>
                </div>

                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Alexandria was founded on the principle of bringing absolute precision and strategic accountability to the complex world of maritime logistics.
                  </p>
                  <p>
                    Our approach combines deep industry expertise with modern digital infrastructure, ensuring that every shipment is managed with the highest level of care and efficiency.
                  </p>
                  <p>
                    From our headquarters to our satellite hubs across major global trade sectors, we provide the stability and reliability your operations demand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#00458B] flex items-center justify-center shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wide">Secure Handling</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Advanced safety protocols and verified transport partners.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#00458B] flex items-center justify-center shrink-0">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-wide">Global Reach</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Direct access to over 150 international shipping terminals.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 bg-slate-50 text-slate-900 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
                <span className="text-[#00458B] font-bold uppercase tracking-widest text-xs mb-4">Our Values</span>
                <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Guided by Precision, <br /><span className="text-[#00458B]">Defined by Excellence.</span></h3>
                <div className="h-1 w-12 bg-[#00458B] rounded-full" />
             </div>

             <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "INTEGRITY", icon: Database, desc: "Absolute transparency in all operations. Every shipment update is verified and documented throughout the transportation lifecycle." },
                  { title: "EFFICIENCY", icon: Zap, desc: "Leveraging strategic route optimization to minimize disruptions and ensure on-time delivery across all trade lanes." },
                  { title: "RELIABILITY", icon: CheckCircle2, desc: "A proven track record of 99.8% reliability across major shipping corridors and international territories." }
                ].map((value, i) => (
                  <div key={i} className="bg-white p-12 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-[#00458B]/5 transition-all duration-300 group">
                     <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#00458B] mb-8 group-hover:bg-[#00458B] group-hover:text-white transition-all duration-300">
                        <value.icon size={32} strokeWidth={1.5} />
                     </div>
                     <h4 className="text-xl font-bold mb-4 tracking-tight">{value.title}</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Personnel Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl space-y-4">
                   <span className="text-[#00458B] font-bold uppercase tracking-widest text-xs">Our Team</span>
                   <h3 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">Mastering Global <br /><span className="text-[#00458B]">Logistics.</span></h3>
                </div>
                <button className="bg-[#00458B] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#003366] transition-all shadow-lg shadow-[#00458B]/20">
                   Join Our Team
                </button>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                  { name: "Alice Smith", role: "Director of Operations", img: "/team-1.png" },
                  { name: "Andre Pieter", role: "Head of Logistics", img: "/team-2.png" },
                  { name: "Carly Berkef", role: "Supply Chain Strategist", img: "/team-3.png" },
                  { name: "Trent Potter", role: "Compliance Lead", img: "/team-4.jpg" }
                ].map((member, i) => (
                  <div key={i} className="group">
                     <div className="relative aspect-[3/4] overflow-hidden mb-6 rounded-2xl bg-slate-100 border border-slate-100 group-hover:border-[#00458B]/20 transition-all duration-500">
                        <Image 
                          src={member.img} 
                          alt={member.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                     <p className="text-sm font-medium text-[#00458B] uppercase tracking-wider">{member.role}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
               Your Success, <br /><span className="text-[#00458B]">Our Commitment.</span>
            </h2>
            <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Partner with Alexandria for a logistics infrastructure that grows with your business. Let us optimize your global supply chain today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-[#00458B] text-white px-12 py-5 rounded-xl font-bold hover:bg-[#003366] transition-all shadow-xl shadow-[#00458B]/20 flex items-center gap-3 group">
                Contact Our Experts <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/services" className="text-[#00458B] font-bold hover:text-slate-900 transition-colors">
                Explore Our Services
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
