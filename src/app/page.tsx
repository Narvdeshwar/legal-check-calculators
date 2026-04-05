"use client"

import { useState, useMemo } from "react";
import { Card } from "@/shared/ui/Card";
import { Search, Globe, Filter } from "lucide-react";
import Link from "next/link";
import { translations } from "@/modules/maintenance/domain/translations";

import { countryData } from "@/modules/maintenance/domain/countryData";
import { Region } from "@/modules/maintenance/domain/types";


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContinent, setActiveContinent] = useState<string | null>(null);

  const regions = Object.keys(translations);
  const continents = useMemo(() => Array.from(new Set(Object.values(countryData).map(c => c.continent))), []);

  const filteredRegions = useMemo(() => {
    return regions.filter(region => {
      const data = countryData[region as Region];
      const matchesSearch = data?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = !activeContinent || data?.continent === activeContinent;
      return matchesSearch && matchesContinent;
    });
  }, [searchQuery, activeContinent, regions]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16 md:py-32 font-inter transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Hero Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -mr-40 -mt-20 animate-fade-in" />
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -ml-20 animate-fade-in" />

      <header className="max-w-4xl mx-auto text-center mb-24 animate-fade-in-up relative z-10 font-outfit">
        <div className="inline-flex items-center justify-center p-3.5 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl mb-10 border border-amber-500/20 shadow-2xl shadow-amber-500/10">
          <Globe className="w-10 h-10 text-amber-600 dark:text-amber-500 animate-pulse" />
        </div>
        <h1 className="text-6xl md:text-8xl font-medium text-slate-900 dark:text-white mb-8 tracking-[-0.06em] leading-[0.95]">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic">Legal Intelligence</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium opacity-80 decoration-amber-500/20 underline">
          The industry standard for multi-jurisdictional alimony and maintenance estimation for 2026.
        </p>
      </header>

      {/* Global Search & Filter Bar */}
      <div className="max-w-5xl mx-auto mb-12 space-y-6">
        <div className="relative group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by country (e.g. India, United Kingdom)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 transition-all shadow-sm group-hover:shadow-md"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveContinent(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeContinent ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-amber-500"
            }`}
          >
            All Regions
          </button>
          {continents.map(continent => (
            <button
              key={continent}
              onClick={() => setActiveContinent(continent)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeContinent === continent ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-amber-500"
              }`}
            >
              {continent}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <main className="max-w-6xl mx-auto">
        {filteredRegions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {filteredRegions.map((region) => {
              const { name, flag } = countryData[region as Region] || { name: region, flag: '🌐' };
              return (
                <Link key={region} href={`/${region}`} className="block transition-all hover:scale-[1.03] active:scale-95 group">
                  <Card className="h-full flex flex-col items-center justify-center p-8 bg-white/40 dark:bg-slate-900/40 relative overflow-hidden group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:border-amber-500/50">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/10 group-hover:bg-amber-500 transition-colors" />
                    <span className="text-5xl mb-4 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-300 transform group-hover:rotate-6">{flag}</span>
                    <span className="font-medium text-slate-900 dark:text-white text-lg tracking-tight">{name}</span>
                    <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-medium">Standardized Tool</span>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="inline-flex items-center justify-center p-4 bg-slate-200 dark:bg-slate-800 rounded-full mb-4">
              <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <p className="font-medium text-slate-900 dark:text-white text-xl">No jurisdictions found</p>
            <p className="text-slate-500 text-sm mt-1">Try searching for another country or clearing your filters.</p>
            <button
                onClick={() => { setSearchQuery(""); setActiveContinent(null); }}
                className="mt-6 text-amber-600 font-medium hover:underline"
            >
                Clear all filters
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
