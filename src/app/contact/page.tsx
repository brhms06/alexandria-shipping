"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen text-text-dark font-sans selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy text-white pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Badge variant="outline" className="text-brand border-brand/30 bg-brand/10 mb-6 py-1.5 px-4 rounded-full font-semibold">
            Get In Touch
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight mb-6">
            Contact <span className="text-brand">Alexandria</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            Have a question about a shipment, need a quote, or want to partner with us? Our team is ready to assist you around the clock.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold font-serif text-navy mb-8">Headquarters</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg mb-1">Global Headquarters</h4>
                    <p className="text-gray-600">Ohio, USA<br />(Full address available upon request)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg mb-1">Email Us</h4>
                    <p className="text-gray-600">office@alexandriashipping.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg mb-1">Call Us</h4>
                    <p className="text-gray-600">+0800 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg mb-1">WhatsApp</h4>
                    <p className="text-gray-600">Number coming soon...</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-lg mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 08:00 AM - 06:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-2xl shadow-navy/5 rounded-2xl">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-bold font-serif text-navy mb-6">Send us a message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                        <Input placeholder="John" className="h-12 bg-gray-50 border-transparent focus:bg-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                        <Input placeholder="Doe" className="h-12 bg-gray-50 border-transparent focus:bg-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <Input type="email" placeholder="john@company.com" className="h-12 bg-gray-50 border-transparent focus:bg-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Subject</label>
                      <Input placeholder="How can we help?" className="h-12 bg-gray-50 border-transparent focus:bg-white" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Message</label>
                      <textarea 
                        rows={5}
                        className="w-full rounded-md border-transparent bg-gray-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus:bg-white resize-none"
                        placeholder="Tell us about your logistics needs..."
                      />
                    </div>

                    <Button className="w-full bg-brand hover:bg-brand-hover text-white h-12 text-lg font-semibold rounded-xl">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
