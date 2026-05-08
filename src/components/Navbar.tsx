"use client";

import { Ship, Phone, Mail, Search, Menu, X, Globe, Send, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative z-[100]">
      {/* ─── CORPORATE TOP BAR ─── */}
      <div className="bg-navy text-white py-3 px-4 sm:px-10 text-[10px] font-bold uppercase tracking-[0.15em] flex flex-row flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-2 border-b border-white/10 relative">
          <div className="flex items-center gap-4 sm:gap-8 relative z-10">
          <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-default">
            <Phone size={12} className="text-accent" /> +0800 123 456
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-8 hover:text-accent transition-colors cursor-default uppercase">
            <Mail size={12} className="text-accent" /> office@alexandriashipping.com
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 relative z-10">
          <span className="hidden sm:inline opacity-60">Global Support: 24/7 Available</span>
          <div className="flex gap-4 sm:border-l border-white/20 sm:pl-8">
            <a href="#" className="hover:text-accent transition-colors"><Globe size={12} /></a>
            <a href="#" className="hover:text-accent transition-colors"><Send size={12} /></a>
            <a href="#" className="hover:text-accent transition-colors"><Briefcase size={12} /></a>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION ─── */}
      <nav className="bg-white sticky top-0 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-44 h-14 sm:w-48 sm:h-16 scale-[1.85] origin-left">
              <Image 
                src="/alexandria-shipping-logo.png" 
                alt="Alexandria Shipping Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="text-navy hover:text-accent transition-colors">Home</Link>
            <Link href="/about" className="hover:text-navy transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-navy transition-colors">Services</Link>
            <Link href="/tracking" className="hover:text-navy transition-colors">Tracking</Link>
            <Link href="/contact" className="hover:text-navy transition-colors">Contact</Link>
          </div>

          {/* Mobile Toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              className="bg-navy hover:bg-navy-dark text-white rounded-none h-11 px-6 font-bold uppercase text-[10px] tracking-widest transition-all duration-300 shadow-lg shadow-navy/10"
              onClick={() => router.push("/tracking")}
            >
              <Search size={14} className="mr-2" />
              <span>Track Package</span>
            </Button>
            
            <button 
              className="lg:hidden p-2 text-navy"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
            {["Home", "About Us", "Services", "Tracking", "Contact"].map((item) => (
              <Link 
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" us", "").replace(" ", "")}`}
                className="block text-sm font-bold uppercase tracking-widest text-navy border-b border-slate-50 pb-4 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
