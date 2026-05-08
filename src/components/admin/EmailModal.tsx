"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mail, Send, X, AlertCircle } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
  recipientEmail: string;
  recipientName: string;
  trackingId: string;
  currentStatus: string;
  location: string;
}

export default function EmailModal({
  isOpen,
  onClose,
  onSend,
  recipientEmail,
  recipientName,
  trackingId,
  currentStatus,
  location
}: EmailModalProps) {
  const [content, setContent] = useState(
    `Hello ${recipientName},\n\nYour shipment ${trackingId} has been updated.\n\nStatus: ${currentStatus}\nLocation: ${location}\n\nThank you for choosing Alexandria.`
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-none">Notify Sender</h2>
              <p className="text-blue-100 text-xs mt-1">Send update regarding ${trackingId}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">To</label>
              <Input 
                value={recipientEmail} 
                readOnly 
                className="bg-slate-50 border-slate-100 rounded-xl font-medium text-slate-600 cursor-not-allowed"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Subject</label>
              <Input 
                value={`Alexandria: Update for ${trackingId}`} 
                readOnly 
                className="bg-slate-50 border-slate-100 rounded-xl font-medium text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Message Body</label>
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[250px] bg-slate-50 border-slate-100 rounded-2xl p-6 text-slate-700 leading-relaxed focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="Write your update message here..."
            />
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl flex gap-3 items-start border border-blue-100/50">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              This message will be sent immediately to the sender's email address. It will also be logged in the shipment's internal history.
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="rounded-xl px-6 font-semibold text-slate-500 hover:bg-white"
          >
            Discard
          </Button>
          <Button 
            onClick={() => onSend(content)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold flex gap-2 items-center shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
