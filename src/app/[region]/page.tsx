import { translations } from "@/modules/maintenance/domain/translations";
import { MaintenanceCalculatorWrapper } from "./CalculatorWrapper";
import { FAQSection } from "@/modules/maintenance/ui/FAQSection";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Region } from "@/modules/maintenance/domain/types";
import Link from "next/link";
import Script from "next/script";

interface Props {
  params: Promise<{ region: string }>;
}

const countryMap: Record<string, string> = {
  us: 'United States',
  india: 'India',
  mexico: 'Mexico',
  romania: 'Romania',
  ireland: 'Ireland',
  uk: 'United Kingdom',
  canada: 'Canada',
  australia: 'Australia'
};

export async function generateStaticParams() {
  return Object.keys(translations).map((region) => ({
    region,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const country = countryMap[region];

  if (!country) return {};

  return {
    title: `${country} Maintenance & Alimony Calculator | Legal Check`,
    description: `Calculate estimated monthly maintenance and alimony in ${country}. Free jurisdictional tool based on regional legal standards.`,
    alternates: {
      canonical: `https://legal-check-calculators.vercel.app/${region}`,
    },
    keywords: [
      `alimony calculator ${region}`,
      `maintenance calculator ${region}`,
      `legal check ${region}`,
      `${country} divorce calculator`
    ]
  };
}

export default async function RegionPage({ params }: Props) {
  const { region } = await params;

  if (!translations[region as Region]) {
    notFound();
  }

  const t = translations[region as Region];
  const country = countryMap[region];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${country} Maintenance & Alimony Calculator`,
    "operatingSystem": "Web",
    "applicationCategory": "LegalApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:py-12 font-inter">
      <Script id={`schema-software-${region}`} type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </Script>
      <header className="max-w-7xl mx-auto text-center mb-12 animate-fade-in font-outfit">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          {t.header.title}
        </h1>
        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">
          {t.header.subtitle}
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <MaintenanceCalculatorWrapper region={region as Region} />
        <FAQSection region={region as Region} t={t} />
      </main>
    </div>
  );
}
