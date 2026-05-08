"use client";

import { Ship, Phone, Mail, Search, Menu, X, Globe, User, Shield, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      {/* ─── TOP CONTACT BAR ─── */}
      <div className={`bg-[#002D5B] text-white py-2 px-4 sm:px-10 text-[11px] font-medium transition-all duration-300 ${scrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors cursor-pointer">
              <Phone size={12} className="text-blue-300" /> +0800 123 456
            </div>
            <div className="hidden sm:flex items-center gap-2 hover:text-blue-200 transition-colors cursor-pointer">
              <Mail size={12} className="text-blue-300" /> office@alexandria-shipping.com
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <Shield size={12} className="text-blue-300" />
                <span className="hidden sm:inline text-blue-100/70">AEO CERTIFIED</span>
             </div>
             <div className="flex gap-4 border-l border-white/10 pl-6">
                <Globe size={12} className="cursor-pointer hover:text-blue-200" />
                <User size={12} className="cursor-pointer hover:text-blue-200" onClick={() => router.push('/admin')} />
             </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION ─── */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-white py-4'} border-b border-slate-100 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-48 h-10 transition-transform duration-300 hover:scale-[1.02]">
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
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold text-slate-700">
            <Link href="/" className="text-primary hover:text-primary/80 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/tracking" className="hover:text-primary transition-colors">Track & Trace</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <Button
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-md h-11 px-6 font-bold text-[13px] transition-all shadow-md hover:shadow-lg"
              onClick={() => router.push("/tracking")}
            >
              <Search size={16} className="mr-2" />
              Track Shipment
            </Button>
            
            <button 
              className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
            {["Home", "About Us", "Services", "Track & Trace", "Contact"].map((item) => (
              <Link 
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" & ", "").replace(" ", "")}`}
                className="block text-sm font-semibold text-slate-600 hover:text-primary border-b border-slate-50 pb-4 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Button className="w-full bg-primary mt-4" onClick={() => router.push('/tracking')}>
              Track Shipment
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
