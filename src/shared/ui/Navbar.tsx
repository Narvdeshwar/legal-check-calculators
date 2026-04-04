"use client"

import Link from "next/link";
import { Search, Globe, ChevronDown, Menu, X, BookOpen, Scale, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Calculators", href: "/", icon: <Scale className="w-4 h-4" /> },
        { name: "Global Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" /> },
        { name: "Jurisdictions", href: "/#regions", icon: <Globe className="w-4 h-4" />, premium: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
            isScrolled 
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-xl shadow-amber-500/5" 
            : "bg-transparent py-5"
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group relative shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500">
                        <Scale className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-outfit font-black text-lg md:text-xl text-slate-900 dark:text-white leading-none tracking-tighter">
                            Legal<span className="text-amber-600">Check</span>
                        </span>
                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mt-1">Global Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Menu - Optimized for LG+ */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-500 transition-all group whitespace-nowrap"
                        >
                            <span className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">{link.icon}</span>
                            {link.name}
                            {link.premium && (
                                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                            )}
                        </Link>
                    ))}
                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
                    <button className="p-2 text-slate-500 hover:text-amber-600 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link 
                        href="/#regions" 
                        className="bg-slate-900 dark:bg-amber-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg shadow-black/10 whitespace-nowrap"
                    >
                        Start Calculator
                    </Link>
                </div>

                {/* Mobile Menu Button - Show on LG and down */}
                <button 
                    className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile / Tablet Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className="flex items-center gap-5 text-xl font-black font-outfit text-slate-900 dark:text-white group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-600 group-hover:text-white transition-all">
                                {link.icon}
                            </div>
                            {link.name}
                        </Link>
                    ))}
                    <hr className="border-slate-100 dark:border-slate-800 my-2" />
                    <Link 
                        href="/#regions" 
                        className="w-full text-center bg-amber-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-amber-600/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Start Estimation
                    </Link>
                </div>
            )}
        </nav>
    );
};
