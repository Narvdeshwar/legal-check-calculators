import { Card } from "@/shared/ui/Card";
import Link from "next/link";
import { ArrowLeft, Mail, Shield, Scale, Info, FileText, ChevronRight, Globe } from "lucide-react";

interface ComplianceLayoutProps {
    activePath: string;
    children: React.ReactNode;
}

const ComplianceLayout = ({ activePath, children }: ComplianceLayoutProps) => {
    const navItems = [
        { name: 'About Legal Check', path: '/about', icon: <Info className="w-4 h-4" /> },
        { name: 'Privacy Policy', path: '/privacy-policy', icon: <Shield className="w-4 h-4" /> },
        { name: 'Terms of Service', path: '/terms', icon: <FileText className="w-4 h-4" /> },
        { name: 'Legal Disclaimer', path: '/disclaimer', icon: <Scale className="w-4 h-4" /> },
        { name: 'Contact & Support', path: '/contact', icon: <Mail className="w-4 h-4" /> },
    ];

    const activeItem = navItems.find(item => item.path === activePath) || navItems[0];

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] font-inter transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Fixed-Position Sidebar Navigation */}
                <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 relative">
                    <div className="md:sticky md:top-32 space-y-4 py-12 h-fit">
                        <div className="mb-8 px-4 flex flex-col gap-2">
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Legal Intelligence</p>
                             <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">{activeItem.name}</h2>
                        </div>
                        
                        {navItems.map((item) => (
                            <Link 
                                key={item.path}
                                href={item.path}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                                    ${activePath === item.path 
                                        ? 'bg-amber-600/10 text-amber-600 shadow-sm border-l-4 border-amber-600' 
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'}
                                `}
                            >
                                <span className={activePath === item.path ? 'text-amber-600' : 'text-slate-400'}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        ))}
                        
                        <div className="mt-12 p-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl text-white shadow-xl shadow-amber-600/20">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Need Help?</p>
                            <p className="text-sm font-medium mb-4 leading-relaxed">Our legal team is ready to discuss jurisdictional updates.</p>
                            <Link href="/contact" className="block text-center py-2 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold hover:bg-white/30 transition-all">Support Center</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area - Flows with Global Scroll */}
                <main className="flex-1 max-w-4xl py-12 relative animate-fade-in-up">
                    <Card className="p-10 md:p-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600/0 via-amber-600 to-amber-600/0 opacity-50" />
                        
                        <div className="prose prose-slate dark:prose-invert max-w-none 
                            prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 dark:prose-h2:text-white prose-h2:mt-16 prose-h2:mb-8 prose-h2:font-outfit prose-h2:tracking-tight
                            prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:text-lg
                            prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:text-lg
                            prose-strong:text-amber-700 dark:prose-strong:text-amber-500
                        ">
                            {children}
                        </div>
                    </Card>

                    <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase text-center md:text-left">
                            © 2026 Legal Check global hub • jurisdictional intelligence engine
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

// --- Pages ---

export const PrivacyPolicy = () => (
    <ComplianceLayout activePath="/privacy-policy">
        <p>At Legal Check, we treat your privacy as a fundamental rights-based obligation. We operate with a strict **Local-First** data policy, ensuring that your most sensitive financial details never leave your device.</p>
        
        <h2>1. Zero-Storage Mandate</h2>
        <p>Your financial inputs are processed entirely within the volatile memory (RAM) of your local browser. No income data, family details, or maintenance calculation results are ever transmitted to, serialized on, or stored in our cloud infrastructure.</p>
        
        <h2>2. Anonymous Traffic Analysis</h2>
        <p>We use high-signal, anonymous telemetry (Google Analytics) to monitor global performance. This data is fully decoupled from individual user profiles and used solely to refine our 195+ jurisdictional algorithms.</p>
        
        <h2>3. Local Experience Cookies</h2>
        <p>We use encrypted, first-party cookie headers to maintain your regional preferences (e.g., currency and country selection). These serve to enhance dashboard persistence and can be purged at any time via your browser controls.</p>
    </ComplianceLayout>
);

export const Disclaimer = () => (
    <ComplianceLayout activePath="/disclaimer">
        <div className="bg-amber-600/10 dark:bg-amber-600/5 border-l-8 border-amber-600 p-8 rounded-2xl mb-12">
            <h3 className="text-amber-700 dark:text-amber-500 font-black text-xl mb-2 font-outfit uppercase">Critical Legal Notice</h3>
            <p className="text-slate-900 dark:text-slate-100 font-bold m-0 p-0">NOT A REPLACEMENT FOR LICENSED LEGAL COUNSEL</p>
        </div>
        
        <h2>Non-Firm Entity</h2>
        <p>Legal Check is organized as a technology company and mathematical modeling engine. We do not provide legal advice, legal strategy, or individual legal representation.</p>
        
        <h2>Estimation Accuracy</h2>
        <p>While our jurisdictional libraries are manually curated and cross-referenced with regional statutes, "Maintenance" and "Alimony" are fundamentally subject to judicial discretion, specific case-facts, and rapid legislative shifts. Our estimates are statistical approximations and should be treated as starting points for professional discussion.</p>
        
        <h2>No Binding Agreement</h2>
        <p>Use of the Legal Check dashboard, API, or documentation hub does not establish an attorney-client relationship. You are strongly advised to secure professional counsel before making binding financial settlements.</p>
    </ComplianceLayout>
);

export const TermsOfService = () => (
    <ComplianceLayout activePath="/terms">
        <h2>Binding Agreement</h2>
        <p>By accessing the Legal Check platform, you formally acknowledge and agree to be bound by these Terms of Service. If you do not consent to these parameters, you are unauthorized to access our intelligence engine.</p>
        
        <h2>Permissible Use Guidelines</h2>
        <ul className="list-disc pl-6 space-y-4">
            <li><strong>Non-Commercial</strong>: Dashboards are provided for personal informational planning only.</li>
            <li><strong>Data Integrity</strong>: No unauthorized automated crawling or database extraction is permitted.</li>
            <li><strong>Global Accuracy</strong>: Users must provide accurate geographical inputs to ensure model validity.</li>
        </ul>
        
        <h2>Liability Limitation</h2>
        <p>Legal Check and its parent entities are explicitly not liable for financial loss, legal penalties, or adverse court orders resulting from the interpretation of our estimation models.</p>
    </ComplianceLayout>
);

export const AboutUs = () => (
    <ComplianceLayout activePath="/about">
        <p>Founded at the intersection of civil law and precision data engineering, Legal Check exists to bring transparency to the often opaque world of family law financial calculations.</p>
        
        <h2>The Global Mission</h2>
        <p>Legal transitions are among the most stressful human experiences. We believe that clarity shouldn't be gated behind a three-figure-an-hour retainer. Our engine now powers estimations across thousands of legal edge-cases in 195 nations.</p>
        
        <h2>Architecture of Authority</h2>
        <p>Every algorithm in our hub is the result of deep legislative research. Our "Hub" architecture allows us to push updates to 195 jurisdictions simultaneously, ensuring our global user base always has access to current statutory mathematics.</p>
    </ComplianceLayout>
);

export const ContactUs = () => (
    <ComplianceLayout activePath="/contact">
        <p>Our centralized support hub provides direct access to our jurisdictional engineering and legal compliance teams.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <Link href="mailto:supportlegalcheck@gmail.com" className="p-8 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-amber-600/5 transition-all group">
                <Mail className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-2 font-outfit text-slate-900 dark:text-white uppercase tracking-tight">Technical Support</h3>
                <p className="text-amber-600 font-bold mb-4">supportlegalcheck@gmail.com</p>
                <div className="flex items-center gap-2 text-xs opacity-60">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Response within 24 hours
                </div>
            </Link>
            
            <Link href="mailto:supportlegalcheck@gmail.com" className="p-8 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-amber-600/5 transition-all group">
                <Scale className="w-10 h-10 text-amber-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black mb-2 font-outfit text-slate-900 dark:text-white uppercase tracking-tight">Compliance & Data</h3>
                <p className="text-amber-600 font-bold mb-4">supportlegalcheck@gmail.com</p>
                <p className="text-xs opacity-60">Verified jurisdictional updates only.</p>
            </Link>
        </div>
        
        <div className="p-10 bg-slate-900 text-white rounded-[2rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-black font-outfit mb-4 uppercase italic">Global HQ</h3>
            <p className="text-slate-400 max-w-sm mb-0">Our distributed engineering team operates globally across PST and UTC time zones to maintain our jurisdictional libraries.</p>
        </div>
    </ComplianceLayout>
);
