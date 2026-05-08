"use client";

import { 
  Ship, Globe, Mail, Phone, MapPin, 
  ChevronRight, ArrowUpRight, ShieldCheck,
  Award, Anchor, Globe2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Custom Social Icons since Lucide removed them
const Linkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const Twitter = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Instagram = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Upper Footer: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-slate-800">
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-12 brightness-0 invert">
                <Image 
                  src="/alexandria-shipping-logo.png" 
                  alt="Alexandria Shipping Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              Your global partner in maritime excellence. Providing reliable, secure, and transparent freight solutions across all major trade lanes since 2014.
            </p>
            <div className="flex items-center gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
            <h4 className="text-white text-xl font-bold mb-4">Stay Updated</h4>
            <p className="text-slate-400 mb-6">Subscribe to our newsletter for the latest maritime news and global trade updates.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 h-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
                Subscribe <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Footer: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Ocean Freight", href: "/services" },
                { name: "Air Freight", href: "/services" },
                { name: "Road Transport", href: "/services" },
                { name: "Customs Clearance", href: "/services" },
                { name: "Warehousing", href: "/services" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our History", href: "/history" },
                { name: "Global Network", href: "/network" },
                { name: "Careers", href: "/careers" },
                { name: "News", href: "/news" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              {[
                { name: "Track Shipment", href: "/tracking" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faqs" },
                { name: "Legal Notice", href: "/legal" },
                { name: "Privacy Policy", href: "/privacy" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400 leading-relaxed">
                  Alexandria Tower, Rotterdam Port<br />
                  3088 GC, Netherlands
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500 shrink-0" />
                <span className="text-slate-400">+31 (0) 10 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-blue-500 shrink-0" />
                <span className="text-slate-400">office@alexandria-shipping.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Footer: Certs & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-50 grayscale transition-all hover:grayscale-0">
             <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck size={20} className="text-blue-500" />
                ISO 9001 CERTIFIED
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Award size={20} className="text-blue-500" />
                AEO AUTHORIZED
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Anchor size={20} className="text-blue-500" />
                IMO REGISTERED
             </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-slate-500 text-xs">
              &copy; {currentYear} Alexandria Shipping B.V. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.2em]">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Global System Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
