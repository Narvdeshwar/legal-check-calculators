"use client"

import { useState, useEffect } from "react";
import { Search, X, Globe, Scale, ArrowRight, History } from "lucide-react";
import Link from "next/link";
import { countryData } from "@/modules/maintenance/domain/countryData";
import { Region } from "@/modules/maintenance/domain/types";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState("");
    
    // Search logic
    const results = Object.entries(countryData).filter(([_, data]) => 
        data.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
        }
        return () => { document.documentElement.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
                {/* Search Input Area */}
                <div className="bg-slate-900 p-8 flex flex-col border-b border-amber-600/20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-600/20">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-medium font-outfit text-white tracking-tight">Legal Database Search</h2>
                            <p className="text-[10px] text-amber-500 uppercase tracking-[0.25em] font-medium opacity-80">Jurisdictional Intelligence Registry</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="ml-auto p-2 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative group">
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="Search by jurisdiction (e.g. India, UK, USA)..."
                            className="w-full bg-slate-950 border border-amber-600/10 rounded-2xl px-6 py-5 text-lg font-medium text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-600/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Results Section */}
                <div className="p-4 max-h-[400px] overflow-y-auto">
                    {query.length > 0 ? (
                        <div className="space-y-2">
                            <p className="px-4 text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-4">Search Results</p>
                            {results.length > 0 ? results.map(([id, data]) => (
                                <Link 
                                    key={id} 
                                    href={`/${id}`}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                                >
                                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{data.flag}</span>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-slate-900 dark:text-white">{data.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Jurisdictional Calculator Active</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                </Link>
                            )) : (
                                <div className="p-8 text-center">
                                    <p className="text-slate-500 font-medium italic">No legal archives found for "{query}"</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-8 space-y-6 text-center">
                            <History className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium text-sm">Enter a jurisdiction to access calibrated maintenance models.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">ESC</span>
                            <span className="text-[9px] text-slate-500">to exit</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-amber-600/50 uppercase tracking-widest italic">
                        <Scale className="w-3 h-3" />
                        Legal Check Intelligence v2.0
                    </div>
                </div>
            </div>
        </div>
    );
};
