"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Mail, Lock, ShieldCheck, Zap, ArrowLeft, Scale } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/ui/Card";

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Redirect if already logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) router.push("/");
        });
    }, [router]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanEmail = email.trim();
        
        if (!cleanEmail || !cleanEmail.includes('@')) {
            setError("Identification format invalid. Must include '@' domain.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (mode === "login") {
                const { error } = await supabase.auth.signInWithPassword({ 
                    email: cleanEmail, 
                    password 
                });
                if (error) throw error;
                router.push("/");
            } else {
                const { error } = await supabase.auth.signUp({ 
                    email: cleanEmail, 
                    password,
                    options: { emailRedirectTo: window.location.origin }
                });
                if (error) throw error;
                alert("Matrix Profile Initialized. Check your inbox for the activation sequence.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6 relative overflow-hidden transition-colors duration-500">
            {/* Cinematic Background Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] -mr-80 -mt-80 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] -ml-80 -mb-80 pointer-events-none" />

            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-all mb-8 font-medium group"
                >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Calculator Hub
                </Link>

                <Card className="p-0 overflow-hidden bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(245,158,11,0.08)] backdrop-blur-3xl">
                    {/* Header */}
                    <div className="bg-slate-900 p-8 flex flex-col items-center text-center border-b border-amber-600/20">
                        <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-amber-600/20">
                            <Scale className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-medium font-outfit text-white tracking-tight">
                                {mode === "login" ? "Case Access" : "Create Legal Profile"}
                            </h2>
                            <p className="text-[10px] text-amber-500 uppercase tracking-[0.25em] font-medium opacity-80">Jurisdictional Intelligence Portal</p>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-medium flex items-center gap-3 animate-shake">
                                <Zap className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2 text-left">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2 font-medium opacity-70">
                                    <Mail className="w-3 h-3 text-amber-600" />
                                    Legal Identifier (Email)
                                </label>
                                <input 
                                    required
                                    type="email" 
                                    placeholder="name@matrix.com"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2 font-medium opacity-70">
                                    <Lock className="w-3 h-3 text-amber-600" />
                                    Secure Case Password
                                </label>
                                <input 
                                    required
                                    type="password" 
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 text-white py-5 rounded-2xl font-medium text-[11px] tracking-widest uppercase hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-amber-600/20 disabled:opacity-50"
                        >
                            {loading ? "Authorizing..." : mode === "login" ? "Enter Portal" : "Join Legal Network"}
                        </button>

                        <div className="text-center pt-2">
                            <button 
                                type="button"
                                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                className="text-[9px] uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors font-medium border-none outline-none"
                            >
                                {mode === "login" ? "Create New Legal Profile" : "Back to Case Access Portal"}
                            </button>
                        </div>
                    </form>

                    <div className="bg-amber-600/5 p-6 border-t border-amber-600/10 flex items-center gap-4 text-[9px] font-medium text-slate-500/70 dark:text-slate-400/70 text-left">
                        <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 opacity-50" />
                        By accessing this portal, you indicate your acceptance of our Global Intelligence protocols.
                    </div>
                </Card>

                <p className="text-center mt-12 text-[10px] uppercase tracking-[0.3em] font-medium text-slate-400 opacity-30">
                    Precision Engineered Secure Portal © 2026
                </p>
            </div>
        </div>
    );
}
