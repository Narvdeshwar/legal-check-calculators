import { useMaintenanceCalculator } from './modules/maintenance/hooks/useMaintenanceCalculator';
import { MaintenanceCalculator } from './modules/maintenance/ui/MaintenanceCalculator';
import { FAQSection } from './modules/maintenance/ui/FAQSection';
import { translations } from './modules/maintenance/domain/translations';

function App() {
  const calculator = useMaintenanceCalculator();
  const t = translations[calculator.input.region];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-8 md:py-12">
      <header className="max-w-7xl mx-auto text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          {t.header.title}
        </h1>
        <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">
          {t.header.subtitle}
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <MaintenanceCalculator {...calculator} t={t} />
        <FAQSection region={calculator.input.region} t={t} />
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500">© 2026 Legal Check Calculators • Specialized Multi-Jurisdictional Estimator</p>
      </footer>
    </div>
  );
}

export default App;
