"use client";

import { Ship, Phone, Mail, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative z-[100]">
      {/* ─── OFFICIAL TOP BAR ─── */}
      <div className="bg-gradient-to-r from-[#0A2F6E] via-[#1a4b9c] to-[#0A2F6E] text-white py-3 px-4 sm:px-10 text-[10px] font-black uppercase tracking-[0.2em] flex flex-row flex-wrap justify-center sm:justify-between items-center gap-x-8 gap-y-2 border-b border-white/10 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-blue-400/10 blur-[50px] pointer-events-none" />
        
        <div className="flex items-center gap-4 sm:gap-8 relative z-10">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-blue-300" /> +0800 123 456
          </div>
          <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-8">
            <Mail size={12} className="text-blue-300" /> OFFICE@ALEXANDRIASHIPPING.COM
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-8 relative z-10">
          <span className="hidden sm:inline opacity-60">OPERATIONAL: MON - FRI</span>
          <div className="flex gap-4 sm:border-l border-white/20 sm:pl-8">
            <a href="#" className="hover:text-blue-300 transition-colors">FB</a>
            <a href="#" className="hover:text-blue-300 transition-colors">TW</a>
            <a href="#" className="hover:text-blue-300 transition-colors">LI</a>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION ─── */}
      <nav className="bg-white sticky top-0 border-b-4 border-black shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-5 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0A2F6E] to-[#2B7FFF] flex items-center justify-center text-white transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] group-hover:shadow-[6px_6px_0px_rgba(43,127,255,0.2)]">
              <Ship size={20} className="sm:size-[24px]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#0A2F6E] block leading-none uppercase">ALEXANDRIA</span>
              <span className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] text-[#2B7FFF] block mt-0.5 sm:mt-1 uppercase opacity-80">Logistics HQ</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-gray-400">
            <Link href="/" className="text-[#0A2F6E] hover:text-[#2B7FFF] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#0A2F6E]">Home</Link>
            <Link href="/about" className="hover:text-[#0A2F6E] transition-colors pb-1">About</Link>
            <Link href="/services" className="hover:text-[#0A2F6E] transition-colors pb-1">Services</Link>
            <Link href="/projects" className="hover:text-[#0A2F6E] transition-colors pb-1">Projects</Link>
            <Link href="/blog" className="hover:text-[#0A2F6E] transition-colors pb-1">Blog</Link>
            <Link href="/contact" className="hover:text-[#0A2F6E] transition-colors pb-1">Contact</Link>
          </div>

          {/* Mobile Toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              className="bg-gradient-to-r from-[#0A2F6E] to-[#061B3D] hover:from-[#2B7FFF] hover:to-[#0A2F6E] text-white rounded-none h-10 sm:h-12 px-3 sm:px-8 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#0A2F6E]/20 transition-all duration-500 relative group overflow-hidden"
              onClick={() => router.push("/tracking")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer" />
              <Search size={14} className="sm:mr-2 relative z-10" />
              <span className="hidden xs:inline relative z-10">Track Asset</span>
            </Button>
            
            <button 
              className="lg:hidden p-1.5 sm:p-2 text-[#0A2F6E]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="sm:size-[28px]" /> : <Menu size={24} className="sm:size-[28px]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-black p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            {["Home", "About", "Services", "Projects", "Blog", "Contact"].map((item) => (
              <Link 
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block text-lg font-black uppercase tracking-widest text-[#0A2F6E] border-b border-gray-100 pb-3"
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
