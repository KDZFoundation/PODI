import TypewriterHeader from '@/components/TypewriterHeader';
import DictionaryDropdown from '@/components/DictionaryDropdown';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Header bar z subtelnym brandingiem PODI */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white font-mono font-bold flex items-center justify-center text-xs shadow-sm shadow-sky-500/20">
            POD
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-neutral-900 leading-none">
              PODI
            </span>
            <span className="text-[11px] text-neutral-500 tracking-wide font-mono mt-0.5">
              Print On Demand Advisor
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Gotowy do rozmowy
          </span>
        </div>
      </header>

      {/* Main Center Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full z-10">
        {/* Kontener maszyny do pisania z u uroczym robotem PODI */}
        <div className="w-full mb-8 sm:mb-10 flex justify-center">
          <TypewriterHeader />
        </div>

        {/* Rozwijany słownik pojęć i branż */}
        <div className="w-full flex justify-center">
          <DictionaryDropdown />
        </div>
      </div>

      {/* Minimalistyczna stopka */}
      <footer className="w-full px-6 py-4 border-t border-neutral-100 bg-white text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono">
          <span>PODI &middot; Inteligentny Doradca drukowania na żądanie</span>
        </div>
        <div className="text-[11px] text-neutral-400 font-mono">
          Poruszaj kursorem, aby odkryć próbki papieru
        </div>
      </footer>
    </main>
  );
}
