"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, ChevronRight, Share2, Bookmark, ArrowRight, Search, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const posts = [
    {
      title: "Optimizing Supply Chain Efficiency in 2026",
      excerpt: "Discover the latest strategies and technologies that are reshaping global logistics, from AI-driven route optimization to real-time asset tracking.",
      date: "May 01, 2026",
      author: "Alisa Smith",
      category: "Logistics",
      image: "/blog-1.png",
      readTime: "5 min read"
    },
    {
      title: "The Shift Towards Sustainable Maritime Transport",
      excerpt: "How the maritime industry is adapting to new environmental regulations and implementing green technologies to reduce its carbon footprint.",
      date: "April 24, 2026",
      author: "Maritime Expert",
      category: "Sustainability",
      image: "/blog-2.png",
      readTime: "7 min read"
    },
    {
      title: "Air vs. Ocean Freight: A Strategic Comparison",
      excerpt: "Choosing the right transport mode for your cargo requires balancing speed, cost, and reliability. We provide a detailed breakdown for informed decision-making.",
      date: "April 15, 2026",
      author: "Operations Team",
      category: "Strategy",
      image: "/blog-3.png",
      readTime: "6 min read"
    },
    {
      title: "Global Trade Trends: Navigating New Trade Lanes",
      excerpt: "As global trade dynamics shift, new routes are emerging. Learn how Alexandria Shipping is expanding its network to serve these growing markets.",
      date: "April 02, 2026",
      author: "Market Analyst",
      category: "Global Trade",
      image: "/hero-bg.png",
      readTime: "4 min read"
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="relative pt-40 pb-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/hero-bg.png"
              alt="Logistics News"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-2 rounded-full mb-6">
                <Newspaper size={14} className="text-blue-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">Industry Insights & News</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                Alexandria <span className="text-blue-400">Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Stay informed with the latest updates from Alexandria Shipping and deep dives into the trends shaping the future of global logistics.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Search & Categories */}
        <section className="py-12 border-b border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-4">
              {["All Posts", "Logistics", "Sustainability", "Strategy", "Global Trade"].map((cat) => (
                <button 
                  key={cat} 
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    cat === "All Posts" 
                    ? "bg-primary text-white shadow-lg shadow-blue-600/20" 
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full bg-white border border-slate-200 rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
              {posts.map((post, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8 border border-slate-100 shadow-xl transition-all group-hover:shadow-2xl group-hover:border-blue-100">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-primary text-white border-none px-4 py-1 font-bold text-[10px] uppercase tracking-widest">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> {post.date}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {post.author}</span>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-500 leading-relaxed text-lg line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                       <button className="text-primary font-bold text-sm flex items-center gap-2 group/btn">
                         Read More <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                       </button>
                       <div className="flex items-center gap-4 text-slate-300">
                          <Share2 size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
                          <Bookmark size={18} className="hover:text-blue-600 cursor-pointer transition-colors" />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-24 text-center">
               <Button variant="outline" className="h-14 px-10 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all rounded-full">
                  Load More Articles
               </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-32 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05]">
             <div className="maritime-grid absolute inset-0" />
           </div>
           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
                 Stay Ahead of the <span className="text-primary">Curve</span>
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                 Subscribe to our newsletter for exclusive industry insights, market trends, and company updates delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-1 bg-white border border-slate-200 px-8 py-4 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
                 />
                 <Button className="bg-primary hover:bg-primary/90 text-white px-10 h-14 font-bold rounded-xl shadow-lg transition-all">
                    Subscribe
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

