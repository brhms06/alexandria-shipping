"use client";

import { CheckCircle2, Circle, Clock, MapPin, Ship, Anchor, Truck } from "lucide-react";
import { ShipmentHistory } from "@/types";
import { motion } from "framer-motion";

interface Props {
  history: ShipmentHistory[];
}

const getIcon = (status: string) => {
  if (status.includes("Port")) return <Anchor size={14} />;
  if (status.includes("Transit")) return <Ship size={14} />;
  if (status.includes("Delivery")) return <Truck size={14} />;
  return <Circle size={14} />;
};

export default function TrackingTimeline({ history }: Props) {
  return (
    <div className="space-y-12 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-accent/30 before:border-l before:border-dashed before:border-accent/50">
      {history.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
          className="flex gap-8 relative"
        >
          <div className="z-10 bg-background pt-1">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index === 0 
                ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(197,160,89,0.5)]" 
                : "bg-white border-glass-border text-gray-400"
              }`}
            >
              {index === 0 ? <CheckCircle2 size={16} /> : getIcon(item.status)}
            </motion.div>
          </div>
          
          <div className={`glass-card flex-1 p-6 relative group ${
            index === 0 ? "border-accent/40 bg-white/60" : "bg-white/30"
          }`}>
            {index === 0 && (
              <div className="absolute -top-3 left-6 px-3 py-0.5 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                Latest Update
              </div>
            )}
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div>
                <h4 className="font-serif text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                  {item.status}
                </h4>
                <div className="flex items-center gap-1.5 text-sm font-bold text-accent uppercase tracking-widest mt-1">
                  <MapPin size={14} /> {item.location}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-400 flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full w-fit">
                <Clock size={14} /> {item.timestamp}
              </span>
            </div>
            
            <p className="text-gray-600 text-lg font-serif italic leading-relaxed">
              {item.description}
            </p>
            
            {/* Subtle decorative accent */}
            <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {getIcon(item.status)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
