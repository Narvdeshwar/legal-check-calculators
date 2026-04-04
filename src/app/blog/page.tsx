"use client"

import { blogPosts } from "@/modules/blog/data/posts";
import { Card } from "@/shared/ui/Card";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Globe } from "lucide-react";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-24 font-inter transition-colors duration-500 overflow-x-hidden">
            {/* Hero Section */}
            <header className="max-w-7xl mx-auto mb-20 text-center relative overflow-hidden p-16 rounded-[3rem] bg-slate-950 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/20 border border-amber-600/30 text-amber-500 text-xs font-black uppercase tracking-widest">
                        <BookOpen className="w-3 h-3" />
                        Intelligence Feed
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-outfit tracking-tighter italic">
                        Legal <span className="text-amber-500 underline decoration-amber-500/20">Check Blog</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                        World-class legal insights, jurisdictional updates, and the future of maintenance intelligence.
                    </p>
                </div>
            </header>

            {/* Post Grid */}
            <main className="max-w-7xl mx-auto pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link 
                            key={post.slug} 
                            href={`/blog/${post.slug}`}
                            className="group block transition-all"
                        >
                            <Card className="h-full flex flex-col p-0 overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)] group-hover:-translate-y-2 transition-all">
                                {/* Visual Category Card */}
                                <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-7xl relative overflow-hidden transition-all group-hover:scale-105">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent" />
                                    <span className="relative z-10 drop-shadow-2xl">{post.image}</span>
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black font-outfit text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-amber-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">{post.author}</span>
                                        <div className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-amber-600 group-hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 p-12 bg-amber-500/5 border border-amber-500/10 rounded-[3rem] text-center max-w-4xl mx-auto">
                    <Globe className="w-10 h-10 text-amber-600 mx-auto mb-6 opacity-30" />
                    <h3 className="text-3xl font-black font-outfit text-slate-900 dark:text-white mb-4">Are you a practitioner?</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">Contribute to the world's leading database of jurisdictional maintenance models.</p>
                    <Link href="/contact" className="inline-block px-10 py-3.5 bg-amber-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-110 transition-transform shadow-xl shadow-amber-500/20">
                        Join Our Network
                    </Link>
                </div>
            </main>
        </div>
    );
}
