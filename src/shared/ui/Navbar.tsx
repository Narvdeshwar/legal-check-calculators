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
                <Link href="/" className="flex items-center gap-3 group relative">
                    <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500">
                        <Scale className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-outfit font-black text-xl text-slate-900 dark:text-white leading-none tracking-tighter">
                            Legal<span className="text-amber-600">Check</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mt-1">Global Intelligence</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-500 transition-all group"
                        >
                            <span className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">{link.icon}</span>
                            {link.name}
                            {link.premium && (
                                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                            )}
                        </Link>
                    ))}
                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />
                    <button className="p-2 text-slate-500 hover:text-amber-600 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link 
                        href="/#regions" 
                        className="bg-slate-900 dark:bg-amber-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:scale-105 transition-all shadow-lg shadow-black/10"
                    >
                        Start Calculator
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            className="flex items-center gap-4 text-lg font-bold text-slate-900 dark:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <hr className="border-slate-100 dark:border-slate-800" />
                    <Link 
                        href="/#regions" 
                        className="w-full text-center bg-amber-600 text-white py-4 rounded-2xl font-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Get Free Estimation
                    </Link>
                </div>
            )}
        </nav>
    );
};
