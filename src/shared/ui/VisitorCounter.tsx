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
                const response = await fetch('/api/counter');
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
                {/* Global Total Section */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xs transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm group">
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-amber-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21z" />
                    </svg>
                    <span className="text-[10px] font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5 cursor-default">
                        <span className="tabular-nums text-slate-900 dark:text-white text-xs font-medium">
                            {globalTotal ? globalTotal.toLocaleString() : '---'}
                        </span>
                        <span>Global Visits</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
