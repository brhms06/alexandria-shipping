"use client";

import { Ship, Globe, Mail, Phone, MapPin, MessageCircle, Send, Briefcase, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 text-slate-900 border-t border-slate-200">
      
      {/* ─── 1. NEWSLETTER / CALL TO ACTION ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 -translate-y-8 sm:-translate-y-1/2 relative z-20">
        <div className="bg-navy p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="text-center lg:text-left text-white max-w-lg w-full relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">Stay Informed</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Subscribe to our monthly newsletter for global logistics insights, market updates, and maritime industry news.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 relative z-10">
            <Input 
              placeholder="YOUR EMAIL ADDRESS" 
              className="bg-white border-none rounded-none h-14 sm:h-16 px-6 focus-visible:ring-0 text-navy font-bold uppercase placeholder:text-slate-300 w-full lg:w-80 shadow-inner"
            />
            <Button className="bg-accent hover:bg-accent-hover text-white rounded-none h-14 sm:h-16 px-10 font-bold uppercase text-[10px] sm:text-xs tracking-widest transition-all w-full sm:w-auto">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 pt-4 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-48 h-14">
                <Image 
                  src="/alexandria-shipping-logo.png" 
                  alt="Alexandria Shipping Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              With over a decade of expertise, Alexandria Maritime provides world-class logistics solutions, connecting major global markets through our strategic Dutch hubs.
            </p>
            <div className="flex gap-3">
              {[Globe, Send, Briefcase, Camera].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-navy hover:text-white hover:border-navy transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-navy mb-8 border-b border-slate-200 pb-3 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Alexandria</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link href="/tracking" className="hover:text-accent transition-colors">Cargo Tracking</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Global Network</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-navy mb-8 border-b border-slate-200 pb-3 inline-block">
              Core Services
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link href="#" className="hover:text-accent transition-colors">Ocean Freight</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Air Freight</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Road Transport</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Customs Clearance</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Warehousing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-navy mb-8 border-b border-slate-200 pb-3 inline-block">
              Contact Office
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4 text-slate-600">
                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                <span className="leading-relaxed font-medium">Main Hub: Rotterdam Port Area<br/>123 Logistics Blvd, NL-3089</span>
              </li>
              <li className="flex items-center gap-4 text-slate-600">
                <Phone size={20} className="text-accent shrink-0" />
                <span className="font-medium">+0800 123 456</span>
              </li>
              <li className="flex items-center gap-4 text-slate-600 uppercase">
                <Mail size={20} className="text-accent shrink-0" />
                <span className="font-medium">office@alexandriashipping.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-slate-200 mt-16 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            &copy; 2026 Alexandria Maritime Logistics. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-navy">
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/> Tracking Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
