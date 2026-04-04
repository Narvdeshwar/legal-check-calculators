"use client"

import Link from "next/link";
import { Scale, Globe, Mail, Shield, AlertTriangle, FileText, Send } from "lucide-react";
import { VisitorCounter } from "./VisitorCounter";

export const Footer = () => {
    return (
        <footer className="relative bg-slate-950 dark:bg-black pt-24 pb-12 overflow-hidden font-inter text-slate-400">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                                <Scale className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-outfit font-black text-xl text-white tracking-tighter italic">
                                Legal<span className="text-amber-600">Check</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            The industry's most advanced jurisdictional intelligence engine for maintenance and alimony modeling. 
                        </p>
                        <div className="flex gap-4">
                            <div className="p-2 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer">
                                <Globe className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="p-2 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer">
                                <Mail className="w-4 h-4 text-amber-500" />
                            </div>
                        </div>
                    </div>

                    {/* Regional Tools Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Calculator Hub</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] font-bold uppercase">
                            <Link href="/us" className="hover:text-amber-500 transition-all">United States</Link>
                            <Link href="/india" className="hover:text-amber-500 transition-all">India</Link>
                            <Link href="/mexico" className="hover:text-amber-500 transition-all">Mexico</Link>
                            <Link href="/ireland" className="hover:text-amber-500 transition-all">Ireland</Link>
                            <Link href="/uk" className="hover:text-amber-500 transition-all">United Kingdom</Link>
                            <Link href="/canada" className="hover:text-amber-500 transition-all">Canada</Link>
                            <Link href="/australia" className="hover:text-amber-500 transition-all">Australia</Link>
                            <Link href="/romania" className="hover:text-amber-500 transition-all">Romania</Link>
                        </div>
                    </div>

                    {/* Legal & Compliance Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Legal Framework</h4>
                        <div className="flex flex-col gap-3.5 text-sm font-medium">
                            <Link href="/privacy-policy" className="flex items-center gap-3 group">
                                <Shield className="w-4 h-4 text-slate-600 group-hover:text-amber-500" />
                                <span className="group-hover:text-white transition-colors">Privacy & Data</span>
                            </Link>
                            <Link href="/terms" className="flex items-center gap-3 group">
                                <FileText className="w-4 h-4 text-slate-600 group-hover:text-amber-500" />
                                <span className="group-hover:text-white transition-colors">Terms of Service</span>
                            </Link>
                            <Link href="/disclaimer" className="flex items-center gap-3 group">
                                <AlertTriangle className="w-4 h-4 text-slate-600 group-hover:text-amber-500" />
                                <span className="group-hover:text-white transition-colors">Legal Disclaimer</span>
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Weekly Updates</h4>
                        <div className="flex flex-col gap-3">
                            <div className="p-1 bg-slate-900 border border-slate-800 rounded-2xl flex items-center">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="bg-transparent border-none outline-none px-4 py-2 flex-grow min-w-0 text-xs font-bold text-white placeholder:text-slate-600"
                                />
                                <button className="bg-amber-600 text-white p-2 md:p-2.5 rounded-xl hover:scale-105 transition-transform shrink-0">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[10px] opacity-60">Join 50k+ legal professionals worldwide.</p>
                        </div>
                        <div className="pt-2 flex items-center gap-4 text-[10px] font-black text-slate-700 tracking-[0.2em] uppercase">
                            <div className="w-6 h-[1px] bg-slate-800" />
                            Security Protocol
                        </div>
                    </div>
                </div>

                {/* Final Footer Row */}
                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
                        <VisitorCounter />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">
                            © 2026 Legal Check Global Hub • Precision Engineering
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Link href="/about" className="hover:text-amber-500 transition-colors">Team</Link>
                        <Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link>
                        <Link href="/#faq" className="hover:text-amber-500 transition-colors">FAQ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
