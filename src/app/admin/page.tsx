"use client";

import { useState } from "react";
import { Ship, Lock, Mail, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2F6E] p-4 relative overflow-hidden">
      
      {/* Heavy Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-100" />
      
      {/* Abstract Industrial Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rotate-12 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2B7FFF]/10 -rotate-12 blur-[120px]" />

      <Card className="w-full max-w-md bg-white border-4 sm:border-[8px] border-black rounded-none shadow-[10px_10px_0px_rgba(0,0,0,0.3)] sm:shadow-[20px_20px_0px_rgba(0,0,0,0.3)] relative z-10 p-0">
        <div className="bg-black text-white p-4 sm:p-6 border-b-4 sm:border-b-[8px] border-black flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Ship size={20} className="text-[#2B7FFF] sm:size-[24px]" />
              <span className="font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[8px] sm:text-[10px]">Security Protocol v4</span>
           </div>
           <ShieldCheck size={18} className="text-emerald-500" />
        </div>

        <CardHeader className="text-center pb-4 sm:pb-6 pt-8 sm:pt-10 px-6 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0A2F6E] uppercase tracking-tighter italic leading-none mb-2">
            ADMIN LOGIN
          </h1>
          <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
            Authorized Personnel Only • Alexandria Logistics Platform
          </p>
        </CardHeader>

        <CardContent className="px-6 sm:px-10 pb-10 sm:pb-12">
          {error && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-red-600 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-widest text-center border-b-2 sm:border-b-4 border-black">
              ACCESS DENIED: {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Personnel Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="ID@ALEXANDRIA.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 pl-12 bg-gray-50 border-4 border-black rounded-none text-black font-black uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-gray-200"
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Security Key
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 pl-12 bg-gray-50 border-4 border-black rounded-none text-black font-black uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-gray-200"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-[#0A2F6E] hover:bg-[#061B3D] text-white font-black uppercase tracking-[0.2em] text-xs rounded-none shadow-[10px_10px_0px_rgba(0,0,0,0.1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <Loader2 size={20} className="animate-spin" /> Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  Initialize Session <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-100">
             <p className="text-center text-[9px] font-black text-gray-300 uppercase tracking-widest leading-loose">
               Station: Terminal-Alpha • All activity is logged for institutional audit.
             </p>
          </div>
        </CardContent>
      </Card>

      {/* Decorative Stamp */}
      <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none select-none hidden lg:block">
         <div className="border-[10px] border-white p-10 text-white font-black text-6xl uppercase tracking-tighter italic rotate-12">
            OFFICIAL
         </div>
      </div>
    </div>
  );
}
