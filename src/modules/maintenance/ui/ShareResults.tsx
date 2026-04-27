"use client";

import { Share2, Twitter, MessageSquare, Linkedin } from "lucide-react";

export const ShareResults = () => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "Check out this Legal Maintenance & Alimony Calculator! Precise estimates for 2026.";

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:bg-sky-500",
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      color: "hover:bg-emerald-500",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-blue-600",
    },
  ];

  return (
    <div className="mt-12 flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 backdrop-blur-xl">
      <div className="flex items-center gap-3 text-slate-900 dark:text-white font-medium font-outfit uppercase tracking-widest text-xs">
        <Share2 className="w-4 h-4 text-amber-600" />
        Spread the Intelligence
      </div>
      <div className="flex gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all hover:scale-110 hover:text-white ${link.color} shadow-sm`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};
