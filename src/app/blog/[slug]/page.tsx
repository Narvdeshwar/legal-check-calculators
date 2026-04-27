import { blogPosts } from "@/modules/blog/data/posts";
import { Card } from "@/shared/ui/Card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, ChevronRight, Scale } from "lucide-react";
import { Metadata } from "next";
import Script from "next/script";

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

    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": `https://legal-check-calculators.vercel.app${post.image}`,
      "datePublished": new Date(post.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Legal Check Calculator",
        "logo": {
          "@type": "ImageObject",
          "url": "https://legal-check-calculators.vercel.app/icon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://legal-check-calculators.vercel.app/blog/${post.slug}`
      }
    };

    return (
        <article className="min-h-screen bg-slate-50 dark:bg-[#0c1425] transition-colors duration-500 overflow-x-hidden font-inter">
            <Script id={`schema-blog-${post.slug}`} type="application/ld+json">
              {JSON.stringify(blogSchema)}
            </Script>
            {/* Top Reading Progress & Backdrop */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-amber-600/5 to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
                {/* Header Navigation */}
                <nav className="mb-16 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-slate-400">
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
                        <div className="p-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl shadow-amber-500/5 text-4xl overflow-hidden w-16 h-16 flex items-center justify-center">
                            {post.image.includes('/') || post.image.includes('http') ? (
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            ) : post.image}
                        </div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500">Global Perspective</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-medium font-outfit text-slate-900 dark:text-white mb-10 leading-[0.9] tracking-tighter">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
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
                        className="blog-content font-inter"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </Card>

                {/* Post Footer / Navigation */}
                <footer className="mt-24 pt-20 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <Scale className="w-10 h-10 text-amber-600 mb-6 mx-auto md:mx-0 opacity-20" />
                        <h4 className="text-xl font-medium font-outfit text-slate-900 dark:text-white italic uppercase tracking-tighter">Disclaimer</h4>
                        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">Intelligence reports are informational simulations and do not constitute authorized legal counsel or a binding attorney-client relationship.</p>
                    </div>
                    
                    <Link 
                        href="/#regions"
                        className="p-8 bg-slate-900 dark:bg-amber-600 rounded-3xl text-white flex items-center gap-6 hover:scale-105 transition-transform group shadow-2xl shadow-amber-600/10"
                    >
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60 mb-2">Platform Action</span>
                            <span className="text-2xl font-medium font-outfit tracking-tighter">Calculate My Case</span>
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
