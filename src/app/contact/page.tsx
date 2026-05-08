"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, 
  Globe, ShieldCheck, Anchor, ArrowRight, Check 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["123 Logistics Drive", "Columbus, OH 43215", "United States"],
      link: "#"
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+1 (800) ALEX-SHIP", "+1 (614) 555-0123"],
      link: "tel:+180025397447"
    },
    {
      icon: Mail,
      title: "Email Inquiry",
      details: ["office@alexandria-shipping.com", "sales@alexandria-shipping.com"],
      link: "mailto:office@alexandria-shipping.com"
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: ["Mon - Fri: 08:00 - 18:00", "Sat: 09:00 - 13:00", "Sun: Closed"],
      link: null
    }
  ];

  const globalHubs = [
    { city: "Rotterdam", country: "Netherlands", type: "Main European Hub" },
    { city: "Singapore", country: "Singapore", type: "Southeast Asia Hub" },
    { city: "Shanghai", country: "China", type: "East Asia Hub" },
    { city: "Panama City", country: "Panama", type: "Americas Transit" },
    { city: "Dubai", country: "UAE", type: "Middle East Hub" },
    { city: "Hamburg", country: "Germany", type: "Northern Europe Hub" }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[45vh] min-h-[400px] flex items-center bg-[#002D5B] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.png"
              alt="Maritime Operations"
              fill
              priority
              className="object-cover opacity-30 grayscale brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#002D5B]/80" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Global Communications</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                Connect with Our <br />
                <span className="text-primary">Global Network.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed font-medium">
                Our logistics specialists are standing by to coordinate your next shipment. Reach out via our global hubs or our official contact form.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- CONTACT INFO GRID --- */}
        <section className="py-24 px-6 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <item.icon size={24} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-500 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {item.link && (
                    <a 
                      href={item.link}
                      className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mt-6 hover:gap-3 transition-all"
                    >
                      Contact Now <ArrowRight size={14} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM & HUBS SECTION --- */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              
              {/* Form Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h2 className="text-primary text-sm font-bold uppercase tracking-[0.3em]">Direct Inquiry</h2>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Send a Message</h3>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    Have a specific requirement or request for quote? Fill out the form below and a representative will get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <Input placeholder="John Doe" className="bg-slate-50 border-slate-200 h-14 focus:ring-primary rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <Input placeholder="john@company.com" className="bg-slate-50 border-slate-200 h-14 focus:ring-primary rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                    <Input placeholder="Shipment Inquiry / Quote Request" className="bg-slate-50 border-slate-200 h-14 focus:ring-primary rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                    <Textarea 
                      placeholder="Please provide details about your shipment or inquiry..." 
                      className="bg-slate-50 border-slate-200 min-h-[200px] focus:ring-primary rounded-xl p-4" 
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white h-16 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                    Send Message
                  </Button>
                </form>
              </motion.div>

              {/* Hubs Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="bg-[#002D5B] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Anchor size={200} />
                  </div>
                  
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-extrabold tracking-tight">Our Global Network</h3>
                      <p className="text-blue-100/60 leading-relaxed">
                        We operate through a series of specialized hubs strategically located at major maritime intersections.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-y-8 gap-x-12">
                      {globalHubs.map((hub, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <h4 className="font-bold text-lg">{hub.city}</h4>
                          </div>
                          <p className="text-xs text-blue-100/40 uppercase tracking-widest font-medium pl-3.5">
                            {hub.country} • {hub.type}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-10 border-t border-white/10 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          <Globe size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Network Reach</p>
                          <p className="font-bold">500+ Global Locations</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          <ShieldCheck size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Compliance Level</p>
                          <p className="font-bold">Enterprise Maritime Standard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ / Direct Link */}
                <div className="p-10 border border-slate-100 rounded-3xl bg-slate-50/50">
                  <h4 className="font-bold text-lg mb-4 italic">Need Immediate Assistance?</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    For time-critical shipments or emergency logistics support, please use our 24/7 dedicated helpline for instant coordination.
                  </p>
                  <Button variant="outline" className="border-slate-200 text-slate-700 font-bold px-8 rounded-xl h-12 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    Open Support Chat
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- MAP PLACEHOLDER SECTION --- */}
        <section className="h-[500px] relative bg-slate-200 overflow-hidden">
           {/* In a real app, integrate Google Maps or similar here */}
           <Image 
             src="/img-1.jpg"
             alt="Location Map"
             fill
             className="object-cover opacity-50 grayscale"
           />
           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px]">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-sm text-center">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <MapPin size={32} />
                 </div>
                 <h4 className="text-xl font-extrabold mb-2">Our Ohio Headquarters</h4>
                 <p className="text-slate-500 text-sm mb-6">
                    Strategic headquarters for North American logistics and supply chain management.
                 </p>
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">
                    Get Directions
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
