"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Ship, Plane, Truck, Building2, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesPage() {
  const services = [
    {
      title: "Ocean Freight",
      icon: <Ship size={32} />,
      image: "/service-sea.png",
      desc: "Our ocean freight solutions offer the most cost-effective method for moving large volumes of cargo globally. We partner with top-tier shipping lines to guarantee space, reliable transit times, and careful handling of your containers from port to port.",
    },
    {
      title: "Air Freight",
      icon: <Plane size={32} />,
      image: "/service-air.png",
      desc: "When time is of the essence, our air freight services ensure your goods reach their destination rapidly. Ideal for high-value or time-sensitive shipments, we provide priority boarding and expedited handling across international borders.",
    },
    {
      title: "Road Transport",
      icon: <Truck size={32} />,
      image: "/service-land.png",
      desc: "Our robust road transport network provides seamless door-to-door delivery. Whether it's full truckload (FTL) or less than truckload (LTL), our modern fleet ensures your goods are transported safely and efficiently across domestic and regional routes.",
    },
    {
      title: "Warehousing",
      icon: <Building2 size={32} />,
      image: "/about-logistics-2.jpg",
      desc: "Store your inventory securely in our modern, strategically located facilities. We offer scalable warehousing solutions, inventory management, and order fulfillment services to help streamline your supply chain and reduce overhead costs.",
    },
    {
      title: "Customs Clearance",
      icon: <FileCheck size={32} />,
      image: "/tracking_illustration.png",
      desc: "Navigate complex international trade regulations with ease. Our dedicated customs brokers handle all necessary documentation, duties, and compliance checks to ensure your shipments clear borders smoothly without costly delays.",
    }
  ];

  return (
    <div className="bg-white min-h-screen text-text-dark font-sans selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-navy text-white pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/transport-air.jpg"
            alt="Services Background"
            fill
            priority
            className="object-cover object-center opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="text-brand border-brand/30 bg-brand/10 mb-6 py-1.5 px-4 rounded-full font-semibold">
            What We Do
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight mb-6">
            Comprehensive Logistics<br />
            <span className="text-brand">Tailored For You</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            From seamless ocean freight to navigating customs, we offer an end-to-end suite of services designed to move your business forward.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-xl shadow-navy/5 group rounded-2xl hover:-translate-y-2 transition-transform duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/90 backdrop-blur-sm flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-serif">{service.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <p className="text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
