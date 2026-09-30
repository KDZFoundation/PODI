'use client';

import { useState } from 'react';
import TypewriterHeader from '@/components/TypewriterHeader';
import DictionaryDropdown, { DictionaryTopic } from '@/components/DictionaryDropdown';

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<DictionaryTopic | null>(null);

  const handleSelectTopic = (topic: DictionaryTopic) => {
    setSelectedTopic(topic);
  };

  // Widok startowy: Inteligentny Doradca PODI (Etap 1)
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

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400 border border-neutral-200/80 px-2.5 py-1 rounded-full bg-neutral-50">
            Etap 1: Szkielet techniczny
          </span>
        </div>
      </header>

      {/* Main Center Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 max-w-4xl mx-auto w-full z-10">
        {/* Maszyna do pisania DOS + uroczy robot PODI */}
        <div className="w-full mb-8 sm:mb-10 flex justify-center">
          <TypewriterHeader />
        </div>

        {/* Rozwijany słownik pojęć i profili branżowych */}
        <div className="w-full flex justify-center">
          <DictionaryDropdown onSelectTopic={handleSelectTopic} />
        </div>

        {/* Informacja o wybranym profilu ze słownika (bez niezatwierdzonej oferty i bez przejścia do PodPlatform) */}
        {selectedTopic && selectedTopic.id !== 'pod' && (
          <div className="mt-8 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 max-w-lg w-full text-left space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider bg-neutral-200/60 px-2 py-0.5 rounded">
                Wybrany profil: {selectedTopic.label}
              </span>
              <span className="text-[10px] text-neutral-400">Status definicji</span>
            </div>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed">
              Profil został zarejestrowany w słowniku pojęć PODI. Dedykowane reguły doradcze oraz specyfikacje materiałów dla tej branży zostaną zdefiniowane w kolejnych etapach projektu.
            </p>
          </div>
        )}
      </div>

      {/* Minimalistyczna stopka */}
      <footer className="w-full px-6 py-4 border-t border-neutral-100 bg-white text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono">
          <span>PODI &middot; Inteligentny Doradca drukowania na żądanie</span>
        </div>
        <div className="text-[11px] text-neutral-400 font-mono">
          Wybierz „Studio PODI (Druk na żądanie)” ze słownika, aby przejść do /pod
        </div>
      </footer>
    </main>
  );
}
