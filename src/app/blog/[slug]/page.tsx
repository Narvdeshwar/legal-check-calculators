import { blogPosts } from "@/modules/blog/data/posts";
import { Card } from "@/shared/ui/Card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, ChevronRight, Scale } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Legal Intelligence Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-slate-50 dark:bg-[#0c1425] transition-colors duration-500 overflow-x-hidden font-inter">
            {/* Top Reading Progress & Backdrop */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-amber-600/5 to-transparent pointer-events-none" />
            
            <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                {/* Header Navigation */}
                <nav className="mb-16 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                    <Link href="/blog" className="flex items-center gap-2 text-amber-600 dark:text-amber-500 hover:opacity-80 transition-opacity">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Hub
                    </Link>
                    <div className="hidden md:flex items-center gap-2">
                        <span>Legal Intelligence</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-slate-600 dark:text-white">{post.category}</span>
                    </div>
                </nav>

                <header className="mb-16 animate-fade-in">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl shadow-amber-500/5 text-4xl">
                            {post.image}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500">Global Perspective</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-outfit text-slate-900 dark:text-white mb-10 leading-[0.9] tracking-tighter">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                        <div className="flex items-center gap-2 pr-6 border-r border-slate-200 dark:border-slate-800">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2 pr-6 border-r border-slate-200 dark:border-slate-800">
                            <User className="w-3 h-3 text-amber-600" />
                            By {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {post.readTime}
                        </div>
                    </div>
                </header>

                <Card className="p-10 md:p-16 mb-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border-transparent dark:border-slate-800/50 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-amber-600/10 via-amber-600 to-amber-600/10" />
                    
                    <div 
                        className="prose prose-slate dark:prose-invert max-w-none 
                            prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 dark:prose-h2:text-white prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-outfit prose-h2:tracking-tight
                            prose-h3:text-xl prose-h3:font-bold prose-h3:mt-12 prose-h3:text-slate-800 dark:prose-h3:text-white prose-h3:font-outfit
                            prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-xl prose-p:font-medium
                            prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:text-lg
                            prose-blockquote:border-l-4 prose-blockquote:border-amber-600 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/30 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl
                            prose-strong:text-amber-700 dark:prose-strong:text-amber-500 prose-strong:font-black
                            prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                        "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </Card>

                {/* Post Footer / Navigation */}
                <footer className="mt-24 pt-20 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <Scale className="w-10 h-10 text-amber-600 mb-6 mx-auto md:mx-0 opacity-20" />
                        <h4 className="text-xl font-black font-outfit text-slate-900 dark:text-white italic uppercase tracking-tighter">Disclaimer</h4>
                        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">Intelligence reports are informational simulations and do not constitute authorized legal counsel or a binding attorney-client relationship.</p>
                    </div>
                    
                    <Link 
                        href="/#regions"
                        className="p-8 bg-slate-900 dark:bg-amber-600 rounded-3xl text-white flex items-center gap-6 hover:scale-105 transition-transform group shadow-2xl shadow-amber-600/10"
                    >
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Platform Action</span>
                            <span className="text-2xl font-black font-outfit tracking-tighter">Calculate My Case</span>
                        </div>
                        <div className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-amber-600 transition-all">
                            <ArrowLeft className="w-6 h-6 rotate-180" />
                        </div>
                    </Link>
                </footer>
            </div>
        </article>
    );
}
