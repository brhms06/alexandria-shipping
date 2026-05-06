"use client";

import { useState } from "react";
import { Ship, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2F6E] via-[#1a1520] to-[#0f0d12] p-4">
      <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-2xl">
        <CardHeader className="text-center pb-2 pt-10">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#2B7FFF]/15 rounded-2xl flex items-center justify-center">
            <Ship className="text-[#2B7FFF]" size={32} />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">Command Center</h1>
          <p className="text-white/40 text-sm italic mt-1">Alexandria Administrative Portal</p>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/50 font-bold">Identity</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                <Input 
                  type="email" 
                  placeholder="Admin Email"
                  className="h-12 pl-11 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl focus-visible:ring-[#2B7FFF] focus-visible:ring-2 focus-visible:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/50 font-bold">Key</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
                <Input 
                  type="password" 
                  placeholder="Access Password"
                  className="h-12 pl-11 pr-4 bg-white/5 border-white/10 text-white placeholder:text-white/25 rounded-xl focus-visible:ring-[#2B7FFF] focus-visible:ring-2 focus-visible:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-[#2B7FFF] hover:bg-[#1A6AE0] text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2">
              Authorize Access <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-white/25 font-serif italic">
            Authorized Personnel Only. <br />
            All access attempts are securely logged.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
