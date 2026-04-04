"use client"

import { useState, useEffect } from 'react';


export const VisitorCounter = () => {
    // Local simulation for "active" visitors to look dynamic
    const [activeVisitors, setActiveVisitors] = useState(() => Math.floor(Math.random() * 8) + 12);
    // Real "Global Total" from CounterAPI
    const [globalTotal, setGlobalTotal] = useState<number | null>(null);

    useEffect(() => {
        // 1. Fetch/Increment Global Count on mount
        const fetchGlobalCount = async () => {
            try {
                // We use a unique namespace and key.
                // "up" increments the count every time the page loads (once per session/mount)
                const response = await fetch('https://api.counterapi.dev/v1/legal-check-calculators-shri/visitor-count/up');
                const data = await response.json();
                if (data && typeof data.count === 'number') {
                    setGlobalTotal(data.count);
                }
            } catch (error) {
                console.error("Failed to fetch global count:", error);
                // Fallback to a random total if API fails
                setGlobalTotal(4128);
            }
        };

        fetchGlobalCount();

        // 2. Local "Live" fluctuation interval
        const interval = setInterval(() => {
            setActiveVisitors(prev => {
                const change = Math.floor(Math.random() * 3) - 1;
                const next = prev + change;
                return next < 8 ? 8 : next > 25 ? 25 : next;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Live Section */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200/40 dark:border-emerald-800/20 bg-emerald-50/30 dark:bg-emerald-950/20 backdrop-blur-xs transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700/50 shadow-sm group">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400/80 flex items-center gap-1.5 cursor-default">
                        <span className="tabular-nums text-xs font-black">{activeVisitors}</span>
                        <span>Active Now</span>
                    </span>
                </div>

                {/* Global Total Section */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xs transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm group">
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-amber-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5 cursor-default">
                        <span className="tabular-nums text-slate-900 dark:text-white text-xs font-black">
                            {globalTotal ? globalTotal.toLocaleString() : '---'}
                        </span>
                        <span>Global Visits</span>
                    </span>
                </div>
            </div>


        </div>
    );
};
