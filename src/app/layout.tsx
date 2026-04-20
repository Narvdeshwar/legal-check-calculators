import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import ScrollToTop from "@/shared/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://legal-check-calculators.vercel.app"),
  title: "Maintenance & Alimony Calculator | Legal Check Calculator",
  description: "Advanced Legal Check Calculator for estimated monthly maintenance and alimony across US, India, UK, and more. Precision multi-jurisdictional legal intelligence.",
  keywords: [
    "legal-check-calculator",
    "legal check calculator",
    "legal-check-calculators",
    "alimony calculator",
    "maintenance calculator",
    "divorce settlement calculator",
    "global legal intelligence"
  ],
  authors: [{ name: "Legal Check Team" }],
  openGraph: {
    title: "Legal Check Calculator | Global Alimony & Maintenance",
    description: "Calculate your legal maintenance and alimony with precision across multiple jurisdictions.",
    type: "website",
    url: "https://legal-check-calculators.vercel.app",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Check Calculator",
    description: "Global Jurisdictional Intelligence for Alimony and Maintenance.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "QBiojFf4raf2gquvDgPRU1uKbaiFJZR6MHbYY4PVkfg",
  },
  other: {
    "google-adsense-account": "ca-pub-9834734153117480",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9834734153117480"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HVPE9V9P77"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVPE9V9P77');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-inter`}
      >
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow pt-20 overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
