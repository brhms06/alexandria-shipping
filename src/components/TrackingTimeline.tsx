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
    <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#FFBE00]/20 before:border-l before:border-dashed before:border-[#FFBE00]/30">
      {history.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex gap-6 relative"
        >
          <div className="z-10 bg-[#050505] pt-1">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className={`w-8 h-8 rounded-none flex items-center justify-center border ${
                index === 0 
                ? "bg-[#FFBE00] border-[#FFBE00] text-black shadow-[0_0_15px_rgba(255,190,0,0.3)]" 
                : "bg-black border-[#FFBE00]/20 text-[#FFBE00]/40"
              }`}
            >
              {index === 0 ? <CheckCircle2 size={16} strokeWidth={3} /> : getIcon(item.status)}
            </motion.div>
          </div>
          
          <div className={`border rounded-none flex-1 p-5 relative group transition-all duration-300 ${
            index === 0 
            ? "border-[#FFBE00]/40 bg-[#FFBE00]/5" 
            : "border-[#FFBE00]/10 bg-black/40 hover:border-[#FFBE00]/30"
          }`}>
            {index === 0 && (
              <div className="absolute -top-3 left-4 px-2 py-0.5 bg-[#FFBE00] text-black text-[9px] font-black uppercase tracking-[0.2em]">
                LIVE UPDATE
              </div>
            )}
            
            {/* Corner accents for the latest update */}
            {index === 0 && (
              <>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFBE00]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFBE00]" />
              </>
            )}
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
              <div>
                <h4 className="font-mono text-lg font-bold tracking-tight text-[#FFBE00] uppercase">
                  {item.status}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FFBE00]/60 uppercase tracking-[0.15em] mt-1">
                  <MapPin size={12} className="text-[#FFBE00]" /> {item.location}
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#FFBE00]/40 flex items-center gap-2 bg-[#FFBE00]/5 px-2 py-1 border border-[#FFBE00]/10">
                <Clock size={12} /> {item.timestamp}
              </span>
            </div>
            
            <p className="text-[#FFBE00]/80 text-sm font-medium leading-relaxed font-mono">
              {item.description}
            </p>
            
            {/* Tactical background indicator */}
            <div className="absolute bottom-3 right-3 opacity-5 group-hover:opacity-10 transition-opacity text-[#FFBE00]">
              {getIcon(item.status)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
