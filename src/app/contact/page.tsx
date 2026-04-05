"use client";

import { useState } from "react";
import { MessageSquare, ShieldCheck, Zap, Globe, ArrowRight, User, Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/shared/ui/Card";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate API call
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-inter py-24 px-6 overflow-x-hidden transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] -ml-60 -mb-60 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-20 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-600 text-[10px] font-medium uppercase tracking-[0.2em] animate-fade-in">
                        <Zap className="w-3 h-3" />
                        Confidential Channel
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium font-outfit tracking-tighter text-slate-900 dark:text-white max-w-4xl mx-auto leading-[0.9]">
                        Share your <span className="text-amber-600 italic">Legal Problem</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Securely detail your situation. Our specialized jurisdictional experts will review your case using the latest 2026 intelligence models.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Benefits/Info Section */}
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                        <div className="space-y-6">
                            {[
                                { 
                                    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />, 
                                    title: "100% Privacy-First", 
                                    desc: "All submissions are encrypted. We treat your data with absolute fiduciary confidentiality." 
                                },
                                { 
                                    icon: <Globe className="w-5 h-5 text-amber-600" />, 
                                    title: "Jurisdictional Precision", 
                                    desc: "We match your case to the specific local laws of your current residency." 
                                },
                                { 
                                    icon: <Zap className="w-5 h-5 text-amber-600" />, 
                                    title: "Rapid Review", 
                                    desc: "Get an initial high-level assessment within 24 business hours." 
                                }
                            ].map((benefit, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 backdrop-blur-md">
                                    <div className="p-3 bg-amber-500/10 rounded-2xl h-fit">
                                        {benefit.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">{benefit.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact info snippets */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <h3 className="text-xl font-medium font-outfit mb-6">Support Hub</h3>
                            <div className="space-y-4 text-sm font-medium opacity-70">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-amber-600" />
                                    support@legal-check.com
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-amber-600" />
                                    Global Support 24/7
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lead Form Section */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        {status === "success" ? (
                            <Card className="p-12 text-center py-32 space-y-6">
                                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                    <Zap className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-medium font-outfit text-slate-900 dark:text-white">Case Received</h2>
                                <p className="text-slate-500 max-w-sm mx-auto font-medium">Your legal details have been securely logged. An intelligence specialist will contact you shortly.</p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 px-10 py-3 bg-amber-600 text-white rounded-2xl font-medium text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-amber-600/20"
                                >
                                    New Inquiry
                                </button>
                            </Card>
                        ) : (
                            <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl">
                                <div className="bg-slate-900 p-8 flex items-center justify-between border-b border-amber-600/20">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-medium font-outfit text-white">Confidential Inquiry</h2>
                                        <p className="text-xs text-amber-500 uppercase tracking-widest font-medium">Internal Intelligence Tracking</p>
                                    </div>
                                    <MessageSquare className="w-8 h-8 text-amber-600" />
                                </div>

                                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2">
                                                <User className="w-3 h-3 text-amber-600" />
                                                Legal Name
                                            </label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="Enter full name"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2">
                                                <Mail className="w-3 h-3 text-amber-600" />
                                                Email Matrix
                                            </label>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="name@company.com"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2">
                                                <Phone className="w-3 h-3 text-amber-600" />
                                                Secure Phone
                                            </label>
                                            <input 
                                                type="tel" 
                                                placeholder="+X XXX-XXX-XXXX"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2">
                                                <MapPin className="w-3 h-3 text-amber-600" />
                                                Jurisdiction
                                            </label>
                                            <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white appearance-none">
                                                <option>United States</option>
                                                <option>India</option>
                                                <option>United Kingdom</option>
                                                <option>Canada</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 px-1 flex items-center gap-2">
                                            <MessageSquare className="w-3 h-3 text-amber-600" />
                                            Legal Narrative
                                        </label>
                                        <textarea 
                                            required
                                            rows={5}
                                            placeholder="Detail your situation concisely..."
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl px-6 py-5 text-sm font-medium focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600 outline-none transition-all dark:text-white resize-none"
                                        />
                                    </div>

                                    <div className="bg-amber-600/5 p-6 rounded-3xl border border-amber-600/10 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                                        By submitting, you indicate that you have read and agree to our Intelligence Privacy Protocol.
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full bg-amber-600 text-white py-6 rounded-2xl font-medium text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-amber-600/20 disabled:opacity-50"
                                    >
                                        {status === "submitting" ? (
                                            "Securing Channel..."
                                        ) : (
                                            <>
                                                Submit Case for Review
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
