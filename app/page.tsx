'use client';

import { useState } from 'react';
import TypewriterHeader from '@/components/TypewriterHeader';
import DictionaryDropdown, { DictionaryTopic } from '@/components/DictionaryDropdown';
import PodPlatform from '@/components/PodPlatform';
import { ArrowRight, Sparkles, Building, Utensils, HeartHandshake, Building2 } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'advisor' | 'pod'>('advisor');
  const [selectedTopic, setSelectedTopic] = useState<DictionaryTopic | null>(null);

  const handleSelectTopic = (topic: DictionaryTopic) => {
    setSelectedTopic(topic);
    // Jeśli użytkownik wybierze pozycję POD - natychmiast płynnie przechodzimy do platformy POD
    if (topic.id === 'pod') {
      setActiveView('pod');
    }
  };

  // Widok pełnej platformy POD (ze wzorcami Biuroserwis Elbląg + CEWE/Optimalprint)
  if (activeView === 'pod') {
    return <PodPlatform onBackToAdvisor={() => setActiveView('advisor')} />;
  }

  // Widok startowy: Inteligentny Doradca PODI
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
          {/* Bezpośredni przycisk do platformy POD */}
          <button
            onClick={() => setActiveView('pod')}
            className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Katalog POD & Wyceny</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
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

        {/* Podgląd wybranego profilu, gdy nie jest to bezpośrednio POD */}
        {selectedTopic && selectedTopic.id !== 'pod' && (
          <div className="mt-8 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 max-w-lg w-full text-left space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
                Profil aktywny: {selectedTopic.label}
              </span>
              <span className="text-xs text-neutral-500 font-mono">Dopasowana oferta</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dla profilu <strong>{selectedTopic.label}</strong> przygotowaliśmy dedykowane materiały w platformie druku na żądanie (POD): etykiety, foldery, gadżety i karty menu.
            </p>
            <button
              onClick={() => setActiveView('pod')}
              className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Zobacz dedykowane produkty w platformie POD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Minimalistyczna stopka */}
      <footer className="w-full px-6 py-4 border-t border-neutral-100 bg-white text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono">
          <span>PODI &middot; Inteligentny Doradca drukowania na żądanie</span>
        </div>
        <div className="text-[11px] text-neutral-400 font-mono">
          Wybierz „POD (Druk na żądanie)” ze słownika, aby wejść do platformy
        </div>
      </footer>
    </main>
  );
}
