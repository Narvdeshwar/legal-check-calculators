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
  title: "Maintenance & Alimony Calculator | Legal Check",
  description: "Calculate estimated monthly maintenance and alimony for US, India, Mexico, Romania, and Ireland.",
  verification: {
    google: "QBiojFf4raf2gquvDgPRU1uKbaiFJZR6MHbYY4PVkfg",
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
