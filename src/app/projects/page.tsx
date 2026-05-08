"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Operation Holiday Joy",
      category: "Charity & Logistics",
      route: "USA → Mexico",
      desc: "Coordinated the safe and timely delivery of over 450 toys to an orphanage in Mexico right before the holiday season. Our team navigated complex cross-border logistics to ensure every child received their gift on time.",
      stats: [
        { label: "Cargo", value: "450+ Toys" },
        { label: "Status", value: "Delivered On Time" }
      ],
      image: "/hero-bg.png"
    },
    {
      title: "Transcontinental Auto Fleet",
      category: "Heavy Freight",
      route: "China → Nigeria",
      desc: "Successfully managed the large-scale shipment of over 400 vehicles from manufacturing plants in China to distribution centers in Nigeria. This required specialized RoRo (Roll-on/Roll-off) vessels and extensive customs coordination.",
      stats: [
        { label: "Volume", value: "400+ Cars" },
        { label: "Mode", value: "Ocean Freight" }
      ],
      image: "/hero-bg.png"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-text-dark font-sans selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy text-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-brand border-brand/30 bg-brand/10 mb-6 py-1.5 px-4 rounded-full font-semibold">
            Case Studies
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight mb-6">
            Proven <span className="text-brand">Track Record</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Take a look at some of the complex, large-scale shipments we've successfully managed across the globe.
          </p>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {projects.map((project, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] w-full relative">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg font-bold text-navy shadow-lg flex items-center gap-2">
                    {project.route} <ArrowUpRight size={16} className="text-brand" />
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 lg:px-8">
                <div className="text-brand font-bold uppercase tracking-widest text-sm mb-3">
                  {project.category}
                </div>
                <h2 className="text-4xl font-bold font-serif text-navy mb-6">
                  {project.title}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {project.desc}
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
                  {project.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-navy">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
