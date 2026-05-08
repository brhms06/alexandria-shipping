"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Maritime Logistics"
            fill
            priority
            className="object-cover object-center opacity-30 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-accent font-bold uppercase tracking-[0.3em] text-xs">Get In Touch</span>
              <div className="w-12 h-[2px] bg-accent" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight uppercase">
              Contact Alexandria
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
              Our global network of logistics experts is ready to assist with your shipping needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold text-accent uppercase tracking-[0.3em] mb-4">Our Presence</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-navy mb-10 leading-tight">Connect with our global headquarters.</h3>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 group">
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <h4 className="font-bold text-navy mb-2">Location</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">Ohio, USA<br />Strategic Operational Center</p>
                </div>

                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 group">
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <h4 className="font-bold text-navy mb-2">Email</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">office@alexandriashipping.com<br />General Inquiries</p>
                </div>

                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 group">
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <h4 className="font-bold text-navy mb-2">Phone</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">+0800 123 456<br />Mon - Fri, 8am - 6pm</p>
                </div>

                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 group">
                  <div className="w-12 h-12 rounded-sm bg-navy/5 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                    <MessageCircle size={24} />
                  </div>
                  <h4 className="font-bold text-navy mb-2">Support</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">24/7 Digital Portal<br />Live Manifest Status</p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-navy text-white rounded-sm">
                <h4 className="font-bold mb-4">Regional Hubs</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium opacity-70">
                  <span>• North America</span>
                  <span>• Western Europe</span>
                  <span>• Southeast Asia</span>
                  <span>• Middle East</span>
                  <span>• Latin America</span>
                  <span>• Oceania</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-2xl rounded-sm overflow-hidden bg-white">
                <CardContent className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-navy mb-8">Direct Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                        <Input placeholder="John" className="h-14 bg-slate-50 border-slate-200 rounded-sm focus-visible:ring-1 focus-visible:ring-navy" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                        <Input placeholder="Doe" className="h-14 bg-slate-50 border-slate-200 rounded-sm focus-visible:ring-1 focus-visible:ring-navy" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <Input type="email" placeholder="john@company.com" className="h-14 bg-slate-50 border-slate-200 rounded-sm focus-visible:ring-1 focus-visible:ring-navy" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inquiry Type</label>
                      <select className="flex h-14 w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy">
                        <option>General Inquiry</option>
                        <option>Request a Quote</option>
                        <option>Tracking Assistance</option>
                        <option>Partnership Proposal</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                      <textarea 
                        rows={5}
                        className="w-full rounded-sm border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy resize-none"
                        placeholder="Detail your requirements..."
                      />
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/90 text-white h-16 text-xs font-bold uppercase tracking-widest rounded-sm shadow-lg flex items-center justify-center gap-3">
                      Submit Inquiry <ArrowRight size={16} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

