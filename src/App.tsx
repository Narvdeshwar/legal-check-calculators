import { MaintenanceCalculator } from './modules/maintenance/ui/MaintenanceCalculator';
import { FAQSection } from './modules/maintenance/ui/FAQSection';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-950 dark:to-black text-slate-900 dark:text-slate-100 font-sans">
      <header className="sticky top-0 z-50 py-4 text-center space-y-1 bg-slate-50/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400">
          Maintenance Estimator
        </h1>
        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">
          India • Legal Check
        </p>
      </header>

      <main className="flex-1 w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MaintenanceCalculator />
        <FAQSection />
      </main>

      <footer className="flex-none text-center py-6 text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} Legal Check Calculators. Designed for clarity.</p>
      </footer>
    </div>
  );
}

export default App;
