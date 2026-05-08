"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "Understanding Customs Clearance: A Beginner's Guide",
      excerpt: "Navigating international borders can be tricky. Learn the basics of customs documentation and how to avoid common delays when shipping globally.",
      date: "May 1, 2026",
      author: "Alisa Smith",
      category: "Guides",
      image: "/hero-bg.png",
      readTime: "5 min read"
    },
    {
      title: "The Future of Sustainable Freight",
      excerpt: "How the logistics industry is adapting to eco-friendly practices, from alternative fuel ships to optimized route planning that reduces carbon emissions.",
      date: "April 24, 2026",
      author: "Alexandria Team",
      category: "Industry Trends",
      image: "/hero-bg.png",
      readTime: "7 min read"
    },
    {
      title: "Air vs. Ocean Freight: Which is Right for You?",
      excerpt: "Choosing between air and ocean freight depends on your budget, timeline, and cargo type. We break down the pros and cons of each to help you decide.",
      date: "April 15, 2026",
      author: "Logistics Expert",
      category: "Strategy",
      image: "/hero-bg.png",
      readTime: "6 min read"
    },
    {
      title: "Preparing Your Cargo for Long-Haul Trucking",
      excerpt: "Proper packaging is the key to safe delivery. Discover our top tips for securing pallets and protecting fragile items during interstate road transport.",
      date: "April 2, 2026",
      author: "Warehouse Operations",
      category: "Tips",
      image: "/hero-bg.png",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-text-dark font-sans selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy text-white pt-24 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Badge variant="outline" className="text-brand border-brand/30 bg-brand/10 mb-6 py-1.5 px-4 rounded-full font-semibold">
            Industry Insights
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight mb-6">
            The Alexandria <span className="text-brand">Blog</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Expert advice, industry news, and guides to help you navigate the world of global logistics.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {posts.map((post, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-xl shadow-navy/5 group rounded-2xl cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand hover:bg-brand text-white border-none shadow-md">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><Clock size={16} /> {post.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><User size={16} /> {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-navy mb-4 group-hover:text-brand transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="text-brand font-bold text-sm tracking-wide uppercase flex items-center gap-2">
                    Read Article &rarr;
                  </div>
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
