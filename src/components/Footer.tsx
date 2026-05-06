"use client";

import { Ship, ArrowRight, Globe, Mail, Phone, MapPin, ExternalLink, Printer, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-white text-black border-t-[8px] border-black pb-20">
      
      {/* ─── 1. NEWSLETTER / CALL TO ACTION (Structured Box) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 -translate-y-8 sm:-translate-y-1/2 relative z-20">
        <div className="bg-gradient-to-br from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] border-4 border-black p-6 sm:p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12 shadow-[8px_8px_0px_#000] sm:shadow-[20px_20px_0px_#000] relative overflow-hidden group">
          {/* Subtle backglow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C42]/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          
          <div className="text-center lg:text-left text-white max-w-md w-full relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 sm:mb-4 italic">Operational Updates</h3>
            <p className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-relaxed">
              Subscribe to receive verified logistics reports and signal updates directly from Alexandria HQ.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 relative z-10">
            <Input 
              placeholder="OFFICIAL EMAIL ADDRESS" 
              className="bg-white border-4 border-black rounded-none h-14 sm:h-16 px-6 focus-visible:ring-0 text-black font-black uppercase placeholder:text-gray-300 w-full lg:w-72 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all focus:shadow-[6px_6px_0px_rgba(43,127,255,0.2)]"
            />
            <Button className="bg-black hover:bg-gray-900 text-white rounded-none h-14 sm:h-16 px-8 sm:px-12 font-black uppercase text-[10px] sm:text-xs tracking-widest transition-all w-full sm:w-auto relative overflow-hidden group/btn">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
              <span className="relative z-10">Initialize Subscription</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 pt-12 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A2F6E] to-[#2B7FFF] flex items-center justify-center text-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-105">
                <Ship size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#0A2F6E] uppercase">ALEXANDRIA</span>
            </div>
            <p className="text-xs font-bold text-gray-500 leading-relaxed mb-8 uppercase tracking-tight">
              Established 2013. A global logistics authority built on rigid coordination and verified transit protocols. Serving 150+ economic ports.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-[#0A2F6E] hover:text-white hover:border-[#0A2F6E] transition-all group/icon">
                  <Icon size={16} className="group-hover/icon:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Directory 1 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A2F6E] mb-8 border-b-2 border-black pb-2 inline-block">
              Network Directory
            </h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <li><Link href="/about" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> About Overview</Link></li>
              <li><Link href="/services" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Global Services</Link></li>
              <li><Link href="/projects" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Active Projects</Link></li>
              <li><Link href="/blog" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Archive Log</Link></li>
              <li><Link href="/contact" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Station Contact</Link></li>
            </ul>
          </div>

          {/* Directory 2 */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A2F6E] mb-8 border-b-2 border-black pb-2 inline-block">
              Capabilities
            </h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <li><Link href="#" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Surface Freight</Link></li>
              <li><Link href="#" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Aviation Express</Link></li>
              <li><Link href="#" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Maritime Forwarding</Link></li>
              <li><Link href="#" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Customs Protocol</Link></li>
              <li><Link href="#" className="hover:text-black flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-black scale-0 group-hover:scale-100 transition-transform"/> Strategic Storage</Link></li>
            </ul>
          </div>

          {/* Official Info */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A2F6E] mb-8 border-b-2 border-black pb-2 inline-block">
              Institutional Info
            </h4>
            <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-black">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#0A2F6E] shrink-0" />
                <span className="leading-tight">Global Headquarters<br/><span className="text-gray-400">Ohio, USA • Zone 4</span></span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[#0A2F6E] shrink-0" />
                <span>+0800 123 456</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-[#0A2F6E] shrink-0" />
                <span className="lowercase">OFFICE@ALEXANDRIASHIPPING.COM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & System Status */}
        <div className="border-t-4 border-black mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            &copy; 2026 Alexandria Freight Platform. Manifest V4.2. Secure Protocol Active.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#0A2F6E]">
            <a href="#" className="hover:underline">Terms of Carriage</a>
            <a href="#" className="hover:underline">Security Policy</a>
            <div className="flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> System Status: Nominal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
